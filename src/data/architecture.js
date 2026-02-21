export const business = {
  name: 'Datanalytico',
  phone: '+41 76 757 64 23',
  phoneTel: 'tel:+41767576423',
  email: 'info@datanalytico.com',
  city: 'Basel',
  state: 'Basel-Stadt',
  stateAbbrev: 'BS',
  country: 'CH',
  domain: 'datanalytico.com'
}

export const navigation = [
  { label: 'Startseite', labelEn: 'Home', url: '/' },
  { label: 'Dienstleistungen', labelEn: 'Services', url: '/services' },
  { label: 'Einzugsgebiete', labelEn: 'Areas We Serve', url: '/areas' },
  { label: 'Über uns', labelEn: 'About', url: '/about' },
  { label: 'Kontakt', labelEn: 'Contact', url: '/contact' }
]

export const coreServices = [
  {
    name: 'Local SEO Services',
    slug: 'local-seo',
    url: '/local-seo',
    children: [
      { name: 'Citation Building & Management', slug: 'citation-building', url: '/local-seo/citation-building' },
      { name: 'On-Page SEO', slug: 'on-page-seo', url: '/local-seo/on-page-seo' },
      { name: 'Link Building for Local Businesses', slug: 'link-building', url: '/local-seo/link-building' }
    ]
  },
  {
    name: 'Website Design & Development',
    slug: 'website-design',
    url: '/website-design',
    children: [
      { name: 'Service Area Website Design', slug: 'service-area-websites', url: '/website-design/service-area-websites' },
      { name: 'Website Redesign', slug: 'website-redesign', url: '/website-design/website-redesign' },
      { name: 'Landing Page Design', slug: 'landing-pages', url: '/website-design/landing-pages' }
    ]
  },
  {
    name: 'Google Business Profile Management',
    slug: 'google-business-profile',
    url: '/google-business-profile',
    children: [
      { name: 'GBP Optimization', slug: 'gbp-optimization', url: '/google-business-profile/gbp-optimization' },
      { name: 'Review Management', slug: 'review-management', url: '/google-business-profile/review-management' },
      { name: 'Google Maps SEO', slug: 'google-maps-seo', url: '/google-business-profile/google-maps-seo' }
    ]
  },
  {
    name: 'Content Creation',
    slug: 'content-creation',
    url: '/content-creation',
    children: [
      { name: 'Blog Writing Services', slug: 'blog-writing', url: '/content-creation/blog-writing' },
      { name: 'Service Page Content', slug: 'service-page-content', url: '/content-creation/service-page-content' }
    ]
  },
  {
    name: 'Local Social Media',
    slug: 'local-social-media',
    url: '/local-social-media',
    children: [
      { name: 'Social Media Setup & Optimization', slug: 'social-media-setup', url: '/local-social-media/social-media-setup' },
      { name: 'Social Content Calendar', slug: 'content-calendar', url: '/local-social-media/content-calendar' }
    ]
  },
  {
    name: 'PPC & Google Ads',
    slug: 'ppc-google-ads',
    url: '/ppc-google-ads',
    children: [
      { name: 'Google Search Ads', slug: 'google-search-ads', url: '/ppc-google-ads/google-search-ads' },
      { name: 'Local Service Ads', slug: 'local-service-ads', url: '/ppc-google-ads/local-service-ads' }
    ]
  }
]

export const cities = [
  {
    name: 'Basel',
    slug: 'basel',
    url: '/areas/basel',
    canton: 'Basel-Stadt',
    regionPhrase: 'in Basel und Umgebung',
    population: 180000,
    description: 'Basel ist die drittgrösste Stadt der Schweiz und ein globales Zentrum für Life Sciences und Pharma. Hunderte von KMU im Raum Basel brauchen lokale Sichtbarkeit, um wettbewerbsfähig zu bleiben.',
    services: coreServices.map(s => ({ name: s.name, slug: s.slug, url: `/areas/basel/${s.slug}` }))
  },
  {
    name: 'Zürich',
    slug: 'zurich',
    url: '/areas/zurich',
    canton: 'Zürich',
    regionPhrase: 'im Kanton Zürich',
    population: 434335,
    description: 'Zürich ist die grösste Stadt der Schweiz und Finanzhauptstadt. Mit über 116\'000 Unternehmen ist der Wettbewerb um lokale Suchsichtbarkeit intensiv.',
    services: coreServices.map(s => ({ name: s.name, slug: s.slug, url: `/areas/zurich/${s.slug}` }))
  },
  {
    name: 'Bern',
    slug: 'bern',
    url: '/areas/bern',
    canton: 'Bern',
    regionPhrase: 'in Bern und Umgebung',
    population: 146000,
    description: 'Bern ist die Bundeshauptstadt der Schweiz und ein KMU-Zentrum — 67 % der Arbeitsplätze sind in Unternehmen mit weniger als 250 Mitarbeitern.',
    services: coreServices.map(s => ({ name: s.name, slug: s.slug, url: `/areas/bern/${s.slug}` }))
  }
]

export const serviceAreas = ['Basel', 'Zürich', 'Bern']

export function findCoreService(slug) {
  return coreServices.find(s => s.slug === slug)
}

export function findChildService(parentSlug, childSlug) {
  const parent = findCoreService(parentSlug)
  if (!parent) return null
  const child = parent.children.find(c => c.slug === childSlug)
  return child ? { ...child, parent } : null
}

export function findCity(slug) {
  return cities.find(c => c.slug === slug)
}

export function findCityService(citySlug, serviceSlug) {
  const city = findCity(citySlug)
  const service = findCoreService(serviceSlug)
  if (!city || !service) return null
  return { city, service }
}
