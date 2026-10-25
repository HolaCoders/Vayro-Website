import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { FRASES } from "@/lib/frases";

export const Route = createFileRoute("/gracias")({
  validateSearch: (search: Record<string, unknown>): { nombre: string } => ({
    nombre: typeof search.nombre === "string" ? search.nombre.trim().slice(0, 60) : "",
  }),
  head: () => ({
    meta: [
      { title: "Gracias por consultar | VAYRO Marketing" },
      { name: "description", content: "Tu consulta fue recibida. Abre el regalo: hay una sorpresa para ti." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Gracias por consultar | VAYRO Marketing" },
      { property: "og:description", content: "Tu consulta fue recibida. Abre el regalo: hay una sorpresa para ti." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Gracias,
});

const SPARKLES = [
  { left: "10%", top: "40%", d: "0s" },
  { left: "84%", top: "32%", d: "0.12s" },
  { left: "26%", top: "14%", d: "0.24s" },
  { left: "68%", top: "54%", d: "0.36s" },
  { left: "48%", top: "6%", d: "0.48s" },
  { left: "92%", top: "60%", d: "0.6s" },
];

function Gift({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 160 150"
      aria-hidden="true"
      className="h-44 w-44 transition-transform duration-500 group-hover:scale-105 sm:h-56 sm:w-56"
    >
      {/* Caja */}
      <g className={cn("transition-transform duration-700 ease-out", open && "translate-y-2")}>
        <rect x="34" y="82" width="92" height="56" rx="6" className="fill-primary" />
        <rect x="34" y="82" width="92" height="56" rx="6" className="fill-ink-foreground/10" />
        <rect x="71" y="82" width="18" height="56" className="fill-cream" />
      </g>
      {/* Tapa y moño */}
      <g
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        className={cn(
          "transition-all duration-700 ease-out",
          open ? "-translate-y-16 -rotate-12 opacity-0" : "vayro-float",
        )}
      >
        <path d="M80 60C66 48 50 44 52 33 54 23 73 30 80 46" className="fill-primary stroke-cream" strokeWidth="2" />
        <path d="M80 60C94 48 110 44 108 33 106 23 87 30 80 46" className="fill-primary stroke-cream" strokeWidth="2" />
        <rect x="24" y="58" width="112" height="26" rx="6" className="fill-primary" />
        <rect x="71" y="58" width="18" height="26" className="fill-cream" />
        <circle cx="80" cy="52" r="7" className="fill-cream" />
      </g>
    </svg>
  );
}

function Gracias() {
  const { nombre } = Route.useSearch();
  const [open, setOpen] = useState(false);
  const [frase, setFrase] = useState("");
  const [round, setRound] = useState(0);

  useEffect(() => {
    const w = window as unknown as { fbq?: (...args: unknown[]) => void };
    if (typeof w.fbq === "function") w.fbq("track", "Lead");
  }, []);

  function abrir() {
    const i = Math.floor(Math.random() * FRASES.length);
    setFrase(FRASES[i] ?? "");
    setOpen(true);
    setRound((r) => r + 1);
  }

  return (
    <main className="bg-ink text-ink-foreground">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
        <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-ink-foreground/70">
          <span className="h-px w-8 bg-primary" />VAYRO.MARKETING
        </p>

        <h1 className="mt-6 font-display text-5xl italic leading-tight md:text-6xl">
          Gracias por consultar{nombre ? `, ${nombre}` : "."}
        </h1>

        <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-foreground/75">
          {open
            ? "Que disfrutes tu sorpresa: la leemos con el mismo cariño con el que la escribimos."
            : "Tu solicitud ya está con nosotros. Antes de irte, hay un pequeño detalle esperándote."}
        </p>

        <div className="relative mt-12 inline-flex">
          <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full bg-primary/20 blur-2xl" />
          {open &&
            SPARKLES.map((s, i) => (
              <span
                key={`${round}-${i}`}
                aria-hidden
                className="vayro-sparkle pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-primary"
                style={{ left: s.left, top: s.top, animationDelay: s.d }}
              />
            ))}
          <button type="button" onClick={abrir} aria-label="Abrir el regalo" className="group relative cursor-pointer">
            <Gift open={open} />
          </button>
        </div>

        <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-ink-foreground/50">
          {open ? "Tócalo de nuevo para otra sorpresa" : "Toca el regalo"}
        </p>

        {open && (
          <blockquote key={round} className="vayro-pop mt-10 max-w-xl border-y border-primary/40 px-8 py-8">
            <p className="font-display text-2xl italic leading-snug md:text-3xl">“{frase}”</p>
            <footer className="mt-6 text-[10px] uppercase tracking-[0.3em] text-primary">
              Con cariño, equipo VAYRO
            </footer>
          </blockquote>
        )}

        <Link
          to="/"
          className="mt-12 inline-flex items-center gap-2 border-b border-primary pb-1 text-[11px] uppercase tracking-[0.2em] text-ink-foreground transition hover:text-primary"
        >
          <ArrowLeft size={14} /> Volver al inicio
        </Link>
      </div>
    </main>
  );
}
