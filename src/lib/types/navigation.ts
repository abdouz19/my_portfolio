export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
}

export interface SiteMetadata {
  title: string;
  description: string;
  ogImage: string;
  canonicalUrl: string;
  twitterHandle?: string;
}
