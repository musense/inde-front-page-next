import { Context } from '@store/context';
import '@styles/global.css';
import Script from 'next/script';

export default function MyApp({ Component, pageProps }) {

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
