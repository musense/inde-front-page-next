import React from 'react'
import styles from './indexViewBlock.module.css';
// import { Link } from 'react-router-dom';

export default function IndexViewBlock({ viewBlock, reverse = false }) {
console.log("🚀 ~ file: IndexViewBlock.jsx:6 ~ IndexViewBlock ~ viewBlock:", viewBlock)


    // title={item.title}
    // image={item.image}
    // altText={item.altText}
    // article={item.article}
    const category = viewBlock.title.toLowerCase()
    return <div style={reverse ? { flexDirection: 'row-reverse' } : { flexDirection: 'row' }}
        className={`${styles['index-paragraph-wrapper']} ${reverse ? styles['reverse'] : ''}`}>
        <div className={styles['index-type-image']}>
            <img src={viewBlock.image.src} alt={viewBlock.altText} />
        </div>
        <div className={styles['index-type-container']}>
            <div className={`${styles['index-type-title']} title`}>
                {viewBlock.title}
            </div>
            <div className={styles['index-type-article']}>
                {viewBlock.article}
            </div>
            <a href={`/${viewBlock.sitemapUrl}`} className={styles['index-more-btn']} />
        </div>
    </div>;
}
