import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import { blogPosts } from '../data/blogPosts'

export default function BlogIndex() {
  const crumbs = [
    { label: 'Home', url: '/' },
    { label: 'Blog', url: '/blog' }
  ]

  return (
    <div className="page">
      <Breadcrumb crumbs={crumbs} />
      <section className="page__hero">
        <div className="container">
          <h1>Blog</h1>
          <p>Local SEO insights, guides, and tips for Swiss businesses.</p>
        </div>
      </section>
      <div className="page__content">
        <div className="container page-body">
          <div className="blog-grid">
            {blogPosts.map(post => (
              <article key={post.slug} className="blog-card">
                <div className="blog-card__meta">
                  <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-CH', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                  <span className="blog-card__cat">{post.category}</span>
                </div>
                <h2><Link to={`/blog/${post.slug}`}>{post.title}</Link></h2>
                <p>{post.description}</p>
                <Link to={`/blog/${post.slug}`} className="blog-card__link">Read more &rarr;</Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
