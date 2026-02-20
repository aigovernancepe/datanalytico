import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { business, navigation } from '../data/architecture'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(prev => !prev)
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {/* Top Bar */}
      <div className="topbar">
        <div className="container">
          <span className="topbar__location">
            Serving {business.city}, {business.stateAbbrev} &amp; Surrounding Areas
          </span>
          <span className="topbar__phone">
            <a href={business.phoneTel}>{business.phone}</a>
          </span>
        </div>
      </div>

      {/* Main Header */}
      <header className="header">
        <div className="container">
          <Link to="/" className="header__logo" onClick={closeMenu}>
            Data<span>nalytico</span>
          </Link>

          <nav className="header__nav" aria-label="Main navigation">
            <ul>
              {navigation.map(item => (
                <li key={item.url}>
                  <NavLink
                    to={item.url}
                    className={({ isActive }) => isActive ? 'active' : ''}
                    end={item.url === '/'}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__cta">
            <a href={business.phoneTel}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {business.phone}
            </a>
          </div>

          <button
            className={`header__hamburger ${menuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <nav className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-label="Mobile navigation">
        <ul>
          {navigation.map(item => (
            <li key={item.url}>
              <Link to={item.url} onClick={closeMenu}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mobile-menu__cta">
          <a href={business.phoneTel} onClick={closeMenu}>
            Call {business.phone}
          </a>
        </div>
      </nav>
    </>
  )
}
