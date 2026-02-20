import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import { cities, business } from '../data/architecture'

export default function AreasHub() {
  const crumbs = [
    { label: 'Home', url: '/' },
    { label: 'Areas We Serve', url: '/areas' }
  ]

  return (
    <div className="page">
      <Breadcrumb crumbs={crumbs} />
      <section className="page__hero">
        <div className="container">
          <h1>Areas We Serve — Local SEO Across Switzerland</h1>
          <p>Based in {business.city}, serving businesses in Basel, Zurich, and Bern.</p>
        </div>
      </section>
      <div className="page__content">
        <div className="container">
          <div className="areas-hub__grid">
            {cities.map(city => (
              <div key={city.slug} className="areas-hub__card">
                <h3><Link to={city.url}>{city.name}</Link></h3>
                <p>{city.description}</p>
                <div className="areas-hub__services">
                  {city.services.map(svc => (
                    <Link key={svc.slug} to={svc.url} className="areas-hub__service-tag">
                      {svc.name}
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
