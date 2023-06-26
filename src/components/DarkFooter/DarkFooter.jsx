'use client'
/*eslint-disable*/
import React, { useEffect, useState } from "react";

import styles from "./darkFooter.module.css";
import IndexDecorationImage from "@components/IndexDecorationImage/IndexDecorationImage";
import { useAppContext } from '@store/context';

function Footer() {
  const { state } = useAppContext();
  // console.log("🚀 ~ file: DarkFooter.jsx:10 ~ DarkFooter ~ pathname:", pathname)

  const footerClassName = (pathname) => {
    let footerClassName
    if (!pathname) {
      footerClassName = "index"
    }
    else if (pathname === "/") {
      footerClassName = "index"
    }
    else if (pathname.startsWith('/tag_')) {
      footerClassName = "category"
    }
    else if (pathname.startsWith('/p_')) {
      footerClassName = "category"
    }
    else {
      footerClassName = "not-index"
    }
    return footerClassName
  }
  const copyrightClassName = (pathname) => {
    let copyrightClassName;
    if (!pathname) {
      copyrightClassName = "index"
    }
    else if (pathname === "/") {
      copyrightClassName = "index"
    }
    else if (pathname.startsWith('/p/')) {
      copyrightClassName = "not-index"
    }
    else {
      copyrightClassName = "not-index"
    }
    return copyrightClassName
  }

  const [footerClass, setFooterClass] = useState(null);
  const [copyrightClass, setCopyrightClass] = useState(null);
  useEffect(() => {
    if (!state && !state.pathname) return
    const pathname = state.pathname;
    console.log("🚀 ~ file: DarkFooter.jsx:27 ~ DarkFooter ~ pathname:", pathname)
    setFooterClass(footerClassName(pathname))
    setCopyrightClass(copyrightClassName(pathname))
  }, [state.pathname]);


  console.log("🚀 ~ file: DarkFooter.jsx:27 ~ footerClassName ~ footerClass:", footerClass)
  console.log("🚀 ~ file: DarkFooter.jsx:27 ~ copyrightClassName ~ copyrightClass:", copyrightClass)
  return (
    <>
      <IndexFooter footerClass={footerClass} />
      <CustomFooter footerClass={footerClass} />
      <CopyrightFooter copyrightClass={copyrightClass} />
    </>
  );
}

export default Footer;

function IndexFooter({ footerClass }) {
  return footerClass === 'index' && (
    <div className={styles['index-footer']}>
      <IndexDecorationImage
        imageType='thin-line'
        marginTop={'-5rem'}
        marginBottom={'unset'} />
      <div className={`${styles['footer-header']} title`} style={{ color: `var(--theme-gold)` }}>
        About Zoonobet
      </div>
      <div className={styles['footer-article']} style={{ color: `var(--theme-color)` }}>
        Zoonobet is a website that specializes in providing various gambling game information,
        allowing you to get the latest game news at any time. We carefully select the best and most popular games, including slot machines, table games, lottery, sports betting, and more. We also provide in-depth analysis and gameplay tips for each game!
      </div>
    </div>);
}

function CustomFooter({ footerClass }) {
  return <footer id="footer" className={`${styles['custom-footer']} ${styles[footerClass]}`}>
    <div style={footerClass === 'index'
      ? { color: `var(--theme-red)` }
      : { color: `var(--theme-gold)` }} className={`${styles['footer-header']} title`}>
      Our Partner
    </div>
    <div className={styles['footer-body']}>
      <div className={styles['footer-img']} />
      <div style={footerClass === 'index'
        ? { color: `var(--theme-red)` }
        : { color: `var(--theme-color)` }} className={styles['footer-article']}>
        About Zoobet<br />
        Zoobet is the largest and fastest-growing online casino game platform in India, offering various online games such as lottery, slot machines, sports, and poker, hoping to bring players the richest gaming experience. Zoobet creates a good game ecosystem, providing diverse activities, bonus rewards, and VIP gifts. Currently, it has over 500,000 members and is one of the most popular online casinos in India.
      </div>
    </div>

    <div className={styles['footer-decoration-image-wrapper']}>
      <IndexDecorationImage
        imageType={'thin-line'}
        marginTop={49}
        marginBottom={15} />
      <IndexDecorationImage
        position={`${footerClass === 'index' ? 'relative' : 'absolute'}`}
        imageType={`${footerClass === 'index' ? 'thin-line' : 'line'}`}
        marginTop={`${footerClass === 'index' ? 49 : 'unset'}`}
        marginBottom={`${footerClass === 'index' ? 15 : '-3rem'}`} />
    </div>

  </footer>;
}

function CopyrightFooter({ copyrightClass }) {
  return <div className={`${styles.copyright} ${styles[copyrightClass]}`}>
    ©2023 Zoonobet All rights reserved
  </div>;
}





