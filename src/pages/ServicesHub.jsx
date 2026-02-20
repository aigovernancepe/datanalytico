import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import { coreServices, business } from '../data/architecture'

export default function ServicesHub() {
  const crumbs = [
    { label: 'Home', url: '/' },
    { label: 'Services', url: '/services' }
  ]

  return (
    <div className="page">
      <Breadcrumb crumbs={crumbs} />
      <section className="page__hero">
        <div className="container">
          <h1>Our Services</h1>
          <p>Local SEO and digital marketing services for businesses across Switzerland.</p>
        </div>
      </section>
      <div className="page__content">
        <div className="container">
          <div className="services-hub__grid">
            {coreServices.map(service => (
              <div key={service.slug} className="services-hub__group">
                <h2>
                  <Link to={service.url}>{service.name}</Link>
                </h2>
                <div className="services-hub__list">
                  <Link to={service.url} className="services-hub__link">
                    {service.name} &rarr;
                  </Link>
                  {service.children.map(child => (
                    <Link key={child.slug} to={child.url} className="services-hub__link services-hub__link--child">
                      {child.name} &rarr;
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
