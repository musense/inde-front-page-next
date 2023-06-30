import React, {  } from 'react'
import styles from "./goToContentPage.module.css";
import GoToBtn from "./goToBtn"

export default function GoToContentPage({
    prevInfo,
    nextInfo
}) {
    // console.log("🚀 ~ file: goToContentPage.jsx:9 ~ prevInfo:", prevInfo)
   
    return <div className={styles['content-btn']}>
        {prevInfo && <GoToBtn sitemapUrl={prevInfo.sitemapUrl} category={prevInfo.category} title={prevInfo.title} id={prevInfo._id} type='prev' />}
        {nextInfo && <GoToBtn sitemapUrl={nextInfo.sitemapUrl} category={nextInfo.category} title={nextInfo.title} id={nextInfo._id} type='next' />}
    </div>;
}

