import React, { useEffect, useState } from 'react'
import { NavItem } from "reactstrap";
import styles from './navButton.module.css'


export default function NavButton({
    category }) {
    const {
        sitemapUrl,
        name: categoryName
    } = category;
    const capitalizedCategoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    console.log("🚀 ~ file: NavButton.jsx:8 ~ capitalizedCategoryName:", capitalizedCategoryName)
    const [selectedCategoryName, setSelectedCategoryName] = useState(null);

    useEffect(() => {
        setSelectedCategoryName(localStorage.getItem('categoryName'))
    }, []);

    return (
        <NavItem>
            <a href={`/${sitemapUrl}`} target="_self"
                className={`${styles['navButton']} ${selectedCategoryName === categoryName ? styles['active'] : ''}`}>
                {capitalizedCategoryName}
            </a>
        </NavItem >
    )
}
