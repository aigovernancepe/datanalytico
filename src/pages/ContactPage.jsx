import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import { business, coreServices, serviceAreas } from '../data/architecture'

export default function ContactPage() {
  const crumbs = [
    { label: 'Home', url: '/' },
    { label: 'Contact', url: '/contact' }
  ]

  return (
    <div className="page">
      <Breadcrumb crumbs={crumbs} />
      <section className="page__hero">
        <div className="container">
          <h1>Contact {business.name}</h1>
          <p>Get in touch for a free local SEO consultation.</p>
        </div>
      </section>
      <div className="page__content">
        <div className="container">
          <div className="contact-grid">
            {/* Left: Contact Info */}
            <div className="contact-info">
              <div className="contact-info__item">
                <h3>Phone</h3>
                <a href={business.phoneTel} className="contact-info__phone">{business.phone}</a>
              </div>
              <div className="contact-info__item">
                <h3>Email</h3>
                <a href={`mailto:${business.email}`}>{business.email}</a>
              </div>
              <div className="contact-info__item">
                <h3>Location</h3>
                <p>{business.city}, {business.stateAbbrev} {business.zip}<br />Switzerland</p>
              </div>
              <div className="contact-info__item">
                <h3>Service Areas</h3>
                <div className="contact-info__areas">
                  {serviceAreas.map(area => (
                    <Link key={area} to={`/areas/${area.toLowerCase()}`}>{area}</Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="contact-form-wrap">
              <h2>Send Us a Message</h2>
              <p>Tell us about your business and what you need. We respond within one business day.</p>
              <form className="contact-form" onSubmit={e => e.preventDefault()}>
                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Your name" required />
                  </div>
                  <div className="contact-form__field">
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" id="phone" placeholder="Your phone number" required />
                  </div>
                </div>
                <div className="contact-form__field">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="your@email.com" required />
                </div>
                <div className="contact-form__field">
                  <label htmlFor="service">Service Needed</label>
                  <select id="service" required defaultValue="">
                    <option value="" disabled>Select a service</option>
                    {coreServices.map(s => (
                      <option key={s.slug} value={s.slug}>{s.name}</option>
                    ))}
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="contact-form__field">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" placeholder="Tell us about your business and goals" rows={4} />
                </div>
                <button type="submit" className="btn btn--accent btn--full">Send Message</button>
              </form>
            </div>
          </div>

          {/* Trust Strip */}
          <div className="contact-trust">
            <span>No spam. No sales pressure.</span>
            <span>Free initial consultation.</span>
            <span>Response within 1 business day.</span>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            mainEntity: { '@id': `https://${business.domain}/#business` }
          })
        }}
      />
    </div>
  )
}
