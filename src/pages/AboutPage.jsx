import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import { business, serviceAreas, coreServices } from '../data/architecture'

export default function AboutPage() {
  const crumbs = [
    { label: 'Home', url: '/' },
    { label: 'About Us', url: '/about' }
  ]

  return (
    <div className="page">
      <Breadcrumb crumbs={crumbs} />
      <section className="page__hero">
        <div className="container">
          <h1>About {business.name}</h1>
          <p>Local SEO experts based in {business.city}, Switzerland.</p>
        </div>
      </section>
      <div className="page__content">
        <div className="container page-body">
          <section className="content-section">
            <h2>Who Is Datanalytico?</h2>
            <p>Datanalytico is a local SEO and digital marketing agency based in {business.city}, {business.stateAbbrev}, Switzerland. We help local businesses in Basel, Zurich, and Bern get found on Google — in Maps, in organic search, and in AI-generated answers.</p>
            <p>We work exclusively with businesses that serve a local market. Every strategy we build is grounded in verified Swiss search data: real keyword volumes, actual competitor rankings, and Google Business Profile performance benchmarks from the CH market.</p>
          </section>

          <section className="content-section">
            <h2>What Makes Datanalytico Different?</h2>
            <p>Most digital marketing agencies run the same playbook for every market. Swiss local search works differently — multi-language queries, Swiss-specific directories, and a Google algorithm that treats the CH market with unique regional signals.</p>
            <p>Datanalytico focuses on this. We do not offer social media management for global brands or run e-commerce SEO campaigns. We build local search visibility for businesses that serve customers in a specific city or region. That focus means better results, faster.</p>
          </section>

          {/* Team Placeholder */}
          <section className="content-section">
            <h2>Meet the Team</h2>
            <div className="team-placeholder">
              <div className="team-card">
                <div className="team-card__photo" />
                <h3>Founder & Lead Strategist</h3>
                <p>Background in data analytics and search engine optimization. Specializes in entity-based local SEO and Google Business Profile strategy for Swiss businesses.</p>
              </div>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', marginTop: '1rem' }}>
              Full team bios and photos coming soon.
            </p>
          </section>

          <section className="content-section">
            <h2>Where Do We Work?</h2>
            <p>Datanalytico is based in {business.city} ({business.zip}) and serves businesses across Switzerland. Our primary service areas are:</p>
            <ul className="area-list">
              {serviceAreas.map(area => (
                <li key={area}>
                  <Link to={`/areas/${area.toLowerCase()}`}>{area}</Link>
                </li>
              ))}
            </ul>
            <p>All work is delivered remotely with virtual meetings. Your location does not affect the quality or speed of our service.</p>
          </section>

          <section className="content-section">
            <h2>Our Services</h2>
            <ul className="service-list">
              {coreServices.map(svc => (
                <li key={svc.slug}>
                  <Link to={svc.url}>{svc.name}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="content-section trust-section">
            <h2>Why Trust Datanalytico?</h2>
            <div className="trust-grid">
              <div className="trust-item">
                <h3>Transparent Reporting</h3>
                <p>Monthly reports with actual ranking data, traffic numbers, and lead metrics. No vague summaries.</p>
              </div>
              <div className="trust-item">
                <h3>No Lock-In Contracts</h3>
                <p>Month-to-month engagements. You stay because results compound, not because you are locked in.</p>
              </div>
              <div className="trust-item">
                <h3>Swiss Market Focus</h3>
                <p>We work in the CH market exclusively. Your strategy fits the region.</p>
              </div>
              <div className="trust-item">
                <h3>You Own Everything</h3>
                <p>Every asset we build — website content, GBP optimization, citations — belongs to you.</p>
              </div>
            </div>
          </section>

          <section className="content-cta">
            <h2>Ready to Talk?</h2>
            <p>Contact Datanalytico for a free review of your local search presence.</p>
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
            '@type': 'ProfessionalService',
            '@id': `https://${business.domain}/#business`,
            name: business.name,
            telephone: business.phone,
            email: business.email,
            url: `https://${business.domain}/`,
            address: {
              '@type': 'PostalAddress',
              addressLocality: business.city,
              addressRegion: business.state,
              postalCode: business.zip,
              addressCountry: business.country
            }
          })
        }}
      />
    </div>
  )
}
