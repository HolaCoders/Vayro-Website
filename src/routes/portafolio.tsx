import { createFileRoute, redirect } from '@tanstack/react-router';
import { marketingHead } from '@/lib/marketing-head';
export const Route = createFileRoute('/portafolio')({beforeLoad: () => {throw redirect({to:'/case-studies',statusCode:301});}, head: () => marketingHead('Case Studies · VAYRO', 'Proyectos y simulaciones de adquisición inmobiliaria.')});
