import React from 'react'
import styles from "./goToContentPage.module.css";
import GoToBtn from "./goToBtn"

export default function GoToContentPage({
    prevInfo,
    nextInfo
}) {
    return <div className={styles['content-btn']}>
        {prevInfo && <GoToBtn sitemapUrl={prevInfo.sitemapUrl} title={prevInfo.title} id={prevInfo._id} type='prev' />}
        {nextInfo && <GoToBtn sitemapUrl={nextInfo.sitemapUrl} title={nextInfo.title} id={nextInfo._id} type='next' />}
    </div>;
}

