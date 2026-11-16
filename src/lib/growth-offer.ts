export const GROWTH_PILOT = {
  name: 'Real Estate Growth Acquisition System',
  pilot: '30-Day Implementation Pilot',
  feeUsd: 200,
  durationDays: 30,
  billing: 'project',
  objective: 'Diseñar e implementar una primera estructura de adquisición digital que permita a una empresa inmobiliaria atraer, captar y organizar oportunidades comerciales de compradores potenciales.',
  deliverables: [
    { id: 'audit', title: 'Auditoría inicial', detail: 'Auditoría inicial de marketing y adquisición.' },
    { id: 'strategy', title: 'Estrategia de captación', detail: 'Estrategia de captación para un proyecto inmobiliario.' },
    { id: 'meta-campaign', title: 'Campaña inicial de Meta Ads', detail: 'Configuración y gestión de una campaña inicial de Meta Ads.' },
    { id: 'capture', title: 'Landing page o formulario', detail: 'Una landing page o formulario de captación.' },
    { id: 'prospects', title: 'Organización de prospectos', detail: 'Estructura básica de organización de prospectos.' },
    { id: 'optimization', title: 'Seguimiento y optimización', detail: 'Seguimiento y optimización durante 30 días.' },
  ],
} as const;
export const WHATSAPP_NUMBER = '18098497534';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola VAYRO, me interesa el Real Estate Growth Acquisition System y el piloto de 30 días.')}`;
