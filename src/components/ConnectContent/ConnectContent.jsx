import React from "react";

import styles from './connectContent.module.css';
import NavigateContainer from "@components/NavigateContainer/NavigateContainer";
// import DateTimeStamp from "@components/Date/DateTimeStamp";
import Image from 'next/image'

function ConnectContent({ index, content, item1 = null, category }) {
    // console.log("🚀 ~ file ConnectContent.jsx:20 ~ ConnectContent ~ content:", content)

    const imgStyle = {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "50% 50%",
    }
    return (
        <NavigateContainer
            key={index}
            index={index}
            contentID={content._id}
            styles={styles}
            customClassName={"connect-container"}
            category={content.categories.name}
            sitemapUrl={content.sitemapUrl}
        >
            <div className={styles['title-mainImage']}>

                {/* <img src   = {content.homeImagePath} alt = {content.altText}
                     style = {{
                        width         : "100%",
                        height        : "100%",
                        objectFit     : "cover",
                        objectPosition: "50% 50%",
                    }} /> */}
                {content.homeImagePath !== "undefined" ?
                    <Image
                        src    = {content.homeImagePath}
                        alt    = {content.altText || content.title}
                        width  = {300}
                        height = {300}
                        style  = {imgStyle}
                    /> :
                    <img
                        // src={content.homeImagePath}
                        alt    = {content.title}
                        width  = {300}
                        height = {300}
                        style  = {imgStyle}
                    />
                }
            </div>
            <div className={styles['title-wrapper']}>
                <div
                    className={`${styles.title}`}
                    key={index + 'divTitleCon'}
                >
                    {decodeURIComponent(content.title)}
                </div>
                {/* <DateTimeStamp date={content.createdAt} /> */}

                <div className={styles['connect-btn']} />
                {/* <div
                    className={`${styles.content}`}
                    dangerouslySetInnerHTML={{ __html: content.content }}
                /> */}
                {/* <div className={styles['title-tags']}>
                    {content.tags.length !== 0 && content.tags.map((tagName, index) =>
                        <Tag key={index} tagName={tagName} />
                    )}
                </div> */}
            </div>
        </NavigateContainer>
    );
}

export default ConnectContent;


