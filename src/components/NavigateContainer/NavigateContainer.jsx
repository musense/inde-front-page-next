import React from "react";
import mainStyles from './navigateContainer.module.css'
import Link from "next/link";
import { useRouter } from "next/router";

function NavigateContainer({
    category,
    sitemapUrl,
    contentID: id,
    children,
    index,
    styles,
    customClassName = "title-container" }) {
    // console.log("🚀 ~ file: NavigateContainer.jsx:13 ~ sitemapUrl:", sitemapUrl)
    // console.log("🚀 ~ file: NavigateContainer.jsx:12 ~ id:", id)
    const router = useRouter();
    if (styles === null || styles === '' || styles === undefined) {
        styles = mainStyles
    }

    return (<div
        onClick={() => router.push(`/${sitemapUrl}`)}
        style={{
            cursor: "pointer",
        }}
        className={styles[customClassName]}>
        {children}
    </div>);
}

export default NavigateContainer;