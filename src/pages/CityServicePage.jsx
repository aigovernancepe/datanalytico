import { useParams, Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import { findCityService, findCoreService, business, cities } from '../data/architecture'
import architecture from '../../architecture.json'

const serviceData = architecture.serviceHierarchy.serviceData
const cityData = architecture.serviceAreaPages.cities

export default function CityServicePage() {
  const { citySlug, serviceSlug } = useParams()
  const result = findCityService(citySlug, serviceSlug)

  if (!result) return <div className="page"><div className="container"><p>Page not found.</p></div></div>

  const { city, service } = result
  const data = serviceData[serviceSlug]
  const fullCity = cityData.find(c => c.slug === citySlug)
  const nearbyCities = cities.filter(c => c.slug !== citySlug)
  const otherServices = city.services.filter(s => s.slug !== serviceSlug)
  const coreService = findCoreService(serviceSlug)

  const crumbs = [
    { label: 'Home', url: '/' },
    { label: 'Areas We Serve', url: '/areas' },
    { label: city.name, url: city.url },
    { label: service.name, url: `/areas/${city.slug}/${service.slug}` }
  ]

  const faqItems = [
    {
      q: `How much does ${service.name.toLowerCase()} cost in ${city.name}?`,
      a: data?.priceRange
        ? `${service.name} in ${city.name} typically costs between CHF ${data.priceRange.min.toLocaleString()} and CHF ${data.priceRange.max.toLocaleString()} per ${data.priceRange.period}. Contact Datanalytico at ${business.phone} for a quote specific to your business and market.`
        : `Contact Datanalytico at ${business.phone} for ${service.name.toLowerCase()} pricing in ${city.name}. Every quote is based on your specific market, competition level, and goals.`
    },
    {
      q: `How quickly can Datanalytico start working with a ${city.name} business?`,
      a: `Datanalytico can begin a ${service.name.toLowerCase()} engagement for a ${city.name}-based business within one week of signing. ${fullCity?.responseTime || 'We meet virtually for fast onboarding.'} The first deliverable — typically an audit or strategy document — is ready within 7 to 10 business days.`
    },
    {
      q: `Is Datanalytico based in ${city.name}?`,
      a: `Datanalytico is based in ${business.city}, ${business.stateAbbrev}, and serves businesses across ${city.name} and the greater ${city.canton} region. All work is delivered remotely with virtual meetings, so your location does not affect the quality or speed of service.`
    },
    {
      q: `Do you offer ${service.name.toLowerCase()} for other cities near ${city.name}?`,
      a: `Yes. Datanalytico provides ${service.name.toLowerCase()} across Switzerland, including ${nearbyCities.map(c => c.name).join(' and ')}. Each engagement is tailored to the local market and competition level of the target city.`
    },
    {
      q: `What results can a ${city.name} business expect from ${service.name.toLowerCase()}?`,
      a: `Most ${city.name} businesses see measurable improvements in local search visibility within 60 to 90 days. Results depend on competition level and starting position. Datanalytico provides monthly reports with ranking data, traffic trends, and lead metrics so you can track progress clearly.`
    }
  ]

  return (
    <div className="page">
      <Breadcrumb crumbs={crumbs} />
      <section className="page__hero">
        <div className="container">
          <h1>{service.name} in {city.name}, Switzerland</h1>
          <p>Datanalytico delivers {service.name.toLowerCase()} for businesses in {city.name}, {city.canton}.</p>
        </div>
      </section>
      <div className="page__content">
        <div className="container page-body">
          <section className="content-section">
            <h2>{service.name} for {city.name} Businesses</h2>
            <p>{city.name} is home to {city.population.toLocaleString()} residents and thousands of businesses competing for local search visibility. {fullCity?.localContext || ''}</p>
            <p>Datanalytico provides {service.name.toLowerCase()} specifically tailored for the {city.name} market — accounting for local competition, search behavior, and the industries that drive the {city.canton} economy.</p>
          </section>

          {data?.processSteps && (
            <section className="content-section">
              <h2>Our {service.name} Process in {city.name}</h2>
              <div className="process-grid">
                {data.processSteps.map((step, i) => (
                  <div key={i} className="process-step">
                    <div className="process-step__num">{i + 1}</div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data?.priceRange && (
            <section className="content-section price-callout">
              <p>
                Most {service.name.toLowerCase()} engagements in {city.name} cost between <strong>CHF {data.priceRange.min.toLocaleString()}</strong> and <strong>CHF {data.priceRange.max.toLocaleString()}</strong> per {data.priceRange.period}.
                Call <a href={business.phoneTel}>{business.phone}</a> for a free estimate.
              </p>
            </section>
          )}

          <section className="content-section">
            <h2>Why Choose Datanalytico for {service.name} in {city.name}?</h2>
            <p>Datanalytico specializes in the Swiss market. We know how Google evaluates local businesses in {city.name} and across {city.canton}. Every campaign is built on real search data — not generic templates. {fullCity?.responseTime ? `${fullCity.responseTime}.` : ''} You see monthly reports with actual ranking data, so you always know what is working.</p>
          </section>

          {/* Cross-links: other services in this city */}
          {otherServices.length > 0 && (
            <section className="content-section">
              <h2>Other Services in {city.name}</h2>
              <div className="city-links">
                {otherServices.map(svc => (
                  <Link key={svc.slug} to={svc.url} className="city-link">
                    {svc.name} in {city.name} &rarr;
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Cross-links: same service in nearby cities */}
          {nearbyCities.length > 0 && (
            <section className="content-section">
              <h2>{service.name} in Nearby Cities</h2>
              <div className="city-links">
                {nearbyCities.map(nc => (
                  <Link key={nc.slug} to={`/areas/${nc.slug}/${serviceSlug}`} className="city-link">
                    {service.name} in {nc.name} &rarr;
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* FAQ */}
          <section className="content-section">
            <h2>Frequently Asked Questions — {service.name} in {city.name}</h2>
            <div className="faq-simple">
              {faqItems.map((faq, i) => (
                <div key={i} className="faq-simple__item">
                  <h3>{faq.q}</h3>
                  <p>{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="content-cta">
            <h2>Get {service.name} in {city.name}</h2>
            <p>Contact Datanalytico today for a free review of your local search presence in {city.name}.</p>
            <div className="content-cta__actions">
              <a href={business.phoneTel} className="btn btn--accent">Call {business.phone}</a>
              <Link to="/contact" className="btn btn--primary">Send a Message</Link>
            </div>
          </section>

          <p>
            <Link to={city.url}>&larr; All services in {city.name}</Link>
            {' | '}
            <Link to={coreService?.url || '/services'}>{service.name} overview &rarr;</Link>
          </p>
        </div>
      </div>

      {/* Schema: Service + FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Service',
              serviceType: service.name,
              provider: { '@id': `https://${business.domain}/#business` },
              areaServed: { '@type': 'City', name: city.name }
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqItems.map(f => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a }
              }))
            }
          ])
        }}
      />
    </div>
  )
}
