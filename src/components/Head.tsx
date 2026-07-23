interface HeadProps {
  pathname?: string;
}

export const Head = ({ pathname = '/' }: HeadProps) => {
  const siteUrl = 'https://www.114barwhiskeyrow.com/';
  const businessName = 'One Fourteen';
  const businessDescription = 'One Fourteen is a late night bar on Whiskey Row in downtown Louisville, KY. Open Tue–Sun until 2am. Walk-ins only. DJs and game day sound on.';
  const phone = '+1-502-907-1400';

  const pageSEO: Record<string, { title: string; description: string; canonical: string }> = {
    '/': {
      title: 'One Fourteen | Best Late-Night Bar in Louisville KY on Whiskey Row',
      description: 'One Fourteen is the best late-night bar in Louisville, KY on Whiskey Row. Open Tue–Sun, 4pm–2am. Walk-ins only. 21+. DJs, game-day sound, cocktails, and Sunday industry night. Top-rated bar in downtown Louisville.',
      canonical: 'https://www.114barwhiskeyrow.com/',
    },
    '/visit': {
      title: 'Visit One Fourteen | Hours, Parking & Directions | Best Bar in Louisville KY',
      description: 'Visit One Fourteen bar at 114 W Main St on Whiskey Row in downtown Louisville, KY. Open Tue–Sun, 4pm–2am. Walk-ins only. Get directions, parking info, and what to expect at Louisville\'s best late-night bar.',
      canonical: 'https://www.114barwhiskeyrow.com/visit',
    },
    '/events': {
      title: 'Bar Events in Louisville KY | DJs, Industry Night & Game Days',
      description: 'Discover events at One Fourteen, a top-rated bar in Louisville, KY. Weekly DJs, Sunday Industry Night, and game-day sound on. See what\'s happening tonight at the best bar on Whiskey Row.',
      canonical: 'https://www.114barwhiskeyrow.com/events',
    },
    '/gallery': {
      title: 'Gallery | Inside One Fourteen Bar in Louisville KY on Whiskey Row',
      description: 'Photos from One Fourteen, the best late-night bar in Louisville, KY. See cocktails, the Yard, DJs, and downtown Louisville nightlife at our Whiskey Row location.',
      canonical: 'https://www.114barwhiskeyrow.com/gallery',
    },
    '/contact': {
      title: 'Contact One Fourteen Bar | Louisville KY | Whiskey Row',
      description: 'Contact One Fourteen bar in Louisville, KY on Whiskey Row. Phone: (502) 907-1400, Email: info@114whiskeyrow.com. Open Tue–Sun, 4pm–2am. Walk-ins only. 21+.',
      canonical: 'https://www.114barwhiskeyrow.com/contact',
    },
  };

  const normalized = pathname && pathname !== '/' ? pathname.replace(/\/$/, '') : '/';
  const seo = pageSEO[normalized] || pageSEO['/'];

  const logoUrl = 'https://static.wixstatic.com/media/528274_112a88f0f95c4632b6449db5f7575a0b~mv2.png';

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'BarOrPub',
    'name': businessName,
    'description': businessDescription,
    'url': seo.canonical,
    'telephone': phone,
    'servesCuisine': 'Bar',
    'image': logoUrl,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '114 W Main St',
      'addressLocality': 'Louisville',
      'addressRegion': 'KY',
      'postalCode': '40202',
      'addressCountry': 'US'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '38.2526',
      'longitude': '-85.7585'
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        'opens': '16:00',
        'closes': '02:00'
      }
    ],
    'priceRange': '$$',
    'sameAs': [
      'https://www.instagram.com/onefourteenwhiskeyrow/'
    ]
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': businessName,
    'url': siteUrl,
    'logo': logoUrl,
    'sameAs': [
      'https://www.instagram.com/onefourteenwhiskeyrow/'
    ],
    'contactPoint': {
      '@type': 'ContactPoint',
      'contactType': 'Customer Service',
      'telephone': phone
    }
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={seo.canonical} />

      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="author" content={businessName} />
      <meta name="keywords" content="bar in Louisville KY, late night bar Louisville, Whiskey Row bar, downtown Louisville bar, cocktail bar Louisville, best bar Louisville" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.canonical} />
      <meta property="og:site_name" content={businessName} />
      <meta property="og:image" content={logoUrl} />
      <meta property="og:image:width" content="1024" />
      <meta property="og:image:height" content="1024" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={logoUrl} />

      <meta name="geo.position" content="38.2526;-85.7585" />
      <meta name="ICBM" content="38.2526, -85.7585" />
      <meta name="geo.placename" content="Louisville, Kentucky" />
      <meta name="geo.region" content="US-KY" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <style>{`
        .skip-link { position: absolute; left: -9999px; top: auto; width: 1px; height: 1px; overflow: hidden; z-index: 9999; }
        .skip-link:focus { position: fixed; left: 1rem; top: 1rem; width: auto; height: auto; padding: 0.75rem 1rem; background: #fff; color: #000; font-weight: 700; border: 2px solid #FF5722; text-decoration: none; }
        *:focus-visible { outline: 3px solid #FF5722 !important; outline-offset: 2px !important; }
      `}</style>
    </>
  );
};
