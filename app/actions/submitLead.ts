"use server";

export type SubmitLeadState = {
  success: boolean;
  error?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
};

export async function submitLead(
  _prevState: SubmitLeadState,
  formData: FormData
): Promise<SubmitLeadState> {
  const nome = String(formData.get("nome") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const empresa = String(formData.get("empresa") ?? "").trim();
  const cargo = String(formData.get("cargo") ?? "").trim();
  const celular = String(formData.get("celular") ?? "").trim();
  const captchaA = Number(formData.get("captchaA"));
  const captchaB = Number(formData.get("captchaB"));
  const captchaAnswer = Number(formData.get("captchaAnswer"));

  if (!nome || !email || !empresa || !cargo || !celular) {
    return { success: false, error: "Preencha todos os campos para continuar." };
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return { success: false, error: "Informe um e-mail válido." };
  }

  if (captchaAnswer !== captchaA + captchaB) {
    return { success: false, error: "Verificação incorreta. Confira a soma e tente novamente." };
  }

  // Integração com a tabela `leads` no Supabase entra aqui quando o projeto Supabase for criado.

  return { success: true, name: nome, email, phone: celular, company: empresa, jobTitle: cargo };
}
