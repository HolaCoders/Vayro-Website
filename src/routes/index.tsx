import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState, type FormEvent } from "react";
import {
  Target, Camera, Megaphone, Monitor, BarChart3, TrendingUp, Gem, Heart, Sparkles, Globe,
  CalendarDays, FileText, Zap, ArrowRight,
} from "lucide-react";
import hero from "@/assets/hero.jpg";
import palms from "@/assets/palms.jpg";
import { submitLead, PRESUPUESTOS, FACTURACIONES, HORAS, ahoraRD, slotDisponible } from "@/lib/leads.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VAYRO Marketing | Marketing digital para inmobiliarias" },
      { name: "description", content: "Estrategias de marketing digital de alto nivel para inmobiliarias: más visibilidad y más compradores calificados." },
      { property: "og:title", content: "VAYRO Marketing | Marketing inmobiliario" },
      { property: "og:description", content: "Más visibilidad. Más compradores. Agenda tu consulta gratuita." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const TIPOS = ["Residencial", "Comercial", "Lujo", "Terrenos", "Proyecto en desarrollo", "Clínica estética", "Medicina estética / Spa", "Otro"] as const;

const services = [
  { icon: Target, t: "Estrategia de Marketing", d: "Definimos tu posicionamiento, objetivos y audiencia ideal para atraer compradores reales." },
  { icon: Camera, t: "Creación de Contenido", d: "Fotografía, video y textos que destacan el valor de tus propiedades y tu marca." },
  { icon: Megaphone, t: "Publicidad Digital", d: "Campañas en Meta, Google y más, para llegar a compradores calificados." },
  { icon: Monitor, t: "Diseño Web & Landing Pages", d: "Páginas optimizadas para captar leads y convertir visitas en consultas." },
  { icon: BarChart3, t: "Gestión de Redes Sociales", d: "Contenido estratégico y comunidad activa que posiciona tu marca." },
  { icon: TrendingUp, t: "Analytics & Optimización", d: "Medimos, analizamos y ajustamos para maximizar tus resultados." },
];
const why = [
  { icon: Gem, t: "Enfoque en resultados", d: "Estrategias pensadas para generar leads de calidad y ventas reales." },
  { icon: Heart, t: "Equipo especializado", d: "Experiencia en el sector inmobiliario y en marketing digital de alto rendimiento." },
  { icon: Sparkles, t: "Soluciones a medida", d: "Cada proyecto es único. Adaptamos nuestras estrategias a tus objetivos y mercado." },
  { icon: Globe, t: "Visión global", d: "Conectamos tu marca con audiencias locales e internacionales." },
];

function Eyebrow({ children, light }: { children: string; light?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.25em] ${light ? "text-ink-foreground/80" : "text-foreground/70"}`}>
      <span className="h-px w-8 bg-primary" />{children}
    </p>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <span className="font-display text-4xl italic text-primary">V.</span>
      <div className="leading-tight">
        <p className="font-display text-lg tracking-[0.15em] text-ink-foreground">VAYRO.MARKETING</p>
        <p className="text-[8px] uppercase tracking-[0.3em] text-ink-foreground/60">Real estate marketing & growth</p>
      </div>
    </div>
  );
}

function Index() {
  return (
    <main className="bg-background">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Logo />
          <nav className="hidden gap-10 text-[11px] uppercase tracking-[0.2em] text-ink-foreground md:flex">
            <a href="#" className="border-b border-primary pb-1">Inicio</a>
            <a href="#servicios">Servicios</a>
            <a href="#nosotros">Nosotros</a>
            <a href="#contacto">Contacto</a>
          </nav>
          <a href="#contacto" className="hidden items-center gap-2 rounded-full border border-primary px-5 py-2 text-[11px] uppercase tracking-[0.15em] text-ink-foreground transition hover:bg-primary sm:flex">
            Solicita una consulta <ArrowRight size={14} />
          </a>
        </div>
      </header>

      <section className="relative min-h-[640px] overflow-hidden bg-ink">
        <img src={hero} alt="Villa de lujo con piscina al atardecer" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-44">
          <Eyebrow light>Marketing digital para inmobiliarias</Eyebrow>
          <h1 className="mt-6 font-display text-6xl italic leading-[1.05] text-ink-foreground md:text-7xl">
            Más visibilidad.<br /><span className="text-primary">Más compradores.</span>
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-foreground/85">
            En VAYRO.MARKETING ayudamos a inmobiliarias a atraer, conectar y convertir más compradores calificados a través de estrategias de marketing digital de alto nivel.
          </p>
          <a href="#contacto" className="mt-10 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-primary-foreground transition hover:opacity-90">
            Solicita una consulta <ArrowRight size={14} />
          </a>
        </div>
        <p className="absolute bottom-8 right-8 hidden text-right text-[10px] uppercase tracking-[0.3em] text-ink-foreground/70 md:block">
          Tu propiedad merece<br />la mejor estrategia
        </p>
      </section>

      <section id="servicios" className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[1fr_2fr]">
        <div>
          <Eyebrow>Nuestros servicios</Eyebrow>
          <h2 className="mt-6 font-display text-5xl italic leading-tight">Estrategia, creatividad y resultados reales.</h2>
          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">Ofrecemos soluciones de marketing digital integrales, diseñadas para el sector inmobiliario. Combinamos estrategia, contenido y tecnología para posicionar tu marca y generar oportunidades de negocio.</p>
          <a href="#contacto" className="mt-10 inline-flex items-center gap-3 border-b border-primary pb-1 text-[11px] uppercase tracking-[0.2em]">Conoce todos los servicios <ArrowRight size={14} className="text-primary" /></a>
        </div>
        <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 md:grid-cols-3">
          {services.map(({ icon: I, t, d }) => (
            <div key={t} className="border-l border-border pl-6">
              <I className="text-primary" size={28} strokeWidth={1.4} />
              <h3 className="mt-5 font-display text-xl italic">{t}</h3>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="nosotros" className="relative overflow-hidden bg-ink">
        <img src={palms} alt="" loading="lazy" width={1024} height={1024} className="absolute left-0 top-0 h-full w-1/2 object-cover opacity-60" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1fr_2fr]">
          <div>
            <Eyebrow light>Por qué elegir VAYRO</Eyebrow>
            <h2 className="mt-6 font-display text-5xl italic leading-tight text-ink-foreground">
              No solo vendemos propiedades,<br /><span className="text-primary underline decoration-1 underline-offset-8">creamos oportunidades.</span>
            </h2>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
            {why.map(({ icon: I, t, d }) => (
              <div key={t} className="border-l border-ink-foreground/20 pl-6">
                <I className="text-primary" size={28} strokeWidth={1.4} />
                <h3 className="mt-5 font-display text-lg italic text-ink-foreground">{t}</h3>
                <p className="mt-3 text-xs leading-relaxed text-ink-foreground/70">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact />

      <footer className="bg-ink">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-8">
            <Logo />
            <p className="hidden border-l border-ink-foreground/20 pl-8 font-display text-lg italic text-ink-foreground/90 md:block">Estrategia digital para<br />un mercado sin fronteras.</p>
          </div>
          <div className="flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] text-ink-foreground">
            <a href="#">Inicio</a><a href="#servicios">Servicios</a><a href="#nosotros">Nosotros</a><a href="#contacto">Contacto</a>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl justify-between border-t border-ink-foreground/10 px-6 py-5 text-[10px] uppercase tracking-[0.2em] text-ink-foreground/60">
          <span>© 2026 VAYRO.MARKETING. All rights reserved.</span><span>República Dominicana | Global</span>
        </div>
      </footer>
    </main>
  );
}

function Field({ label, name, type = "text", required = true }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}{required && " *"}</span>
      <input name={name} type={type} required={required} maxLength={255} className="mt-2 w-full border-b border-input bg-transparent py-2 text-sm outline-none focus:border-primary" />
    </label>
  );
}

const selectCls = "mt-2 w-full border-b border-input bg-transparent py-2 text-sm outline-none focus:border-primary";

function Select({ label, name, options, className = "" }: { label: string; name: string; options: readonly string[]; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs text-muted-foreground">{label} *</span>
      <select name={name} required defaultValue="" className={selectCls}>
        <option value="" disabled>Selecciona</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function Contact() {
  const send = useServerFn(submitLead);
  const [state, setState] = useState<"idle" | "sending" | "ok" | "okNoCal" | "error">("idle");
  const [err, setErr] = useState("");
  const [minDate, setMinDate] = useState("");
  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    setMinDate(d.toISOString().slice(0, 10));
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setState("sending");
    try {
      const r = await send({
        data: {
          nombre: f["nombre"] ?? "", apellido: f["apellido"] ?? "", correo: f["correo"] ?? "",
          telefono: f["telefono"] ?? "", tipo: f["tipo"] ?? "", mensaje: f["mensaje"] ?? "",
          fecha: f["fecha"] ?? "", hora: (f["hora"] ?? "") as (typeof HORAS)[number],
          presupuesto: (f["presupuesto"] ?? "") as (typeof PRESUPUESTOS)[number],
          facturacion: (f["facturacion"] ?? "") as (typeof FACTURACIONES)[number],
        },
      });
      setState(r.calendar ? "ok" : "okNoCal");
      form.reset();
    } catch (x) {
      setErr(x instanceof Error ? x.message : "Error al enviar");
      setState("error");
    }
  }

  return (
    <section id="contacto" className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-2">
      <div>
        <Eyebrow>¿Listo para crecer?</Eyebrow>
        <h2 className="mt-6 font-display text-5xl italic">Hablemos de tu proyecto.</h2>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">Cuéntanos sobre tu negocio y agenda una consulta gratuita. Te ayudaremos a identificar las mejores oportunidades para llevar tu inmobiliaria al siguiente nivel.</p>
        <div className="mt-12 grid grid-cols-3 gap-6 text-xs">
          <div className="flex items-start gap-3"><CalendarDays className="shrink-0 text-primary" size={22} strokeWidth={1.4} />Consulta gratuita sin compromiso</div>
          <div className="flex items-start gap-3"><FileText className="shrink-0 text-primary" size={22} strokeWidth={1.4} />Análisis personalizado de tu marca</div>
          <div className="flex items-start gap-3"><Zap className="shrink-0 text-primary" size={22} strokeWidth={1.4} />Propuesta adaptada a tus objetivos</div>
        </div>
      </div>
      <form onSubmit={onSubmit} className="grid gap-6 rounded-sm border border-border bg-card p-8 sm:grid-cols-2">
        <Field label="Nombre" name="nombre" />
        <Field label="Apellido" name="apellido" />
        <Field label="Correo electrónico" name="correo" type="email" />
        <Field label="Teléfono / WhatsApp" name="telefono" type="tel" />
        <Select label="Tipo de negocio" name="tipo" options={TIPOS} className="sm:col-span-2" />
        <Select label="¿Qué presupuesto estimado tienes invertido o disponible para este proyecto?" name="presupuesto" options={PRESUPUESTOS} className="sm:col-span-2" />
        <Select label="¿Cuál es el nivel de facturación mensual actual de tu negocio?" name="facturacion" options={FACTURACIONES} className="sm:col-span-2" />
        <label className="block">
          <span className="text-xs text-muted-foreground">Fecha de la consulta *</span>
          <input name="fecha" type="date" required min={minDate} className={selectCls} />
        </label>
        <Select label="Hora (RD)" name="hora" options={HORAS} />
        <label className="block sm:col-span-2">
          <span className="text-xs text-muted-foreground">¿Cuál es tu principal desafío? *</span>
          <textarea name="mensaje" rows={3} required maxLength={1000} placeholder="¿Qué necesitas? ¿Cuáles son tus objetivos?" className="mt-2 w-full border border-input bg-transparent p-3 text-sm outline-none focus:border-primary" />
        </label>
        <button disabled={state === "sending"} className="flex items-center justify-center gap-3 rounded-sm bg-primary py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-primary-foreground transition hover:opacity-90 disabled:opacity-60 sm:col-span-2">
          {state === "sending" ? "Enviando..." : "Agendar consulta"} <ArrowRight size={14} />
        </button>
        {state === "ok" && <p className="text-sm text-primary sm:col-span-2">¡Gracias! Tu cita fue agendada y recibirás una invitación en tu correo.</p>}
        {state === "okNoCal" && <p className="text-sm text-primary sm:col-span-2">¡Gracias! Recibimos tu solicitud y te confirmaremos la hora pronto.</p>}
        {state === "error" && <p className="text-sm text-destructive sm:col-span-2">{err}</p>}
      </form>
    </section>
  );
}
