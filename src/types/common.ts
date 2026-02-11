// ================================
// Core & Shared Domain Types
// ================================

/**
 * Social links used across Footer, Hero, and SocialBtns
 * Must be strict to avoid TS structural conflicts
 */
export interface SocialLink {
  label: string;
  href: string;
  icon?: string;
  iconBgClass?: string;
  platform?: string;
}

/**
 * Fun fact items used in About section
 */
export interface FunFactData {
  icon?: string;
  number?: number | string;
  title?: string;
}

/**
 * Certificates / achievements
 */
export interface Certificate {
  id: string;
  title: string;
  issuer?: string;
  date?: string;
  credentialUrl?: string;
  downloadUrl?: string;
  image?: string;
}

// ================================
// Animation / Utility Types
// ================================

/**
 * react-type-animation sequence type
 */
export type TypeAnimationSequence = Array<string | number>;

// ================================
// Component Data Contracts
// ================================

/**
 * Base interface for component data
 * (kept minimal on purpose)
 */
export interface ComponentData {
  id?: string;
}

/**
 * Hero section data
 */
export interface HeroData extends ComponentData {
  name: string;
  heading: string;
  typingText?: TypeAnimationSequence;
  description?: string;
  btnText?: string;
  btnUrl?: string;
  cvUrl?: string;
  imgUrl: string;
}

/**
 * About section data
 */
export interface AboutData extends ComponentData {
  imgSrc: string;
  description?: string;
  funfacts?: FunFactData[];
  skills?: unknown[]; // Can be refined later
  timeline?: unknown[];
}

/**
 * Experience section data
 */
export interface ExperienceData extends ComponentData {
  timeline?: unknown[];
}

/**
 * Testimonials section data
 */
export interface TestimonialData extends ComponentData {
  testimonials?: unknown[];
}

/**
 * Contact section data
 */
export interface ContactData extends ComponentData {
  form?: unknown;
  contactInfo?: unknown;
}

/**
 * Portfolio / Projects section data
 */
export interface PortfolioShowcaseData extends ComponentData {
  projects?: unknown[];
}
