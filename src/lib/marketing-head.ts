export function marketingHead(title: string, description: string) {
  return { meta: [
    { title: `${title} | VAYRO` },
    { name: 'description', content: description },
    { property: 'og:title', content: `${title} | VAYRO` },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] };
}
