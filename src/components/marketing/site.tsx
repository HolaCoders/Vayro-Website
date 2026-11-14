import { Link, useRouterState } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowUpRight, Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import villa from '@/assets/vayro-studio.jpg';
import clinic from '@/assets/portfolio-estetica.jpg';
import studio from '@/assets/equipo-studio.jpg';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({select: s => s.location.pathname});
  return <header className="site-header"><div className="site-container flex items-center justify-between gap-5 py-5">
    <Link to="/" className="wordmark" aria-label="VAYRO Marketing, inicio">vayro<span className="text-primary">.</span><span className="wordmark-sub">MARKETING</span></Link>
    <nav aria-label="Navegación principal" className="hidden items-center gap-7 lg:flex">
      <Link to="/" className={pathname === '/' ? 'nav-active' : ''}>Inicio</Link>
      <a href="/#servicios">Servicios</a>
      <Link to="/portafolio" className={pathname === '/portafolio' ? 'nav-active' : ''}>Portafolio</Link>
      <Link to="/equipo" className={pathname === '/equipo' ? 'nav-active' : ''}>Equipo</Link>
    </nav>
    <div className="flex items-center gap-3"><Button asChild className="hidden sm:inline-flex rounded-full px-5 h-11"><a href="/#contacto">Hablemos <ArrowUpRight /></a></Button><Button variant="ghost" size="icon" className="lg:hidden text-ink-foreground" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</Button></div>
  </div>{open && <nav aria-label="Navegación móvil" className="site-container flex flex-col gap-5 pb-7 lg:hidden" onClick={() => setOpen(false)}><Link to="/">Inicio</Link><a href="/#servicios">Servicios</a><Link to="/portafolio">Portafolio</Link><Link to="/equipo">Equipo</Link><a href="/#contacto">Hablemos</a></nav>}</header>;
}
export function SiteFooter() {
  return <footer className="bg-ink text-ink-foreground"><div className="site-container py-14"><div className="flex flex-col justify-between gap-8 md:flex-row"><Link to="/" className="wordmark">vayro<span className="text-primary">.</span><span className="wordmark-sub">MARKETING</span></Link><p className="max-w-sm text-xl font-display">Buenas ideas.<br/>Grandes oportunidades.</p><nav aria-label="Navegación del pie" className="flex flex-wrap gap-6 text-sm"><Link to="/portafolio">Portafolio</Link><Link to="/equipo">Equipo</Link><a href="/#contacto">Contacto <ArrowUpRight className="inline size-4"/></a></nav></div><div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-ink-foreground/20 pt-6 text-xs text-ink-foreground/60"><span>© 2026 VAYRO.MARKETING</span><span>República Dominicana · Visión global</span></div></div></footer>;
}
export function SectionLabel({children}: {children: React.ReactNode}) { return <p className="section-label"><span/> {children}</p>; }
const projects = [
  {name:'Espacios que inspiran', category:'Inmobiliario', type:'Dirección creativa · Contenido digital', image:villa},
  {name:'Belleza con propósito', category:'Clínicas estéticas', type:'Identidad visual · Estrategia digital', image:clinic},
  {name:'Una nueva perspectiva', category:'Inmobiliario', type:'Posicionamiento · Experiencia de marca', image:studio},
];
export function PortfolioSection({full = false}: {full?: boolean}) {
  const [filter, setFilter] = useState('Todos');
  const [selected, setSelected] = useState<string | null>(null);
  return <section className="site-container py-20" aria-labelledby="portfolio-heading"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><SectionLabel>Portafolio / Dirección creativa</SectionLabel><h2 id="portfolio-heading" className="section-title">Ideas que se convierten<br/>en presencia.</h2></div>{!full && <Button asChild variant="outline" className="rounded-full h-11"><Link to="/portafolio">Explorar portafolio <ArrowUpRight/></Link></Button>}</div><p className="mt-5 max-w-xl text-muted-foreground text-sm leading-relaxed">Conceptos visuales de muestra para inmobiliarias y clínicas estéticas. Una mirada a lo que podemos crear para tu marca.</p>
  {full && <div className="mt-8 flex flex-wrap gap-2" aria-label="Filtrar portafolio">{['Todos','Inmobiliario','Clínicas estéticas'].map(f => <Button key={f} variant={filter === f ? 'default' : 'outline'} onClick={() => setFilter(f)} className="rounded-full">{f}</Button>)}</div>}
  <div className="mt-10 grid gap-8 md:grid-cols-3">{projects.filter(p => filter === 'Todos' || filter === p.category).map((p, i) => <article key={p.name} className="group"><div className="relative aspect-[4/3] overflow-hidden rounded-lg"><img src={p.image} alt={p.name + ', concepto visual de ' + p.category.toLowerCase()} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"/><span className="absolute left-4 top-4 rounded-full bg-background px-3 py-1.5 text-[10px] uppercase">Concepto / 0{i+1}</span></div><div className="mt-5 flex justify-between gap-3"><div><p className="text-[11px] text-muted-foreground">{p.type}</p><h3 className="mt-2 font-display text-xl">{p.name}</h3></div><Button size="icon" variant="outline" className="rounded-full shrink-0" aria-label={'Ver '+p.name} onClick={() => setSelected(selected === p.name ? null : p.name)}><ArrowUpRight/></Button></div>{selected === p.name && <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">Propuesta conceptual para {p.category.toLowerCase()}: una identidad coherente, contenido cuidado y una presencia digital centrada en conectar con la audiencia adecuada.</p>}</article>)}</div></section>;
}
export function TeamSection({full = false}: {full?: boolean}) {
  return <section className="bg-secondary"><div className="site-container grid items-center gap-12 py-20 lg:grid-cols-2"><div className="relative"><img src={studio} alt="Espacio creativo conceptual con diseño, fotografía y arquitectura" loading="lazy" width={1536} height={1024} className="aspect-[4/3] w-full rounded-lg object-cover"/><span className="absolute bottom-4 left-4 rounded-full bg-background px-4 py-2 text-[10px] uppercase">Nuestro universo creativo · Imagen conceptual</span></div><div><SectionLabel>Equipo VAYRO</SectionLabel><h2 className="section-title">Distintas miradas.<br/>Un mismo objetivo.</h2><p className="mt-5 text-sm leading-relaxed text-muted-foreground">Estrategia, creatividad y análisis se encuentran para darle a tu negocio una dirección clara. Nos mueve crear marcas que conectan y oportunidades que importan.</p><div className="mt-8 divide-y divide-border">{[['01','Estrategia & crecimiento','Posicionamiento, campañas y oportunidades de negocio.'],['02','Diseño & contenido','Identidad, fotografía y experiencias digitales.'],['03','Análisis & optimización','Una mirada constante a lo que funciona y lo que puede mejorar.']].map(([n,t,d]) => <div key={n} className="flex gap-5 py-4"><span className="font-display text-primary text-sm pt-1">{n}</span><div><h3 className="font-display text-lg">{t}</h3>{full && <p className="mt-2 text-sm text-muted-foreground">{d}</p>}</div></div>)}</div>{!full && <Button asChild variant="link" className="mt-6 px-0 text-foreground"><Link to="/equipo">Conoce nuestro enfoque <ArrowRight/></Link></Button>}</div></div></section>;
}
