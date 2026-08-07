"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitLead, type SubmitLeadState } from "@/app/actions/submitLead";

declare global {
  interface Window {
    minerionTrack?: (eventName: string, toMeta?: boolean) => void;
    minerionTrackLead?: (data: { name?: string; email?: string; phone?: string }) => void;
  }
}

function randomDigit() {
  return Math.floor(Math.random() * 9) + 1;
}

const initialState: SubmitLeadState = { success: false };

const inputClasses =
  "w-full rounded-lg border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-lime focus:ring-1 focus:ring-lime";

export default function DemoForm() {
  const [state, formAction, isPending] = useActionState(
    submitLead,
    initialState
  );
  const [captcha, setCaptcha] = useState<{ a: number; b: number } | null>(
    null
  );
  const formStartFired = useRef(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCaptcha({ a: randomDigit(), b: randomDigit() });
  }, []);

  useEffect(() => {
    if (state.success) {
      window.minerionTrackLead?.({
        name: state.name,
        email: state.email,
        phone: state.phone,
      });
    }
  }, [state.success, state.name, state.email, state.phone]);

  function handleFormFocus() {
    if (formStartFired.current) return;
    formStartFired.current = true;
    window.minerionTrack?.("FormStart", true);
  }

  if (state.success) {
    return (
      <div className="rounded-2xl border border-lime/40 bg-black/40 p-8 text-center">
        <p className="font-mono text-lg font-semibold text-lime">
          Recebemos seus dados.
        </p>
        <p className="mt-2 text-sm text-white/70">
          Nossa equipe vai entrar em contato para agendar sua demonstração.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      onFocus={handleFormFocus}
      className="space-y-4 rounded-2xl border border-lime/40 bg-grey/80 p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="nome"
          type="text"
          placeholder="Nome"
          required
          className={inputClasses}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className={inputClasses}
        />
        <input
          name="empresa"
          type="text"
          placeholder="Empresa"
          required
          className={inputClasses}
        />
        <input
          name="cargo"
          type="text"
          placeholder="Cargo"
          required
          className={inputClasses}
        />
        <input
          name="celular"
          type="tel"
          placeholder="Celular"
          required
          className={inputClasses + " sm:col-span-2"}
        />
      </div>

      {captcha && (
        <div className="flex items-center gap-3">
          <input type="hidden" name="captchaA" value={captcha.a} />
          <input type="hidden" name="captchaB" value={captcha.b} />
          <label htmlFor="captchaAnswer" className="whitespace-nowrap text-sm text-white/70">
            Quanto é {captcha.a} + {captcha.b}?
          </label>
          <input
            id="captchaAnswer"
            name="captchaAnswer"
            type="number"
            required
            className={inputClasses + " w-24"}
          />
        </div>
      )}

      {state.error && (
        <p className="text-sm text-red-400" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending || !captcha}
        className="w-full rounded-lg bg-lime px-6 py-3 font-mono text-sm font-semibold text-black transition hover:bg-lime/90 disabled:opacity-60"
      >
        {isPending ? "Enviando..." : "Quero conhecer mais"}
      </button>

      <p className="text-xs text-white/50">
        Ao enviar, você concorda em ser contatado pela Minerion sobre este agendamento.
      </p>
    </form>
  );
}
