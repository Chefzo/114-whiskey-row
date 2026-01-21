export const Head = () => {
  return (
    <>
      {/* Google Analytics */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-JMM17LNJXM"></script>
      <script dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-JMM17LNJXM');`
      }} />
      {/* End Google Analytics */}
      
      {/* Google Tag Manager */}
      <script dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WMRZT82N');`
      }} />
      {/* End Google Tag Manager */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>One Fourteen Bar | Downtown Louisville Bar on Whiskey Row</title>
      <meta name="description" content="A modern dive bar on Whiskey Row in downtown Louisville. Loud music, strong drinks, and late nights. No reservations. Just show up." />
      {/* Fonts */}
      <link rel="preconnect" href="https://static.parastorage.com" />
    </>
  );
};
