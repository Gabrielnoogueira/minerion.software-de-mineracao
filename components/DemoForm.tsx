"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitLead, type SubmitLeadState } from "@/app/actions/submitLead";

declare global {
  interface Window {
    minerionTrack?: (eventName: string, toMeta?: boolean) => void;
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    __googleAdsConversions?: { sendTo: string }[];
  }
}

/** Para "Outro assunto" não enviamos lead: a pessoa vai para o site institucional. */
const OTHER_SUBJECT_URL = "https://minerion.com.br/";

type Objective = "demonstracao" | "cliente" | "outro";

const OBJECTIVES: { value: Objective; label: string }[] = [
  { value: "demonstracao", label: "Quero agendar uma demonstração do Minerion" },
  { value: "cliente", label: "Sou cliente Minerion e tenho uma dúvida" },
  { value: "outro", label: "Outro assunto (carreira, parcerias, fornecedores)" },
];

/**
 * Conversões do navegador, as mesmas que window.minerionTrackLead dispara
 * (Pixel Lead, GA4 generate_lead e Google Ads). O POST em /api/lead NÃO é
 * repetido aqui: ele já saiu pela Server Action com este mesmo eventId.
 */
function trackLeadConversions(eventId: string) {
  window.fbq?.("track", "Lead", { content_name: "lead_form" }, { eventID: eventId });
  window.gtag?.("event", "generate_lead");
  for (const c of window.__googleAdsConversions ?? []) {
    window.gtag?.("event", "conversion", { send_to: c.sendTo, transaction_id: eventId });
  }
}

const initialState: SubmitLeadState = { success: false };

const inputClasses =
  "w-full rounded-lg border border-white/15 bg-black/40 px-4 py-3 text-sm text-white min-[100rem]:px-5 min-[100rem]:py-4 min-[100rem]:text-base placeholder:text-white/40 outline-none transition focus:border-lime focus:ring-1 focus:ring-lime";

export default function DemoForm() {
  const [state, formAction, isPending] = useActionState(
    submitLead,
    initialState
  );
  const [objective, setObjective] = useState<Objective | null>(null);
  const formStartFired = useRef(false);
  const trackedEventId = useRef<string | null>(null);
  const isOther = objective === "outro";

  useEffect(() => {
    if (!state.success || !state.eventId || trackedEventId.current === state.eventId) return;
    trackedEventId.current = state.eventId;
    trackLeadConversions(state.eventId);
  }, [state.success, state.eventId]);

  // Lido na hora do envio (e não ao abrir a página): se o /api/tracker carregar
  // atrasado, o lead ainda casa com a visita e a campanha.
  function submitWithTracking(formData: FormData) {
    try {
      formData.set("trck_user_id", localStorage.getItem("trck_user_id") ?? "");
    } catch {
      // localStorage indisponível (modo privado etc.): segue sem o id
    }
    formData.set("page_url", window.location.href);
    formAction(formData);
  }

  function handleFormFocus() {
    if (formStartFired.current) return;
    formStartFired.current = true;
    window.minerionTrack?.("FormStart", true);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (isOther) {
      // não envia o lead: só redireciona. Sem isso não tínhamos nenhuma
      // visibilidade de quantas pessoas tocam no form (conta como FormStart)
      // e saem por aqui em vez de completar — útil pra investigar queda de
      // conversão sem confundir com falha de envio.
      window.minerionTrack?.("FormOtherRedirect", true);
      event.preventDefault();
      window.location.href = OTHER_SUBJECT_URL;
    }
  }

  if (state.success) {
    return (
      <div className="rounded-2xl border border-lime/40 bg-black/40 p-8 text-center">
        <p className="font-mono text-lg font-semibold text-lime">
          Recebemos seus dados.
        </p>
        <p className="mt-2 text-sm text-white/70">
          {state.objective === "cliente"
            ? "Nossa equipe de atendimento vai entrar em contato para ajudar com a sua dúvida."
            : "Nossa equipe vai entrar em contato para agendar sua demonstração."}
        </p>
      </div>
    );
  }

  return (
    <form
      action={submitWithTracking}
      onSubmit={handleSubmit}
      onFocus={handleFormFocus}
      className="relative space-y-5 rounded-2xl border border-lime/40 bg-grey/85 p-6 backdrop-blur-md sm:p-8 min-[100rem]:space-y-7 min-[100rem]:p-10"
    >
      {/* em "Outro assunto" os campos deixam de ser obrigatórios (não há envio de lead) */}
      <div className="grid gap-4 sm:grid-cols-2 min-[100rem]:gap-5">
        <input name="nome" defaultValue={state.values?.nome} type="text" placeholder="Nome" required={!isOther} className={inputClasses} />
        <input name="email" defaultValue={state.values?.email} type="email" placeholder="Email" required={!isOther} className={inputClasses} />
        <input name="empresa" defaultValue={state.values?.empresa} type="text" placeholder="Empresa" required={!isOther} className={inputClasses} />
        <input name="cargo" defaultValue={state.values?.cargo} type="text" placeholder="Cargo" required={!isOther} className={inputClasses} />
        <input
          name="celular"
          defaultValue={state.values?.celular}
          type="tel"
          placeholder="Celular"
          required={!isOther}
          className={inputClasses + " sm:col-span-2"}
        />
      </div>

      <div>
        <label htmlFor="objetivo" className="text-sm font-medium text-white min-[100rem]:text-base">
          Qual o principal objetivo da sua conversa com a gente?
        </label>
        <div className="relative mt-2">
          <select
            key={state.attempt ?? "first"}
            id="objetivo"
            name="objetivo"
            required
            value={objective ?? ""}
            onChange={(e) => setObjective(e.target.value as Objective)}
            className={
              inputClasses +
              " cursor-pointer appearance-none pr-11 " +
              (objective ? "text-white" : "text-white/40")
            }
          >
            <option value="" disabled className="bg-surface text-white/60">
              Selecione uma opção
            </option>
            {OBJECTIVES.map((option) => (
              <option key={option.value} value={option.value} className="bg-surface text-white">
                {option.label}
              </option>
            ))}
          </select>
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-lime"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 7.5l5 5 5-5" />
          </svg>
        </div>
        {isOther && (
          <p className="mt-2 text-sm text-white/70">
            Para carreira, parcerias e fornecedores, nosso site institucional
            tem o canal certo para você.
          </p>
        )}
      </div>

      {/* honeypot anti-robô: invisível para pessoas */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Não preencha este campo
          <input type="text" name="hp_confirmacao" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.error && !isOther && (
        <p className="text-sm text-red-400" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-lime px-6 py-3.5 font-mono text-sm font-semibold text-black xl:text-base min-[100rem]:py-5 min-[100rem]:text-lg transition hover:bg-lime/90 disabled:opacity-60"
      >
        {isOther
          ? "Continuar no site da Minerion →"
          : isPending
            ? "Enviando..."
            : "Quero conhecer mais"}
      </button>

      {!isOther && (
        <p className="text-xs text-white/60 min-[100rem]:text-sm">
          Ao enviar, você concorda em ser contatado pela Minerion sobre este agendamento.
        </p>
      )}
    </form>
  );
}
