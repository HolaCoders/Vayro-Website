import { createFileRoute } from '@tanstack/react-router';
import { SiteHeader, SiteFooter, CaseStudiesSection } from '@/components/marketing/site';
import { marketingHead } from '@/lib/marketing-head';
export const Route = createFileRoute('/case-studies')({head: () => marketingHead('Case Studies · Simulaciones inmobiliarias', 'Explora simulaciones conceptuales de adquisición para proyectos inmobiliarios. Estrategia, campañas, captación y prospectos sin resultados inventados.'), component: Cases});
function Cases(){return <main><SiteHeader/><div className="site-container pt-16"><h1 className="page-title">Case Studies<span className="text-primary">.</span></h1></div><CaseStudiesSection full/><SiteFooter/></main>;}
