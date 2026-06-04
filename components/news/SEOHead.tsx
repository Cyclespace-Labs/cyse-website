import { SeoFields } from '@/lib/interface';

interface SEOHeadProps {
  seo?: SeoFields;
  siteUrl?: string;
  defaultImage?: string;
  title?: string;
  description?: string;
  publishedAt?: string;
}

export default function SEOHead({ 
  seo, 
  siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cyclespace.exchange/News',
  defaultImage = '/default-og-image.jpg',
  title: fallbackTitle = '',
  description: fallbackDescription = '',
  publishedAt
}: SEOHeadProps) {
  if (!seo) return null;

  const pageTitle = seo.title || fallbackTitle;
  const pageDescription = seo.description || fallbackDescription;
  const ogImage = seo.openGraph?.image || defaultImage;

  return (
    <>
      {/* Basic Meta Tags */}
      {pageTitle && <title>{pageTitle}</title>}
      {pageDescription && (
        <meta name="description" content={pageDescription} />
      )}
      {seo.keywords && seo.keywords.length > 0 && (
        <meta name="keywords" content={seo.keywords.join(', ')} />
      )}

      {/* Open Graph */}
      <meta property="og:title" content={seo.openGraph?.title || pageTitle} />
      <meta property="og:description" content={seo.openGraph?.description || pageDescription} />
      {seo.openGraph?.url && (
        <meta property="og:url" content={seo.openGraph.url} />
      )}
      {ogImage && (
        <meta property="og:image" content={ogImage} />
      )}
      {seo.openGraph?.siteName && (
        <meta property="og:site_name" content={seo.openGraph.siteName} />
      )}
      <meta property="og:type" content={seo.openGraph?.type || "article"} />
      
      {/* Article specific Open Graph tags */}
      {publishedAt && (
        <meta property="article:published_time" content={new Date(publishedAt).toISOString()} />
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content={seo.twitter?.card || "summary_large_image"} />
      {seo.twitter?.site && (
        <meta name="twitter:site" content={seo.twitter.site} />
      )}
      {seo.twitter?.creator && (
        <meta name="twitter:creator" content={seo.twitter.creator} />
      )}
      <meta name="twitter:title" content={seo.twitter?.title || pageTitle} />
      <meta name="twitter:description" content={seo.twitter?.description || pageDescription} />
      {seo.twitter?.image && (
        <meta name="twitter:image" content={seo.twitter.image} />
      )}

      {/* Robots */}
      {seo.robots && (
        <meta 
          name="robots" 
          content={`${seo.robots.noIndex ? 'noindex' : 'index'}, ${seo.robots.noFollow ? 'nofollow' : 'follow'}`} 
        />
      )}

      {/* Canonical URL */}
      {seo.canonicalUrl && <link rel="canonical" href={seo.canonicalUrl} />}

      {/* Custom Meta Attributes */}
      {seo.metaAttributes?.map((attr, index) => (
        <meta key={`${attr.key}-${index}`} name={attr.key} content={attr.value} />
      ))}
    </>
  );
}