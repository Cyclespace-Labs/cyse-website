

export interface Author {
  _id: string;
  _type: 'author';
  name: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  role?: string;
  bio?: string;
  avatar?: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
    alt?: string;
  };
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
  isStaff?: boolean;
  email?: string;
}

export interface Tag {
  name: string;
  color: string;
}

export interface Impact {
  name: string;
  color: string;
}

export interface simpleNewsCard {
  slug: string; 
  title: string;
  smallDescription: string;
  currentSlug: string;
  titleImage: any;
  publishedAt: string;
  categoryName: any;
  category: any;
  impacts: Impact[];
  tags: Tag[];
  author: Author | null;
  keyPoints?: Array<{
    _key: string;
    point: string;
    description?: string;
  }>;
}


export interface fullNews {
  _id: string;
  conclusion: any;
  currentSlug: string;
  title: string;
  smallDescription?: string;
  content: any;
  titleImage: any;
  headImage: any;
  contentImage: any;
  research: any;
  publishedAt: string;
  categoryName: any;
  category: any;
  impacts: Impact[];
  tags: Tag[];
  author: Author | null;
  keyPoints?: Array<{
    _key: string;
    point: string;
    description?: string;
  }>;
  seo?: SeoFields;
}

export interface PageProps {
  params: Promise<{ slug: string }>; // Change this from object to Promise
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface simpleResearchCard {
  author: Author | null;
  title: string;
  smallDescription: string;
  currentSlug: string;
  titleImage: any;
  publishedAt: string;
  categoryName: any;
  category: any;
  impacts: Impact[];
  tags: Tag[];

}

export interface fullResearch {
  currentSlug: string;
  title: string;
  content: any;
  titleImage: any;
  headImage: any;
  contentImage: any;
  research: any;
  publishedAt: string;
  categoryName: any;
  category: any;
  impacts: Impact[];
  tags: Tag[];

}

export type DateFormatOptions = {
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  day?: 'numeric' | '2-digit';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
};

export interface SeoFields {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    image?: string;
    siteName?: string;
    type?: string;
  };
  twitter?: {
    card?: string;
    site?: string;
    creator?: string;
    title?: string;
    description?: string;
    image?: string;
  };
  robots?: {
    noIndex?: boolean;
    noFollow?: boolean;
  };
  metaAttributes?: Array<{
    key: string;
    value: string;
  }>;
}

export interface Article {
  _id: string;
  title: string;
  smallDescription?: string;
  slug: { current: string };
  publishedAt: string;
  content: any[];
  seo?: SeoFields;
  // Keep other fields for compatibility
  currentSlug?: string;
  categoryName?: any;
  author?: Author | null;
  [key: string]: any;
}



// Add this interface for Sanity SEO field schema
export interface SanitySeoFields {
  _type: 'seoFields';
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    image?: any; // Image reference
    siteName?: string;
    type?: string;
  };
  twitter?: {
    card?: string;
    site?: string;
    creator?: string;
    title?: string;
    description?: string;
    image?: any; // Image reference
  };
  robots?: {
    noIndex?: boolean;
    noFollow?: boolean;
  };
  metaAttributes?: Array<{
    _key: string;
    key: string;
    value: string;
  }>;
}