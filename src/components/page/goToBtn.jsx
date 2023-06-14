import React from 'react'
// import { useNavigate } from "react-router-dom";
import styles from './goToBtn.module.css';
import Link from 'next/link';

export default function GoToBtn({ sitemapUrl, category, title, id, type }) {
    // console.log("🚀 ~ file: goToBtn.jsx:6 ~ GoToBtn ~ sitemapUrl:", sitemapUrl)
    // const navigate = useNavigate()

    return (id && title) && (
        <Link title={title} href={`/${sitemapUrl}`}
            className={`${styles.btn} ${type === 'prev'
                ? styles['prev-btn']
                : type === 'next'
                    ? styles['next-btn']
                    : ''}`}>{title}

        </Link>
    );
}
