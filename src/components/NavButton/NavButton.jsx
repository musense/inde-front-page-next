import React, { useEffect, useMemo, useState } from 'react'
import { NavItem } from "reactstrap";
import styles from './navButton.module.css'
import Link from "next/link";
import { useRouter } from 'next/router';

import { useAppContext } from '@store/context';


export default function NavButton({
    category }) {
    const { state, dispatch } = useAppContext();
    const {
        sitemapUrl,
        name: categoryName
    } = category;
    const router = useRouter()
    const asPath = router.asPath;
    console.log("🚀 ~ file: NavButton.jsx:19 ~ state:", state)
    const capitalizedCategoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    console.log("🚀 ~ file: NavButton.jsx:8 ~ categoryName:", categoryName)
    console.log("🚀 ~ file: NavButton.jsx:8 ~ capitalizedCategoryName:", capitalizedCategoryName)
    const [selectedCategoryName, setSelectedCategoryName] = useState(null);
    useEffect(() => {

        const categoryName = state.categoryName;
        console.log("🚀 ~ file: NavButton.jsx:8 ~~~~~~ useEffect ~~~~~~ categoryName:", categoryName)
        setSelectedCategoryName(categoryName)
    }, [state.categoryName]);


    return (
        <NavItem>
            <Link href={`/${sitemapUrl}`}
                className={`${styles['navButton']} ${selectedCategoryName === categoryName ? styles['active'] : ''}`}>
                {capitalizedCategoryName}
            </Link>
        </NavItem >
    )
}
