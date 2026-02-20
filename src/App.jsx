import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import FloatingCallButton from './components/FloatingCallButton'

import HomePage from './pages/HomePage'
import ServicesHub from './pages/ServicesHub'
import ServicePage from './pages/ServicePage'
import AreasHub from './pages/AreasHub'
import CityHub from './pages/CityHub'
import CityServicePage from './pages/CityServicePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import BlogIndex from './pages/BlogIndex'
import BlogPost from './pages/BlogPost'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          {/* Homepage */}
          <Route path="/" element={<HomePage />} />

          {/* Services */}
          <Route path="/services" element={<ServicesHub />} />
          <Route path="/:serviceSlug" element={<ServicePage />} />
          <Route path="/:serviceSlug/:childSlug" element={<ServicePage />} />

          {/* Areas */}
          <Route path="/areas" element={<AreasHub />} />
          <Route path="/areas/:citySlug" element={<CityHub />} />
          <Route path="/areas/:citySlug/:serviceSlug" element={<CityServicePage />} />

          {/* About & Contact */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Blog */}
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:postSlug" element={<BlogPost />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingCallButton />
    </>
  )
}
