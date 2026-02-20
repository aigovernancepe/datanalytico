import { useState } from 'react'
import { Link } from 'react-router-dom'
import { business, coreServices, cities, serviceAreas } from '../data/architecture'
import homepageContent from '../../homepage-content.json'

const { hero, whyChooseUs, capsuleContent, services, about, faqs, finalCta } = homepageContent

export default function HomePage() {
  return (
    <div className="page homepage">
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <h1>{hero.h1}</h1>
          <p className="hero__sub">{hero.subheadline}</p>
          <div className="hero__ctas">
            <a href={hero.primaryCta.action} className="btn btn--accent">
              {hero.primaryCta.text}
            </a>
            <Link to={hero.secondaryCta.action} className="btn btn--outline">
              {hero.secondaryCta.text}
            </Link>
          </div>
          <div className="trust-strip">
            {hero.trustStrip.map((signal, i) => (
              <span key={i} className="trust-strip__item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                {signal}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section section--white">
        <div className="container">
          <h2 className="section__title">Why Businesses Choose Datanalytico</h2>
          <div className="diff-grid">
            {whyChooseUs.map((item, i) => (
              <div key={i} className="diff-card">
                <div className="diff-card__number">{String(i + 1).padStart(2, '0')}</div>
                <h3>{item.headline}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section className="section section--primary">
        <div className="container">
          <div className="form-section">
            <div className="form-section__text">
              <h2>Get a Free Local SEO Review</h2>
              <p>Tell us about your business and we will show you exactly where you stand in local search — and what it takes to move up.</p>
            </div>
            <form className="lead-form" onSubmit={e => e.preventDefault()}>
              <input type="text" placeholder="Your Name" className="lead-form__input" required />
              <input type="tel" placeholder="Phone Number" className="lead-form__input" required />
              <input type="email" placeholder="Email Address" className="lead-form__input" required />
              <select className="lead-form__input" required defaultValue="">
                <option value="" disabled>Select a Service</option>
                {coreServices.map(s => (
                  <option key={s.slug} value={s.slug}>{s.name}</option>
                ))}
              </select>
              <textarea placeholder="Tell us about your business" className="lead-form__input lead-form__textarea" rows={3} />
              <button type="submit" className="btn btn--accent btn--full">Send My Free Review</button>
            </form>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container">
          <h2 className="section__title">What We Do for Local Businesses</h2>
          <div className="services-grid">
            {services.map(svc => (
              <div key={svc.slug} className="service-card">
                <h3><Link to={`/${svc.slug === 'google-ads' ? 'ppc-google-ads' : svc.slug}`}>{svc.name}</Link></h3>
                <p>{svc.description}</p>
                <Link to={`/${svc.slug === 'google-ads' ? 'ppc-google-ads' : svc.slug}`} className="service-card__link">
                  Learn more &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capsule Content — AI Citability */}
      <section className="section section--white">
        <div className="container">
          {capsuleContent.blocks.map((block, i) => (
            <div key={i} className="capsule">
              <h2>{block.h2}</h2>
              <p>{block.capsule}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Service Areas */}
      <section className="section">
        <div className="container">
          <h2 className="section__title">Areas We Serve</h2>
          <p className="section__sub">Based in {business.city}, serving businesses across Switzerland's major business centers.</p>
          <div className="areas-grid">
            {cities.map(city => (
              <Link key={city.slug} to={city.url} className="area-card">
                <h3>{city.name}</h3>
                <p className="area-card__pop">{city.canton} &middot; {city.population.toLocaleString()} residents</p>
                <p className="area-card__desc">{city.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section section--white">
        <div className="container">
          <div className="about-section">
            <h2>{about.heading}</h2>
            <p>{about.content}</p>
            <Link to="/about" className="btn btn--primary">About Datanalytico &rarr;</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <h2 className="section__title">Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <FaqItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: faqs.map(f => ({
                  '@type': 'Question',
                  name: f.question,
                  acceptedAnswer: { '@type': 'Answer', text: f.answer }
                }))
              })
            }}
          />
        </div>
      </section>

      {/* Locations (compact) */}
      <section className="section section--dark">
        <div className="container">
          <h2 className="section__title section__title--light">Locations We Serve</h2>
          <div className="locations-strip">
            {serviceAreas.map(area => (
              <Link key={area} to={`/areas/${area.toLowerCase()}`} className="locations-strip__item">
                {area}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section section--accent">
        <div className="container cta-final">
          <h2>{finalCta.headline}</h2>
          <p>{finalCta.subtext}</p>
          <div className="cta-final__actions">
            <a href={`tel:${business.phone.replace(/\s/g, '')}`} className="btn btn--dark btn--lg">
              Call {business.phone}
            </a>
            <Link to="/contact" className="btn btn--outline-dark btn--lg">
              Send a Message
            </Link>
          </div>
        </div>
      </section>

      {/* LocalBusiness Schema */}
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
            },
            areaServed: cities.map(c => ({ '@type': 'City', name: c.name })),
            sameAs: []
          })
        }}
      />
    </div>
  )
}

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item ${open ? 'faq-item--open' : ''}`}>
      <button className="faq-item__q" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{question}</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="faq-item__icon">
          <polyline points={open ? '18 15 12 9 6 15' : '6 9 12 15 18 9'} />
        </svg>
      </button>
      {open && <div className="faq-item__a"><p>{answer}</p></div>}
    </div>
  )
}
