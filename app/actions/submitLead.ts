"use server";

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
};

const LEAD_OBJECTIVES: LeadObjective[] = ["demonstracao", "cliente"];

export async function submitLead(
  _prevState: SubmitLeadState,
  formData: FormData
): Promise<SubmitLeadState> {
  // Honeypot: campo invisível para pessoas. Se veio preenchido, é robô.
  if (String(formData.get("website") ?? "").trim()) {
    return { success: false, error: "Não foi possível enviar. Tente novamente." };
  }

  const objetivo = String(formData.get("objetivo") ?? "");
  const nome = String(formData.get("nome") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const empresa = String(formData.get("empresa") ?? "").trim();
  const cargo = String(formData.get("cargo") ?? "").trim();
  const celular = String(formData.get("celular") ?? "").trim();

  if (!LEAD_OBJECTIVES.includes(objetivo as LeadObjective)) {
    return { success: false, error: "Escolha o objetivo da sua conversa com a gente." };
  }

  if (!nome || !email || !empresa || !cargo || !celular) {
    return { success: false, error: "Preencha todos os campos para continuar." };
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return { success: false, error: "Informe um e-mail válido." };
  }

  // Envio pro sistema de tracking (tracking.minerion.com.br) — server-to-server,
  // de propósito: a versão anterior dependia de window.minerionTrackLead no
  // navegador do visitante, que falha em silêncio (optional chaining) se o
  // script /api/tracker ainda não tiver carregado no momento do envio. Feito
  // aqui dentro da Server Action, não depende de timing nenhum no cliente —
  // esse é hoje o ÚNICO canal real de captura dessa LP, não existe CRM
  // próprio integrado ainda.
  const trckUserId = String(formData.get("trck_user_id") ?? "").trim();
  try {
    const res = await fetch("https://tracking.minerion.com.br/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        trck_user_id: trckUserId || undefined,
        name: nome,
        email,
        phone: celular,
        company: empresa,
        job_title: cargo,
        event_id: crypto.randomUUID(),
        event_source_url: "https://lpmarketing.minerion.com.br/",
      }),
    });
    if (!res.ok) {
      console.error("submitLead: /api/lead respondeu", res.status, await res.text().catch(() => ""));
    }
  } catch (err) {
    // Não bloqueia o "sucesso" pro visitante por uma falha de rede pontual,
    // mas precisa aparecer bem alto nos logs — sem isso o lead se perde de
    // novo, do mesmo jeito que já aconteceu.
    console.error("submitLead: falha ao enviar lead pro tracking.minerion", err);
  }

  return {
    success: true,
    name: nome,
    email,
    phone: celular,
    company: empresa,
    jobTitle: cargo,
    objective: objetivo as LeadObjective,
  };
}
