import React, { useRef, useMemo, useCallback, useState, useEffect } from 'react'
import styles from './pageTemplate.module.css'
import { useRouter } from "next/router";
import Link from 'next/link';


const PageTemplate = ({
    callback,
    currentPage,
    setCurrentPage,
    totalPages,
    maxShowNumbers = 5
}) => {
    const router = useRouter()
    const setPage = useCallback((page) => {
        setCurrentPage(page)
    }, [setCurrentPage])
    const prevPage = useCallback(() => {
        setCurrentPage(page => page - 1)
    }, [setCurrentPage])
    const nextPage = useCallback(() => {
        setCurrentPage(page => page + 1)
    }, [setCurrentPage])
    console.log("🚀 ~ file pageTemplate.jsx:16 ~ currentPage:", currentPage)
    console.log("🚀 ~ file pageTemplate.jsx:16 ~ Math.ceil(maxShowNumbers / 2):", Math.ceil(maxShowNumbers / 2))

    const showArray = useMemo(() => {
        const array = Array.from(Array(maxShowNumbers), (_, index) => index - Math.floor(maxShowNumbers / 2))
            .map(item => parseInt(item) + currentPage)
            .filter(item => item > 0 && item <= totalPages);
        return array;
    }, [maxShowNumbers, currentPage, totalPages])

    return (
        <div className={styles['page-wrapper']}>
            <div>
                <AnchorButton
                    cb={prevPage}
                    styles={currentPage === 1 ? styles.displayNone : ""}
                    label={'<'}
                />

                {totalPages - currentPage < Math.floor(maxShowNumbers / 2) && totalPages > maxShowNumbers && (
                    <p>···</p>
                )}
                {showArray && showArray
                    .map((item, index) => {
                        return <AnchorButton
                            key={index}
                            cb={() => setPage(item)}
                            styles={currentPage === parseInt(item) ? styles.active : ""}
                            label={item}
                        />
                    })}
                {currentPage < Math.ceil(maxShowNumbers / 2) && totalPages > maxShowNumbers && (
                    <p>···</p>
                )}
                <AnchorButton
                    cb={nextPage}
                    styles={currentPage === totalPages || totalPages === 0 ? styles.displayNone : ""}
                    label={'>'}
                />
            </div>
        </div>
    );
}


export default PageTemplate


function AnchorButton({ cb, styles, label, index = null }) {
    const router = useRouter()
    console.log("🚀 ~ file: pageTemplate.jsx:75 ~ AnchorButton ~ router:", router)
    if (index === null) {
        return (<Link onClick={cb}
            href={`${router.query.sitemapUrl}#category-anchor`}
            className={styles}>{label}</Link>)
    }
    return (<Link onClick={cb} key={index}
        href={`${router.query.sitemapUrl}#category-anchor`}
        className={styles}>{label}</Link>)
}