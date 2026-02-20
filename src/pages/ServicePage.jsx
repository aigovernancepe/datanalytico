import { useParams, Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import { findCoreService, findChildService, business, cities } from '../data/architecture'
import architecture from '../../architecture.json'

const serviceData = architecture.serviceHierarchy.serviceData

export default function ServicePage() {
  const { serviceSlug, childSlug } = useParams()

  if (childSlug) {
    return <ChildServiceView parentSlug={serviceSlug} childSlug={childSlug} />
  }
  return <CoreServiceView serviceSlug={serviceSlug} />
}

function CoreServiceView({ serviceSlug }) {
  const service = findCoreService(serviceSlug)
  if (!service) return <NotFoundMsg />

  const data = serviceData[serviceSlug]
  const crumbs = [
    { label: 'Home', url: '/' },
    { label: 'Services', url: '/services' },
    { label: service.name, url: service.url }
  ]

  return (
    <div className="page">
      <Breadcrumb crumbs={crumbs} />
      <section className="page__hero">
        <div className="container">
          <h1>{service.name} in {business.city}, {business.stateAbbrev}</h1>
          <p>{service.name} for local businesses across Basel, Zurich, and Bern.</p>
        </div>
      </section>
      <div className="page__content">
        <div className="container page-body">
          <section className="content-section">
            <h2>How Does {service.name} Help Your Business?</h2>
            <p>{service.name} is one of the most effective ways for local businesses in Switzerland to gain visibility on Google. When customers in Basel, Zurich, or Bern search for what you offer, your business needs to appear in Google Maps, in organic results, and in AI-generated answers.</p>
            <p>Datanalytico delivers {service.name.toLowerCase()} built on verified Swiss search data. We research what your customers actually type into Google, identify gaps your competitors are missing, and build a plan that moves your rankings month over month.</p>
          </section>

          {data?.processSteps && (
            <section className="content-section">
              <h2>What Does Our {service.name} Process Look Like?</h2>
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
            <section className="content-section">
              <h2>How Much Does {service.name} Cost in Switzerland?</h2>
              <p>
                {service.name} from Datanalytico typically costs between CHF {data.priceRange.min.toLocaleString()} and CHF {data.priceRange.max.toLocaleString()} per {data.priceRange.period}.
                Pricing depends on competition level, number of target cities, and scope. Call <a href={business.phoneTel}>{business.phone}</a> for a quote.
              </p>
            </section>
          )}

          {service.children.length > 0 && (
            <section className="content-section">
              <h2>Specialized Services</h2>
              <div className="child-grid">
                {service.children.map(child => (
                  <Link key={child.slug} to={child.url} className="child-card">
                    <h3>{child.name}</h3>
                    <span className="child-card__link">Learn more &rarr;</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="content-section">
            <h2>{service.name} by City</h2>
            <div className="city-links">
              {cities.map(city => (
                <Link key={city.slug} to={`/areas/${city.slug}/${serviceSlug}`} className="city-link">
                  {service.name} in {city.name} &rarr;
                </Link>
              ))}
            </div>
          </section>

          <section className="content-cta">
            <h2>Ready to Improve Your Local Rankings?</h2>
            <p>Datanalytico delivers {service.name.toLowerCase()} that produce measurable results. No long-term contracts required.</p>
            <div className="content-cta__actions">
              <a href={business.phoneTel} className="btn btn--accent">Call {business.phone}</a>
              <Link to="/contact" className="btn btn--primary">Get a Free Review</Link>
            </div>
          </section>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: service.name,
            provider: { '@id': `https://${business.domain}/#business` },
            areaServed: cities.map(c => ({ '@type': 'City', name: c.name })),
            description: `${service.name} for local businesses in Switzerland.`
          })
        }}
      />
    </div>
  )
}

function ChildServiceView({ parentSlug, childSlug }) {
  const result = findChildService(parentSlug, childSlug)
  if (!result) return <NotFoundMsg />

  const data = serviceData[childSlug]
  const crumbs = [
    { label: 'Home', url: '/' },
    { label: result.parent.name, url: result.parent.url },
    { label: result.name, url: result.url }
  ]

  return (
    <div className="page">
      <Breadcrumb crumbs={crumbs} />
      <section className="page__hero">
        <div className="container">
          <h1>{result.name} in {business.city}, {business.stateAbbrev}</h1>
          <p>{result.name} for local businesses across Switzerland.</p>
        </div>
      </section>
      <div className="page__content">
        <div className="container page-body">
          <section className="content-section">
            <h2>What Is {result.name}?</h2>
            <p>{result.name} is a specialized service under <Link to={result.parent.url}>{result.parent.name}</Link>. Datanalytico delivers this for businesses in Basel, Zurich, and Bern who need focused attention on this part of their local search strategy.</p>
          </section>

          {data?.processSteps && (
            <section className="content-section">
              <h2>Our {result.name} Process</h2>
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
            <section className="content-section">
              <h2>How Much Does {result.name} Cost?</h2>
              <p>
                {result.name} from Datanalytico costs between CHF {data.priceRange.min.toLocaleString()} and CHF {data.priceRange.max.toLocaleString()} per {data.priceRange.period}.
                Call <a href={business.phoneTel}>{business.phone}</a> to discuss your needs.
              </p>
            </section>
          )}

          <section className="content-section">
            <p><Link to={result.parent.url}>&larr; Back to {result.parent.name}</Link></p>
          </section>

          <section className="content-cta">
            <h2>Get Started with {result.name}</h2>
            <p>Contact Datanalytico for a consultation.</p>
            <div className="content-cta__actions">
              <a href={business.phoneTel} className="btn btn--accent">Call {business.phone}</a>
              <Link to="/contact" className="btn btn--primary">Send a Message</Link>
            </div>
          </section>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: result.name,
            provider: { '@id': `https://${business.domain}/#business` },
            areaServed: cities.map(c => ({ '@type': 'City', name: c.name }))
          })
        }}
      />
    </div>
  )
}

function NotFoundMsg() {
  return (
    <div className="page">
      <div className="page__content">
        <div className="container">
          <p>Service not found. <Link to="/services">View all services &rarr;</Link></p>
        </div>
      </div>
    </div>
  )
}
