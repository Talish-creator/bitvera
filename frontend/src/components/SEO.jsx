import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SEO = ({ titleKey, descriptionKey, path = '' }) => {
  const { t, i18n } = useTranslation();
  
  const siteName = 'BitVera IT Solutions';
  const title = titleKey ? `${t(titleKey)} | ${siteName}` : siteName;
  const description = descriptionKey ? t(descriptionKey) : t('footer.brand_desc');
  
  const domain = 'https://bitvera.com'; // Change to actual production domain
  const canonicalUrl = `${domain}${path}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <html lang={i18n.language} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} />

      {/* Localized SEO - hreflang tags */}
      <link rel="alternate" hreflang="en" href={`${domain}${path}`} />
      <link rel="alternate" hreflang="ar" href={`${domain}${path}?lang=ar`} />
      <link rel="alternate" hreflang="x-default" href={`${domain}${path}`} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;
