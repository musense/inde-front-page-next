import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import styles from './commonPage.module.css';
import IndexDecorationImage from "@components/IndexDecorationImage/IndexDecorationImage";
import ConnectContent from '@components/ConnectContent/ConnectContent';

import PageTemplate from "@components/page/pageTemplate";
import DecoBackground from "@components/DecoBackground/DecoBackground";
import Banner from '@components/Banner/Banner';
import { animateScroll as scroll } from "react-scroll";

import {
    MainContext,
    // MainDispatchContext
} from "@store/context";

function CommonPage({ paramName, commonPageItems }) {

    // const state = useContext(MainContext);

    console.log("🚀 ~ file: commonPage.jsx:19 ~ CommonPage ~ paramName:", paramName)
    console.log("🚀 ~ file: commonPage.jsx:19 ~ CommonPage ~ commonPageItems:", commonPageItems)


    const [currentPage, setCurrentPage] = useState(1);
    const [clientWidth, setClientWidth] = useState();

    const Background = useCallback(({ showOn }) => {

        if (!clientWidth) return
        // mobile using
        if (clientWidth <= 768) {
            switch (showOn) {
                case "mobile": {
                    return (<DecoBackground
                        repeat={'repeat'}
                        position={'fixed'}
                        offset={'0.2rem'}
                    />)
                }
                case "desktop": {
                    return (<></>)
                }
            }
        } else {
            // desktop using
            switch (showOn) {
                case "mobile": {
                    return (<></>)
                }
                case "desktop": {
                    return (<DecoBackground
                        repeat={'repeat'}
                        position={'absolute'}
                    />)
                }
            }
        }

    }, [clientWidth])

    const scrollToTop = useCallback(() => {
        scroll.scrollTo(0, {
            duration: 500,
            delay: 0,
            smooth: "easeInOutQuart",
        });
    }, [])

    const scrollToPosition = useCallback((top = 250) => {
        console.log("🚀 ~ file: commonPage.jsx:71 ~ scrollToPosition ~ top:", top)
        if (!clientWidth) return
        if (clientWidth <= 768)
            top = 80
        scroll.scrollTo(top, {
            duration: 100,
            delay: 0,
            smooth: false,
            // smooth: "easeInOutQuart",
        });
    }, [clientWidth])

    const bannerRef = useRef()

    console.log("🚀 ~ file: commonPage.jsx:74 ~ CommonPage ~ currentPage:", currentPage)
    const [__ALL_CONTENT__, setAllContent] = useState(null);
    // const [viewContents, setViewContents] = useState(null);
    const [totalPages, setTotalPages] = useState(1);



    useEffect(() => {
        const width = window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
        setClientWidth(width);
        setCurrentPage(parseInt(localStorage.getItem('currentPage')) || 1)
        localStorage.setItem("categoryName", paramName);
        if (commonPageItems === null) return
        let showData = []

        showData = [...commonPageItems.filter(content => content.hidden === false)]
        setAllContent(showData);
        setTotalPages(Math.ceil(showData.length / 6));

    }, [commonPageItems, paramName]);

    useEffect(() => {
        if (!paramName) return

        if (paramName.indexOf("#") === -1) {
            scrollToTop()
        } else {
            scrollToPosition()
        }
    }, [paramName, scrollToPosition, scrollToTop, clientWidth]);

    const viewContents = useMemo(() => {
        if (__ALL_CONTENT__) {
            console.log("🚀 ~ file: commonPage.jsx:97 ~ viewContents ~ __ALL_CONTENT__:", __ALL_CONTENT__)
            console.log("🚀 ~ file: commonPage.jsx:97 ~ viewContents ~ currentPage:", currentPage)
            const start = 0 + (currentPage - 1) * 6,
                end = currentPage * 6;
            const viewContents = __ALL_CONTENT__
                .slice(start, end)
            return viewContents
        }
        return []
    }, [__ALL_CONTENT__, currentPage])
    console.log("🚀 ~ file: commonPage.jsx:169 ~ viewContents ~ viewContents:", viewContents)

    const Page = useCallback(() => {
        if (clientWidth <= 768) {
            return <PageTemplate
                callback={scrollToPosition}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                maxShowNumbers={3}
            />
        } else {
            return <PageTemplate
                callback={scrollToPosition}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                maxShowNumbers={5}
            />
        }
    }, [clientWidth, totalPages, currentPage, setCurrentPage, scrollToPosition])
    return (
        <>

            <Banner ref={bannerRef} category={paramName} />
            <div id="categoryName" className={`${styles['category-name']} title`}>
                {paramName}
            </div>

            <div id="category-anchor" />
            <div className={styles['category-decoration-image-wrapper']}>
                <IndexDecorationImage
                    marginTop={44}
                    marginBottom={96}
                    imageType={'line'} />
                <IndexDecorationImage
                    marginTop={'2rem'}
                    marginBottom={'2rem'}
                    imageType={'line'} />
            </div>
            <Background showOn={'mobile'} />
            {viewContents && viewContents.length !== 0 ? (<div className={`${styles['main-content']}`}>
                <Background showOn={'desktop'} />
                {viewContents.map((content, index) =>
                    <ConnectContent key={index} index={index} content={content} />
                )}
                <Page />
            </div>
            ) : (
                <h3 style={{
                    color: 'grey',
                    width: '100%',
                    textAlign: 'center',
                }}>{`There's no articles`}</h3>
            )}
            <div className={styles['category-decoration-image-wrapper']}>
                <IndexDecorationImage
                    marginTop={73}
                    marginBottom={83}
                    imageType={'line'} />
                <IndexDecorationImage
                    marginTop={'2rem'}
                    marginBottom={'2rem'}
                    imageType={'line'}
                />
            </div>

        </>
    );
}

export default CommonPage;