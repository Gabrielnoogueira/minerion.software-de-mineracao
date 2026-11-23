"use server";

import { headers } from "next/headers";

/** Objetivos que geram lead. "outro" redireciona para o site e nunca chega aqui. */
export type LeadObjective = "demonstracao" | "cliente";

export type SubmitLeadState = {
  success: boolean;
  error?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  objective?: LeadObjective;
  eventId?: string;
  /** o que a pessoa digitou, devolvido em caso de erro (o React limpa o form após a action) */
  values?: Record<string, string>;
  /** muda a cada erro, para o form remontar o select com a opção escolhida */
  attempt?: string;
};

const LEAD_OBJECTIVES: LeadObjective[] = ["demonstracao", "cliente"];

const SITE_URL = "https://lpmarketing.minerion.com.br/";
const LEAD_ENDPOINT = "https://tracking.minerion.com.br/api/lead";

/** URL da visita com UTMs (igual à V1); só aceita o nosso domínio. */
function sourceUrl(value: FormDataEntryValue | null): string {
  const url = String(value ?? "");
  return url.startsWith(SITE_URL) ? url.slice(0, 2000) : SITE_URL;
}

async function postLead(body: string, visitorHeaders: Record<string, string>): Promise<boolean> {
  try {
    const res = await fetch(LEAD_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...visitorHeaders },
      body,
      signal: AbortSignal.timeout(8000),
    });
    if (res.ok) return true;
    console.error("submitLead: /api/lead respondeu", res.status, await res.text().catch(() => ""));
  } catch (err) {
    console.error("submitLead: falha ao enviar lead pro tracking.minerion", err);
  }
  return false;
}

export async function submitLead(
  _prevState: SubmitLeadState,
  formData: FormData
): Promise<SubmitLeadState> {
  // Honeypot: campo invisível para pessoas. Se veio preenchido, é robô.
  if (String(formData.get("hp_confirmacao") ?? "").trim()) {
    return { success: false, error: "Não foi possível enviar. Tente novamente." };
  }

  const objetivo = String(formData.get("objetivo") ?? "");
  const nome = String(formData.get("nome") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const empresa = String(formData.get("empresa") ?? "").trim();
  const cargo = String(formData.get("cargo") ?? "").trim();
  const celular = String(formData.get("celular") ?? "").trim();

  const fail = (error: string): SubmitLeadState => ({
    success: false,
    error,
    attempt: crypto.randomUUID(),
    values: { nome, email, empresa, cargo, celular },
  });

  if (!LEAD_OBJECTIVES.includes(objetivo as LeadObjective)) {
    return fail("Escolha o objetivo da sua conversa com a gente.");
  }

  if (!nome || !email || !empresa || !cargo || !celular) {
    return fail("Preencha todos os campos para continuar.");
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return fail("Informe um e-mail válido.");
  }

  // Envio pro sistema de tracking (tracking.minerion.com.br) — server-to-server,
  // de propósito: a versão anterior dependia de window.minerionTrackLead no
  // navegador do visitante, que falha em silêncio (optional chaining) se o
  // script /api/tracker ainda não tiver carregado no momento do envio. Feito
  // aqui dentro da Server Action, não depende de timing nenhum no cliente —
  // esse é hoje o ÚNICO canal real de captura dessa LP, não existe CRM
  // próprio integrado ainda.
  const trckUserId = String(formData.get("trck_user_id") ?? "").trim();
  // Mesmo id no servidor e no navegador: é o que permite deduplicar o evento Lead.
  const eventId = crypto.randomUUID();
  const body = JSON.stringify({
    trck_user_id: trckUserId || undefined,
    name: nome,
    email,
    phone: celular,
    company: empresa,
    job_title: cargo,
    event_id: eventId,
    event_source_url: sourceUrl(formData.get("page_url")),
    extra: { objetivo },
  });

  // IP e user-agent reais do visitante (da requisição que ELE fez pra essa
  // Server Action) — sem isso o tracking.minerion registraria o IP/UA do
  // nosso próprio servidor Vercel, degradando o Advanced Matching do Meta.
  // A Vercel sempre ANEXA o IP de conexão real ao final de x-forwarded-for
  // (nunca substitui), e o tracking.minerion lê o PRIMEIRO da lista — por
  // isso o valor que repassamos aqui continua vencendo do lado de lá.
  const incomingHeaders = await headers();
  const visitorIp = incomingHeaders.get("x-forwarded-for") ?? incomingHeaders.get("x-real-ip");
  const visitorUserAgent = incomingHeaders.get("user-agent");
  const visitorHeaders: Record<string, string> = {
    ...(visitorIp ? { "x-forwarded-for": visitorIp } : {}),
    ...(visitorUserAgent ? { "user-agent": visitorUserAgent } : {}),
  };

  // Sem confirmação do tracking não mostramos sucesso: senão o lead se perde em silêncio.
  if (!(await postLead(body, visitorHeaders)) && !(await postLead(body, visitorHeaders))) {
    return fail("Não conseguimos enviar agora. Aguarde um instante e tente novamente.");
  }

  return {
    success: true,
    eventId,
    name: nome,
    email,
    phone: celular,
    company: empresa,
    jobTitle: cargo,
    objective: objetivo as LeadObjective,
  };
}
