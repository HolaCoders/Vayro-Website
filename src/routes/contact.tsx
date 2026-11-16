import { createFileRoute } from '@tanstack/react-router';
import { SiteHeader, SiteFooter, SectionLabel } from '@/components/marketing/site';
import { ContactForm } from '@/components/marketing/contact-form';
import { marketingHead } from '@/lib/marketing-head';
export const Route = createFileRoute('/contact')({head: () => marketingHead('Contact · Consulta de adquisición inmobiliaria', 'Agenda una consulta gratuita con VAYRO o escribe por WhatsApp al +1 809 849 7534 sobre el piloto de adquisición inmobiliaria de 30 días.'), component: Contact});
function Contact(){return <main><SiteHeader/><div className="site-container pt-16"><SectionLabel>Contact / Real Estate Growth</SectionLabel><h1 className="page-title mt-6">Hablemos de<br/>tu proyecto inmobiliario.</h1></div><ContactForm/><SiteFooter/></main>;}
