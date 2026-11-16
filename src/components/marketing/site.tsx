import { Link, useRouterState } from '@tanstack/react-router';
import { useState, type ReactNode } from 'react';
import { ArrowUpRight, Menu, X, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GROWTH_PILOT } from '@/lib/growth-offer';
import villa from '@/assets/vayro-studio.jpg';
import studio from '@/assets/equipo-studio.jpg';
import sunset from '@/assets/hero.jpg';

const navigation = [
  { to: '/', name: 'Home' },
  { to: '/about', name: 'About' },
  { to: '/services', name: 'Services' },
  { to: '/case-studies', name: 'Case Studies' },
  { to: '/contact', name: 'Contact' },
] as const;
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: s => s.location.pathname });
  const links = navigation.map(({to, name}) => <Link key={to} to={to} aria-current={pathname === to ? 'page' : undefined} className={pathname === to ? 'nav-active' : ''}>{name}</Link>);
  return <header className="site-header"><div className="site-container flex items-center justify-between gap-5 py-5">
    <Link to="/" className="wordmark" aria-label="VAYRO Marketing, inicio">vayro<span className="text-primary">.</span><span className="wordmark-sub">GROWTH SYSTEMS</span></Link>
    <nav aria-label="Navegación principal" className="hidden items-center gap-6 lg:flex">{links}</nav>
    <div className="flex items-center gap-3"><Button asChild className="hidden sm:inline-flex rounded-full px-5 h-11"><Link to="/contact">Hablemos <ArrowUpRight /></Link></Button><Button variant="ghost" size="icon" className="lg:hidden text-ink-foreground" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</Button></div>
  </div>{open && <nav aria-label="Navegación móvil" className="site-container flex flex-col gap-5 pb-7 lg:hidden" onClick={() => setOpen(false)}>{links}</nav>}</header>;
}
export function SiteFooter() {
  return <footer className="bg-ink text-ink-foreground"><div className="site-container py-14"><div className="flex flex-col justify-between gap-8 md:flex-row"><Link to="/" className="wordmark">vayro<span className="text-primary">.</span><span className="wordmark-sub">GROWTH SYSTEMS</span></Link><p className="max-w-sm text-xl font-display">Growth Beyond<br/>Visibility.</p><nav aria-label="Navegación del pie" className="flex flex-wrap gap-5 text-sm">{navigation.map(n => <Link key={n.to} to={n.to}>{n.name}</Link>)}</nav></div><div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-ink-foreground/20 pt-6 text-xs text-ink-foreground/60"><span>© 2026 VAYRO.MARKETING</span><span>Real Estate Growth · República Dominicana</span></div></div></footer>;
}
export function SectionLabel({children}: {children: ReactNode}) { return <p className="section-label"><span/> {children}</p>; }
export function AboutSection({full = false}: {full?: boolean}) {
  return <section className="bg-secondary"><div className="site-container grid items-center gap-12 py-20 lg:grid-cols-2"><div className="relative"><img src={studio} alt="Espacio de planificación y diseño, imagen conceptual" loading="lazy" width={1536} height={1024} className="aspect-[4/3] w-full rounded-lg object-cover"/><span className="absolute bottom-4 left-4 rounded-full bg-background px-4 py-2 text-[10px] uppercase">Imagen conceptual · Estrategia y diseño</span></div><div><SectionLabel>About / Nuestra filosofía</SectionLabel><h2 className="section-title">La visibilidad es el inicio.<br/>La adquisición es el sistema.</h2><p className="mt-5 text-sm leading-relaxed text-muted-foreground">Una marca inmobiliaria necesita algo más que presencia: una conexión clara entre su proyecto, su audiencia y su proceso comercial. En VAYRO diseñamos esa estructura, con estrategia antes que acciones aisladas.</p><div className="mt-8 divide-y divide-border">{[['01','Diagnosticar','Entender el proyecto, su marketing y las oportunidades de adquisición.'],['02','Construir','Conectar campaña, captación y organización de prospectos.'],['03','Aprender y optimizar','Dar seguimiento durante el piloto y ajustar la estructura con lo aprendido.']].map(([n,t,d]) => <div key={n} className="flex gap-5 py-4"><span className="font-display text-sm pt-1">{n}</span><div><h3 className="font-display text-lg">{t}</h3>{full && <p className="mt-2 text-sm text-muted-foreground">{d}</p>}</div></div>)}</div>{!full && <Button asChild variant="link" className="mt-6 px-0 text-foreground"><Link to="/about">Nuestra metodología <ArrowRight/></Link></Button>}</div></div></section>;
}
export function GrowthOffer({full = false}: {full?: boolean}) {
  return <section className="site-container py-20"><SectionLabel>Services / Growth acquisition</SectionLabel><div className="mt-6 grid gap-10 lg:grid-cols-[1.6fr_1fr]"><div><h2 className="section-title mt-0">{GROWTH_PILOT.name}</h2><p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">{GROWTH_PILOT.objective}</p><p className="mt-8 text-xs font-semibold uppercase text-primary">Un proyecto inmobiliario. Una estructura conectada.</p></div><div className="border-l-2 border-primary pl-7"><p className="text-sm font-medium">{GROWTH_PILOT.pilot}</p><p className="mt-3 font-display text-5xl">US${GROWTH_PILOT.feeUsd}</p><p className="mt-4 text-xs leading-relaxed text-muted-foreground">Honorarios profesionales de VAYRO · Pago por proyecto</p><Button asChild className="mt-6 rounded-full h-11"><Link to="/contact">Consultar sobre el piloto <ArrowUpRight/></Link></Button></div></div>
  {full ? <div className="mt-14"><h3 className="font-display text-2xl">Qué incluye el piloto</h3><div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3">{GROWTH_PILOT.deliverables.map((d,i) => <article key={d.id} className="service-item"><div className="flex items-center justify-between"><Check className="size-6 text-primary"/><span className="text-xs text-muted-foreground">0{i+1}</span></div><h4 className="mt-5 font-display text-lg">{d.title}</h4><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d.detail}</p></article>)}</div></div> : <Button asChild variant="link" className="mt-8 px-0 text-foreground"><Link to="/services">Ver los seis entregables <ArrowRight/></Link></Button>}
  </section>;
}
const projects = [
  {name:'Captación para una villa residencial', category:'Residencial', type:'Campaña · Landing page · Prospectos', image:villa, detail:'Simulación de una estructura de captación para una propiedad residencial: campaña inicial, página de interés y organización de las consultas para el equipo comercial.'},
  {name:'Lanzamiento de un proyecto inmobiliario', category:'Desarrollo', type:'Auditoría · Estrategia · Adquisición', image:sunset, detail:'Simulación de un lanzamiento: diagnóstico del proyecto, definición de audiencia y diseño del recorrido desde el anuncio hasta el registro de un comprador potencial.'},
];
export function CaseStudiesSection({full = false}: {full?: boolean}) {
  const [filter, setFilter] = useState('Todos');
  const [selected, setSelected] = useState<string | null>(null);
  return <section className="site-container py-20"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><SectionLabel>Case Studies / Proyectos y simulaciones</SectionLabel><h2 className="section-title">De la estrategia<br/>a la estructura.</h2></div>{!full && <Button asChild variant="outline" className="rounded-full h-11"><Link to="/case-studies">Explorar casos <ArrowUpRight/></Link></Button>}</div><p className="mt-5 max-w-xl text-muted-foreground text-sm leading-relaxed">Simulaciones de adquisición inmobiliaria. Ilustran el enfoque de VAYRO; no son clientes reales ni resultados de campañas ejecutadas.</p>
  {full && <div className="mt-8 flex flex-wrap gap-2" aria-label="Filtrar casos">{['Todos','Residencial','Desarrollo'].map(f => <Button key={f} variant={filter === f ? 'default' : 'outline'} aria-pressed={filter === f} onClick={() => setFilter(f)} className="rounded-full">{f}</Button>)}</div>}
  <div className="mt-10 grid gap-8 md:grid-cols-2">{projects.filter(p => filter === 'Todos' || filter === p.category).map((p) => <article key={p.name} className="group"><div className="relative aspect-[16/10] overflow-hidden rounded-lg"><img src={p.image} alt={p.name + ', simulación conceptual'} loading="lazy" width={1920} height={1088} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"/><span className="absolute left-4 top-4 rounded-full bg-background px-3 py-1.5 text-[10px] uppercase">Simulación · {p.category}</span></div><div className="mt-5 flex justify-between gap-3"><div><p className="text-[11px] text-muted-foreground">{p.type}</p><h3 className="mt-2 font-display text-xl">{p.name}</h3></div><Button size="icon" variant="outline" className="rounded-full shrink-0" aria-expanded={selected === p.name} aria-label={'Ver '+p.name} onClick={() => setSelected(selected === p.name ? null : p.name)}><ArrowUpRight/></Button></div>{selected === p.name && <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">{p.detail}</p>}</article>)}</div></section>;
}
