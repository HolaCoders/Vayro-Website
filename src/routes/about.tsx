import { createFileRoute } from '@tanstack/react-router';
import { SiteHeader, SiteFooter, AboutSection, SectionLabel } from '@/components/marketing/site';
import { marketingHead } from '@/lib/marketing-head';
export const Route = createFileRoute('/about')({head: () => marketingHead('About · Filosofía y metodología', 'Conoce la filosofía de VAYRO: diagnosticar, construir y optimizar sistemas de adquisición para proyectos inmobiliarios.'), component: About});
function About(){return <main><SiteHeader/><div className="site-container py-16"><SectionLabel>About / VAYRO</SectionLabel><h1 className="page-title mt-6">Estrategia antes<br/>que visibilidad.</h1></div><AboutSection full/><SiteFooter/></main>;}
