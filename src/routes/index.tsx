import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState, type FormEvent } from "react";
import {
  Target, Camera, Megaphone, Monitor, BarChart3, TrendingUp, Gem, Heart, Sparkles, Globe,
  CalendarDays, FileText, Zap, ArrowRight,
} from "lucide-react";
import hero from "@/assets/vayro-studio.jpg";
import { Button } from "@/components/ui/button";
import { SiteHeader, SiteFooter, PortfolioSection, TeamSection, SectionLabel } from "@/components/marketing/site";

import { submitLead, PRESUPUESTOS, FACTURACIONES, HORAS, ahoraRD, slotDisponible } from "@/lib/leads.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VAYRO Marketing | Inmobiliarias y clínicas estéticas" },
      { name: "description", content: "Estrategia, creatividad y marketing digital para inmobiliarias y clínicas estéticas. Descubre nuestro portafolio y agenda una consulta." },
      { property: "og:title", content: "VAYRO Marketing | Tu marca en su mejor versión" },
      { property: "og:description", content: "Más visibilidad. Más compradores. Agenda tu consulta gratuita." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const TIPOS = ["Residencial", "Comercial", "Lujo", "Terrenos", "Proyecto en desarrollo", "Clínica estética", "Medicina estética / Spa", "Otro"] as const;

const services = [
  { icon: Target, t: "Estrategia de Marketing", d: "Definimos tu posicionamiento y audiencia ideal para atraer a los clientes correctos." },
  { icon: Camera, t: "Creación de Contenido", d: "Fotografía, video y textos que destacan el valor de tu negocio y tu marca." },
  { icon: Megaphone, t: "Publicidad Digital", d: "Campañas en Meta y Google para conectar con clientes potenciales calificados." },
  { icon: Monitor, t: "Diseño Web & Landing Pages", d: "Páginas optimizadas para captar leads y convertir visitas en consultas." },
  { icon: BarChart3, t: "Gestión de Redes Sociales", d: "Contenido estratégico y comunidad activa que posiciona tu marca." },
  { icon: TrendingUp, t: "Analytics & Optimización", d: "Medimos, analizamos y ajustamos para maximizar tus resultados." },
];
function Eyebrow({ children }: { children: string; light?: boolean }) { return <SectionLabel>{children}</SectionLabel>; }
function Index() {
  return <main className="bg-background">
    <SiteHeader />
    <section className="modern-hero">
      <img src={hero} alt="Villa contemporánea con piscina y arquitectura tropical" width={1920} height={1088} className="hero-photo" />
      <div className="hero-shade" />
      <div className="site-container relative py-20 md:py-24">
        <p className="flex items-center gap-2 text-xs text-ink-foreground/80"><span className="size-2 rounded-full bg-primary"/> Estrategia digital. Impacto real.</p>
        <h1 className="hero-title mt-6">VAYRO<span className="text-primary">.</span><br/><span className="hero-subtitle">Tu marca, en su<br/>mejor versión.</span></h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-foreground/75">Conectamos inmobiliarias y clínicas estéticas con las personas correctas. Estrategia, creatividad y marketing que abre nuevas oportunidades.</p>
        <Button asChild className="mt-8 h-12 rounded-full px-6"><a href="#contacto">Solicita una consulta <ArrowRight/></a></Button>
        <div className="mt-12 flex gap-6 text-[10px] uppercase text-ink-foreground/65"><span>Inmobiliarias</span><span className="border-l border-ink-foreground/30 pl-6">Clínicas estéticas</span></div>
      </div>
    </section>
    <section id="servicios" className="site-container py-20">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><SectionLabel>Lo que hacemos</SectionLabel><h2 className="section-title">Todo lo que tu marca<br/>necesita para crecer.</h2></div><p className="max-w-sm text-sm leading-relaxed text-muted-foreground">Una estrategia integral. Cada pieza conectada con tus objetivos, desde la primera impresión hasta la próxima consulta.</p></div>
      <div className="mt-10 grid gap-0 sm:grid-cols-2 lg:grid-cols-3">{services.map(({icon: I,t,d}, i) => <article key={t} className="service-item"><div className="flex items-center justify-between"><I className="text-primary" size={28} strokeWidth={1.5}/><span className="text-xs text-muted-foreground">0{i+1}</span></div><h3 className="mt-6 font-display text-xl">{t}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p></article>)}</div>
    </section>
    <PortfolioSection/>
    <TeamSection/>
    <Contact/>
    <SiteFooter/>
  </main>;
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
  const navigate = useNavigate();
  const [state, setState] = useState<"idle" | "sending" | "ok" | "okNoCal" | "error">("idle");
  const [err, setErr] = useState("");
  const [minDate, setMinDate] = useState("");
  const [fecha, setFecha] = useState("");
  useEffect(() => {
    setMinDate(ahoraRD());
  }, []);
  const horasDisponibles = fecha ? HORAS.filter((h) => slotDisponible(fecha, h)) : [...HORAS];

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
      setFecha("");
      navigate({ to: "/gracias", search: { nombre: f["nombre"] ?? "" } });
    } catch (x) {
      setErr(x instanceof Error ? x.message : "Error al enviar");
      setState("error");
    }
  }

  return (
    <section id="contacto" className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-2">
      <div>
        <Eyebrow>¿Listo para crecer?</Eyebrow>
        <h2 className="section-title">Hablemos de tu proyecto.</h2>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">Cuéntanos sobre tu negocio y agenda una consulta gratuita. Te ayudaremos a identificar las mejores oportunidades para llevar tu inmobiliaria o clínica estética al siguiente nivel.</p>
        <div className="mt-10 grid gap-5 text-sm sm:grid-cols-3">
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
          <input name="fecha" type="date" required min={minDate} value={fecha} onChange={(e) => setFecha(e.target.value)} className={selectCls} />
        </label>
        <div>
          <Select label="Hora (RD)" name="hora" options={horasDisponibles} />
          {fecha && horasDisponibles.length === 0 && <p className="mt-2 text-xs text-muted-foreground">No hay horarios disponibles para esa fecha: se necesitan 4 horas de anticipación. Elige otro día.</p>}
        </div>
        <label className="block sm:col-span-2">
          <span className="text-xs text-muted-foreground">¿Cuál es tu principal desafío? *</span>
          <textarea name="mensaje" rows={3} required maxLength={1000} placeholder="¿Qué necesitas? ¿Cuáles son tus objetivos?" className="mt-2 w-full border border-input bg-transparent p-3 text-sm outline-none focus:border-primary" />
        </label>
        <Button disabled={state === "sending"} className="flex items-center justify-center gap-3 h-auto whitespace-normal rounded-md bg-primary py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-primary-foreground transition hover:opacity-90 disabled:opacity-60 sm:col-span-2">
          {state === "sending" ? "Enviando..." : "Agendar consulta"} <ArrowRight size={14} />
        </Button>
        {state === "ok" && <p className="text-sm text-primary sm:col-span-2">¡Gracias! Tu cita fue agendada y recibirás una invitación en tu correo.</p>}
        {state === "okNoCal" && <p className="text-sm text-primary sm:col-span-2">¡Gracias! Recibimos tu solicitud y te confirmaremos la hora pronto.</p>}
        {state === "error" && <p className="text-sm text-destructive sm:col-span-2">{err}</p>}
      </form>
    </section>
  );
}
