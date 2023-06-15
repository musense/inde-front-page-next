import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { NavItem } from "reactstrap";
import styles from './navButton.module.css'
import Link from "next/link";
import { useRouter } from "next/router";

import { useAppContext } from '@store/context';


export default function NavButton({ category, unCheck = null }) {
    const { state } = useAppContext();
    const router = useRouter();
    const { sitemapUrl, name: categoryName } = category;
    const capitalizedCategoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    const clickHandler = useCallback(() => {
        router.push(`/${sitemapUrl}`)
        unCheck && unCheck()
    }, [router, sitemapUrl, unCheck])

    return (
        <NavItem>
            <div
                // href      = {`/${sitemapUrl}`}
                onClick={() => clickHandler()}
                className={`${styles['navButton']} ${state.categoryName === categoryName ? styles['active'] : ''}`}>
                {capitalizedCategoryName}
            </div>
        </NavItem >
    )
}
