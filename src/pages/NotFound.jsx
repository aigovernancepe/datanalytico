import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'

export default function NotFound() {
  const crumbs = [
    { label: 'Home', url: '/' },
    { label: '404 — Page Not Found', url: '#' }
  ]

  return (
    <div className="page">
      <Breadcrumb crumbs={crumbs} />
      <section className="page__hero">
        <div className="container">
          <h1>404 — Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
        </div>
      </section>
      <div className="page__content">
        <div className="container" style={{ textAlign: 'center' }}>
          <Link to="/" style={{ fontSize: '1.125rem', fontWeight: 600 }}>
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
