import { Link } from 'react-router-dom'
import { business, serviceAreas } from '../data/architecture'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Contact */}
          <div className="footer__col">
            <h4>Contact</h4>
            <div className="footer__phone">
              <a href={business.phoneTel}>{business.phone}</a>
            </div>
            <div className="footer__contact-item" style={{ marginTop: '0.75rem' }}>
              <a href={`mailto:${business.email}`}>{business.email}</a>
            </div>
            <div className="footer__contact-item">
              {business.city}, {business.stateAbbrev} {business.zip}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h4>Quick Links</h4>
            <div className="footer__links">
              <Link to="/">Home</Link>
              <Link to="/services">Services</Link>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/blog">Blog</Link>
            </div>
          </div>

          {/* Service Areas */}
          <div className="footer__col">
            <h4>Service Areas</h4>
            <div className="footer__areas">
              {serviceAreas.map(area => (
                <Link
                  key={area}
                  to={`/areas/${area.toLowerCase()}`}
                  className="footer__area-tag"
                >
                  {area}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="footer__col">
            <h4>Follow Us</h4>
            <div className="footer__social">
              <a href="#" aria-label="Facebook" rel="noopener noreferrer">FB</a>
              <a href="#" aria-label="LinkedIn" rel="noopener noreferrer">LI</a>
              <a href="#" aria-label="Google Business Profile" rel="noopener noreferrer">G</a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          &copy; {year} {business.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
