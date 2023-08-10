import React from 'react'
// import { useNavigate } from "react-router-dom";
import styles from './goToBtn.module.css';
import Link from 'next/link';

export default function GoToBtn({ sitemapUrl, title, id, type }) {
    // console.log("🚀 ~ file: goToBtn.jsx:6 ~ GoToBtn ~ sitemapUrl:", sitemapUrl)
    // const navigate = useNavigate()
    const className = `${styles.btn} ${type === 'prev'
        ? styles['prev-btn']
        : type === 'next'
            ? styles['next-btn']
            : ''}`

    return (id && title) && (
        <Link title={title} href={`${sitemapUrl}`}
            className={className}>{title}
        </Link>
    );
}
