"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitLead, type SubmitLeadState } from "@/app/actions/submitLead";

declare global {
  interface Window {
    minerionTrack?: (eventName: string, toMeta?: boolean) => void;
    minerionTrackLead?: (data: {
      name?: string;
      email?: string;
      phone?: string;
      company?: string;
      job_title?: string;
    }) => void;
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

const initialState: SubmitLeadState = { success: false };

const inputClasses =
  "w-full rounded-lg border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-lime focus:ring-1 focus:ring-lime";

export default function DemoForm() {
  const [state, formAction, isPending] = useActionState(
    submitLead,
    initialState
  );
  const [objective, setObjective] = useState<Objective | null>(null);
  const formStartFired = useRef(false);
  const isOther = objective === "outro";

  useEffect(() => {
    if (state.success) {
      window.minerionTrackLead?.({
        name: state.name,
        email: state.email,
        phone: state.phone,
        company: state.company,
        job_title: state.jobTitle,
      });
    }
  }, [state.success, state.name, state.email, state.phone, state.company, state.jobTitle]);

  function handleFormFocus() {
    if (formStartFired.current) return;
    formStartFired.current = true;
    window.minerionTrack?.("FormStart", true);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (isOther) {
      // não envia o lead: só redireciona
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
      action={formAction}
      onSubmit={handleSubmit}
      onFocus={handleFormFocus}
      className="relative space-y-5 rounded-2xl border border-lime/40 bg-grey/80 p-6 sm:p-8"
    >
      {/* em "Outro assunto" os campos deixam de ser obrigatórios (não há envio de lead) */}
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="nome" type="text" placeholder="Nome" required={!isOther} className={inputClasses} />
        <input name="email" type="email" placeholder="Email" required={!isOther} className={inputClasses} />
        <input name="empresa" type="text" placeholder="Empresa" required={!isOther} className={inputClasses} />
        <input name="cargo" type="text" placeholder="Cargo" required={!isOther} className={inputClasses} />
        <input
          name="celular"
          type="tel"
          placeholder="Celular"
          required={!isOther}
          className={inputClasses + " sm:col-span-2"}
        />
      </div>

      <div>
        <label htmlFor="objetivo" className="text-sm font-medium text-white">
          Qual o principal objetivo da sua conversa com a gente?
        </label>
        <div className="relative mt-2">
          <select
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
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
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
        className="w-full rounded-lg bg-lime px-6 py-3 font-mono text-sm font-semibold text-black transition hover:bg-lime/90 disabled:opacity-60"
      >
        {isOther
          ? "Continuar no site da Minerion →"
          : isPending
            ? "Enviando..."
            : "Quero conhecer mais"}
      </button>

      {!isOther && (
        <p className="text-xs text-white/50">
          Ao enviar, você concorda em ser contatado pela Minerion sobre este agendamento.
        </p>
      )}
    </form>
  );
}
