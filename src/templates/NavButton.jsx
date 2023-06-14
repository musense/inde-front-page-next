import React, { useEffect, useMemo, useState } from 'react'
import { NavItem } from "reactstrap";
import styles from './navButton.module.css'
import Link from "next/link";


export default function NavButton({
    category }) {
    const {
        sitemapUrl,
        name: categoryName
    } = category;
    const capitalizedCategoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    console.log("🚀 ~ file: NavButton.jsx:8 ~ categoryName:", categoryName)
    console.log("🚀 ~ file: NavButton.jsx:8 ~ capitalizedCategoryName:", capitalizedCategoryName)
    const [selectedCategoryName, setSelectedCategoryName] = useState(null);

    useEffect(() => {
        const categoryName = localStorage.getItem('categoryName')
        console.log("🚀 ~ file: NavButton.jsx:8 ~~~~~~ useEffect ~~~~~~ categoryName:", categoryName)
        setSelectedCategoryName(categoryName)
    }, []);


    return (
        <NavItem>
            <Link href={`/${sitemapUrl}`} target="_self"
                className={`${styles['navButton']} ${selectedCategoryName === categoryName ? styles['active'] : ''}`}>
                {capitalizedCategoryName}
            </Link>
        </NavItem >
    )
}
