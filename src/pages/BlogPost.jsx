import { useParams, Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import { blogPosts } from '../data/blogPosts'
import { business } from '../data/architecture'

export default function BlogPost() {
  const { postSlug } = useParams()
  const post = blogPosts.find(p => p.slug === postSlug)

  if (!post) {
    return (
      <div className="page">
        <div className="page__content">
          <div className="container">
            <p>Post not found. <Link to="/blog">Back to blog &rarr;</Link></p>
          </div>
        </div>
      </div>
    )
  }

  const crumbs = [
    { label: 'Home', url: '/' },
    { label: 'Blog', url: '/blog' },
    { label: post.title, url: `/blog/${post.slug}` }
  ]

  return (
    <div className="page">
      <Breadcrumb crumbs={crumbs} />
      <section className="page__hero">
        <div className="container">
          <h1>{post.title}</h1>
          <div className="blog-post__meta">
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-CH', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            <span>&middot;</span>
            <span>{post.author}</span>
          </div>
        </div>
      </section>
      <div className="page__content">
        <div className="container page-body">
          <article className="blog-post__content">
            {post.content.map((block, i) => {
              if (block.type === 'h2') return <h2 key={i}>{block.text}</h2>
              if (block.type === 'h3') return <h3 key={i}>{block.text}</h3>
              return <p key={i}>{block.text}</p>
            })}
          </article>

          <section className="content-cta">
            <h2>Need Help with Local SEO?</h2>
            <p>Datanalytico helps Swiss businesses rank higher in local search. Contact us for a free review.</p>
            <div className="content-cta__actions">
              <a href={business.phoneTel} className="btn btn--accent">Call {business.phone}</a>
              <Link to="/contact" className="btn btn--primary">Get a Free Review</Link>
            </div>
          </section>

          <p><Link to="/blog">&larr; Back to all posts</Link></p>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            author: { '@type': 'Organization', name: post.author },
            publisher: { '@type': 'Organization', name: business.name, url: `https://${business.domain}/` }
          })
        }}
      />
    </div>
  )
}
