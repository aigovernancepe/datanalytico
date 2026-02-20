import { Link } from 'react-router-dom'
import { business } from '../data/architecture'

export default function Breadcrumb({ crumbs }) {
  if (!crumbs || crumbs.length === 0) return null

  const schemaItems = crumbs.map((crumb, i) => {
    const item = {
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label
    }
    if (i < crumbs.length - 1) {
      item.item = `https://${business.domain}${crumb.url}`
    }
    return item
  })

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: schemaItems
  }

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <div className="container">
        <ol>
          {crumbs.map((crumb, i) => (
            <li key={crumb.url || crumb.label}>
              {i < crumbs.length - 1 ? (
                <Link to={crumb.url}>{crumb.label}</Link>
              ) : (
                <span className="breadcrumb__current" aria-current="page">{crumb.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </nav>
  )
}
