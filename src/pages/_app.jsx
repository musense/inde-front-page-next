import { Context } from '@store/context';
import '@styles/global.css';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';

export default function MyApp({ Component, pageProps }) {

  const router = useRouter();

  useEffect(() => storePathValues, [router.asPath]);

  function storePathValues() {
    const storage = localStorage;
    if (!storage) return;

    const prevPath = storage.getItem("currentPath");
    storage.setItem("prevPath", prevPath);
    storage.setItem("currentPath", window.location.pathname);
  }
  
  return (
    <>
      <Script
        src='https://www.googletagmanager.com/gtag/js?id=G-TJ54RSE86S'
        strategy='afterInteractive'
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag('js', new Date());
      
            gtag('config', 'G-TJ54RSE86S');
        `}
      </Script>
      <Context>
        <Component {...pageProps} />
      </Context>
    </>
  );
}
