import React from "react";
import styles from "./tag.module.css";
import Link from "next/link";
// import { Link } from "react-router-dom";

function Tag({ tag }) {
    // console.log("🚀 ~ file Tag.js:6 ~ Tag ~ tag", tag)
    return (<Link
        href={`/${tag.sitemapUrl}`}
        className={styles['trend-tags-flex-tags']}
    >
        #&nbsp;&nbsp;{tag.name}
    </Link>);
}

export default Tag;