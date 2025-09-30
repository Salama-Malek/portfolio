import React from 'react';
// import Brands from '../components/Brands';
// import Projects from '../components/Projects';
import Testimonial from '../components/Testimonial';
import Hero from '../components/Hero';
// import Robot3DSection from '../components/Robot3D';
import About from '../components/About';
// import Service from '../components/Service';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Loading from '../components/Loading';
// import ReviewsGallery from '../components/ReviewsGallery';
import PortfolioShowcase from '../components/PortfolioShowcase';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t, ready, i18n } = useTranslation();
  
  // Wait for translations to be ready and loaded
  if (!ready || !i18n.isInitialized) {
    return <Loading />;
  }

  // Get translation data with fallbacks
  const homePageData = t('homePage', { returnObjects: true }) || {};
  
  const {
  hero = {},
  socialBtns = [],
  // brands = [],
  about = {},
  experience = {},
  testimonial = {},
  contact = {},
  portfolioShowcase = {},
  } = homePageData;

  return (
    <>
      <Hero key={i18n.language} data={hero} socialData={socialBtns} />
      {/* <Robot3DSection /> */}
      {/* <Brands data={brands} /> */}
      <About data={about} />
      {/* <ReviewsGallery
        heading={{ title: 'Client Reviews', subtitle: 'Snapshots from Khamsat' }}
        images={[
          '/reviews/11047a5cb70a289ffce3c0e6561d9409.png',
          '/reviews/12a3924ef2b896cfba174f30bfc0753e.png',
          '/reviews/2689ec40e809b37ec730a5630d44a648.png',
          '/reviews/3fefc0d7a020a8d149bd13a338a72277.png',
          '/reviews/43d8461bce3214bf3d3a830beb4e4825.png',
          '/reviews/461adbea90978a20d803b66ecc2df621.png',
          '/reviews/56ad2ac9c8e3762e5e9d83f2887f5a24.png',
          '/reviews/59b25a5867817b1a30332046c22f95f7.png',
          '/reviews/792d62d464fe2b06692e315f436fab55.png',
          '/reviews/79efb6178015069234f034d49eededf6.png',
          '/reviews/7b0ea8871f4704ecf8b2482a00d2f7fb.png',
          '/reviews/7c658841ab2b0afb39792ad9a1df3154.png',
          '/reviews/ae6b13c06b69f4552230f0d7bfadbd8b.png',
          '/reviews/c372213c22dc456333c06ee0f8e26c3b.png',
          '/reviews/c6ad1c67c637c480134fe1c4f92a4180.png',
          '/reviews/e43d41bc435f909ddd2a2dee34944bed.png',
          '/reviews/e6c53fcb3f47a75c178bc78270b51d9f.png',
          '/reviews/f0a614ad28a990a7fbe8629cebedcc85.png',
          '/reviews/f96f0bba13c1c5af6c10e6f49d14c4ed.png',
        ]}
      /> */}
      <PortfolioShowcase data={portfolioShowcase} />
      <Experience data={experience} />
      <Testimonial data={testimonial} />
      <Contact data={contact} socialData={socialBtns} />
    </>
  );
}
