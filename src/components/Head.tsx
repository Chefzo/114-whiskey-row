export const Head = () => {
  const siteUrl = 'https://onefourteenbar.com';
  const businessName = 'One Fourteen Bar';
  const businessDescription = 'A modern dive bar on Whiskey Row in downtown Louisville. Loud music, strong drinks, and late nights. No reservations. Just show up.';
  const address = '114 W Main St, Louisville, KY 40202';
  const phone = '+1-502-555-0114';
  
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'Bar',
    'name': businessName,
    'description': businessDescription,
    'url': siteUrl,
    'telephone': phone,
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
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': 'Monday',
        'opens': '00:00',
        'closes': '00:00'
      }
    ],
    'priceRange': '$$',
    'servesCuisine': 'Bar Food',
    'sameAs': [
      'https://www.instagram.com/onefourteenwhiskeyrow/',
      'https://facebook.com'
    ]
  };

  return (
    <>
      {/* Google Analytics */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-JMM17LNJXM"></script>
      <script dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-JMM17LNJXM');`
      }} />
      {/* End Google Analytics */}
      
      {/* Google Tag Manager */}
      <script dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\nnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\nj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n})(window,document,'script','dataLayer','GTM-WMRZT82N');`
      }} />
      {/* End Google Tag Manager */}
      
      {/* Core Meta Tags */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#222222" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* SEO Meta Tags */}
      <title>One Fourteen Bar | Downtown Louisville Bar on Whiskey Row</title>
      <meta name="description" content="A modern dive bar on Whiskey Row in downtown Louisville. Loud music, strong drinks, and late nights. No reservations. Just show up." />
      <meta name="keywords" content="bar, Louisville, Whiskey Row, dive bar, downtown Louisville, live music, cocktails, nightlife" />
      <meta name="author" content="One Fourteen Bar" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href={siteUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content="business.business" />
      <meta property="og:title" content="One Fourteen Bar | Downtown Louisville Bar on Whiskey Row" />
      <meta property="og:description" content={businessDescription} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content={businessName} />
      <meta property="og:image" content="https://static.wixstatic.com/media/528274_112a88f0f95c4632b6449db5f7575a0b~mv2.png" />
      <meta property="og:image:width" content="1024" />
      <meta property="og:image:height" content="1024" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="One Fourteen Bar | Downtown Louisville Bar on Whiskey Row" />
      <meta name="twitter:description" content={businessDescription} />
      <meta name="twitter:image" content="https://static.wixstatic.com/media/528274_112a88f0f95c4632b6449db5f7575a0b~mv2.png" />
      
      {/* Local Business Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      
      {/* Fonts */}
      <link rel="preconnect" href="https://static.parastorage.com" />
    </>
  );
};
