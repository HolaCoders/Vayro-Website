import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState, type FormEvent } from "react";
import { CalendarDays, FileText, Zap, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/marketing/site";
import { WHATSAPP_URL } from "@/lib/growth-offer";
import { submitLead, PRESUPUESTOS, FACTURACIONES, HORAS, ahoraRD, slotDisponible } from "@/lib/leads.functions";
const TIPOS = ["Residencial", "Comercial", "Lujo", "Terrenos", "Proyecto en desarrollo", "Clínica estética", "Medicina estética / Spa", "Otro"] as const;
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

export function ContactForm() {
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
    <section id="contacto" className="site-container grid gap-12 py-16 lg:grid-cols-2">
      <div>
        <SectionLabel>Contact / Hablemos de adquisición</SectionLabel>
        <h2 className="section-title">Tu próximo paso empieza aquí.</h2>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">Cuéntanos sobre tu negocio y agenda una consulta gratuita. Te ayudaremos a identificar las mejores oportunidades para construir una primera estructura de adquisición para tu proyecto inmobiliario.</p>
        <Button asChild variant="outline" className="mt-8 h-12 rounded-full"><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Hablemos por WhatsApp <MessageCircle /></a></Button>
        <p className="mt-3 text-xs text-muted-foreground">+1 809 849 7534</p>
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
