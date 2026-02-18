export const Head = () => {
  const siteUrl = 'https://www.114barwhiskeyrow.com/';
  const businessName = 'One Fourteen';
  const businessDescription = 'One Fourteen is a late night bar on Whiskey Row in downtown Louisville. Open Tue–Sun until 2am. Walk-ins only. DJs and game day sound on.';
  const address = '114 W Main St, Louisville, KY 40202';
  const phone = '+1-502-555-0114';
  
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'BarOrPub',
    'name': businessName,
    'description': businessDescription,
    'url': siteUrl,
    'telephone': phone,
    'servesCuisine': 'Bar',
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
    'priceRange': '$$'
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': businessName,
    'url': siteUrl,
    'logo': 'https://static.wixstatic.com/media/528274_112a88f0f95c4632b6449db5f7575a0b~mv2.png',
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
      {/* Early Connection Hints for Wix Services - Performance Optimization */}
      <link rel="preconnect" href="https://wixapis.com" />
      <link rel="preconnect" href="https://edge.wixapis.com" />
      <link rel="preconnect" href="https://static.parastorage.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      
      {/* Defer Google Analytics - Load after first paint */}
      <script defer src="https://www.googletagmanager.com/gtag/js?id=G-JMM17LNJXM"></script>
      <script defer dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || [];\
function gtag(){dataLayer.push(arguments);}\
gtag('js', new Date());\
gtag('config', 'G-JMM17LNJXM');`
      }} />
      {/* End Google Analytics */}
      
      {/* Defer Google Tag Manager - Load after first paint */}
      <script defer dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.defer=true;j.src=\
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\
})(window,document,'script','dataLayer','GTM-WMRZT82N');`
      }} />
      {/* End Google Tag Manager */}
      
      {/* Core Meta Tags */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#222222" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* SEO Meta Tags */}
      <title>Bars in Louisville, KY | One Fourteen on Whiskey Row</title>
      <meta name="description" content="One Fourteen is a late night bar on Whiskey Row in downtown Louisville. Open Tue–Sun until 2am. Walk-ins only. DJs and game day sound on." />
      <meta name="keywords" content="bar, Louisville, Whiskey Row, late night bar, downtown Louisville, nightlife, walk-ins" />
      <meta name="author" content="One Fourteen" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href={siteUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content="business.business" />
      <meta property="og:title" content="Bars in Louisville, KY | One Fourteen on Whiskey Row" />
      <meta property="og:description" content={businessDescription} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content={businessName} />
      <meta property="og:image" content="https://static.wixstatic.com/media/528274_112a88f0f95c4632b6449db5f7575a0b~mv2.png" />
      <meta property="og:image:width" content="1024" />
      <meta property="og:image:height" content="1024" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Bars in Louisville, KY | One Fourteen on Whiskey Row" />
      <meta name="twitter:description" content={businessDescription} />
      <meta name="twitter:image" content="https://static.wixstatic.com/media/528274_112a88f0f95c4632b6449db5f7575a0b~mv2.png" />
      
      {/* Local Business Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      
      {/* Organization Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      
      {/* Fonts */}
      <link rel="preconnect" href="https://static.parastorage.com" />
    </>
  );
};
