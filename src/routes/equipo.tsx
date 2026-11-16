import { createFileRoute, redirect } from '@tanstack/react-router';
import { marketingHead } from '@/lib/marketing-head';
export const Route = createFileRoute('/equipo')({beforeLoad: () => {throw redirect({to:'/about',statusCode:301});}, head: () => marketingHead('About · VAYRO', 'Nuestra filosofía y metodología de adquisición inmobiliaria.')});
