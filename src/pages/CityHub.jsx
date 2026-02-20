import { useParams, Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import { findCity, business, cities } from '../data/architecture'
import architecture from '../../architecture.json'

const cityData = architecture.serviceAreaPages.cities

export default function CityHub() {
  const { citySlug } = useParams()
  const city = findCity(citySlug)
  const fullCity = cityData.find(c => c.slug === citySlug)

  if (!city) return <div className="page"><div className="container"><p>City not found.</p></div></div>

  const crumbs = [
    { label: 'Home', url: '/' },
    { label: 'Areas We Serve', url: '/areas' },
    { label: city.name, url: city.url }
  ]

  const nearbyCities = cities.filter(c => c.slug !== citySlug)

  return (
    <div className="page">
      <Breadcrumb crumbs={crumbs} />
      <section className="page__hero">
        <div className="container">
          <h1>Local SEO Services in {city.name}, Switzerland</h1>
          <p>{city.description}</p>
        </div>
      </section>
      <div className="page__content">
        <div className="container page-body">
          <section className="content-section">
            <h2>Why Do {city.name} Businesses Need Local SEO?</h2>
            <p>{fullCity?.localContext || city.description}</p>
            <p>Datanalytico serves businesses in {city.name} from our base in {business.city}. {fullCity?.responseTime ? `Response: ${fullCity.responseTime}.` : ''} We work with {city.name}-based businesses across every service vertical — from professional services to retail, healthcare to hospitality.</p>
          </section>

          <section className="content-section">
            <h2>Our Services in {city.name}</h2>
            <p>Datanalytico provides the full range of local SEO and digital marketing services to businesses in {city.name}, {city.canton}.</p>
            <div className="child-grid">
              {city.services.map(svc => (
                <Link key={svc.slug} to={svc.url} className="child-card">
                  <h3>{svc.name}</h3>
                  <span className="child-card__link">{svc.name} in {city.name} &rarr;</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="content-section">
            <h2>About {city.name}</h2>
            <p>{city.name} is located in canton {city.canton} with a population of approximately {city.population.toLocaleString()} residents. {fullCity?.localContext || ''}</p>
          </section>

          {nearbyCities.length > 0 && (
            <section className="content-section">
              <h2>We Also Serve</h2>
              <div className="city-links">
                {nearbyCities.map(nc => (
                  <Link key={nc.slug} to={nc.url} className="city-link">
                    Local SEO in {nc.name} &rarr;
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="content-cta">
            <h2>Grow Your {city.name} Business Online</h2>
            <p>Datanalytico helps {city.name} businesses rank higher in local search. Contact us for a free review.</p>
            <div className="content-cta__actions">
              <a href={business.phoneTel} className="btn btn--accent">Call {business.phone}</a>
              <Link to="/contact" className="btn btn--primary">Get a Free Review</Link>
            </div>
          </section>

          <p><Link to="/areas">&larr; Back to Areas We Serve</Link></p>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Local SEO Services',
            provider: { '@id': `https://${business.domain}/#business` },
            areaServed: { '@type': 'City', name: city.name, '@id': `https://en.wikipedia.org/wiki/${city.name}` }
          })
        }}
      />
    </div>
  )
}
