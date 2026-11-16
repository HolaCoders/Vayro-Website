import { createFileRoute } from '@tanstack/react-router';
import { SiteHeader, SiteFooter, GrowthOffer, SectionLabel } from '@/components/marketing/site';
import { marketingHead } from '@/lib/marketing-head';
export const Route = createFileRoute('/services')({head: () => marketingHead('Services · Piloto de adquisición inmobiliaria', 'Real Estate Growth Acquisition System: implementación de 30 días por US$200 por proyecto. Auditoría, estrategia, Meta Ads, captación y organización de prospectos.'), component: Services});
function Services(){return <main><SiteHeader/><div className="site-container pt-16"><SectionLabel>Services / La oferta de Growth</SectionLabel><h1 className="page-title mt-6">Construye tu primera<br/>estructura de adquisición.</h1></div><GrowthOffer full/><SiteFooter/></main>;}
