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

  // Integração com a tabela `leads` no Supabase entra aqui quando o projeto Supabase for criado
  // (gravar também o `objetivo`).

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
