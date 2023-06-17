import React from "react";
import styles from "@components/ContentPage/contentPage.module.css";
import NavigateContainer from "@components/NavigateContainer/NavigateContainer";
import Image from 'next/image'

function ContentPageConnect({ contents }) {

    return (contents.map((content, index) => {
        // console.log("🚀 ~ file ContentPageConnect.jsx:8 ~ return ~ content:", content)

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
                customClassName={"connect-flex-box"}
                category={content.categories.name}
                sitemapUrl={content.sitemapUrl}
            >

                <div className={styles['connect-image']}>
                    {content.homeImagePath !== "undefined"
                        ? <Image
                            src={content.homeImagePath}
                            alt={content.altText}
                            width={300}
                            height={300}
                            style={imgStyle}
                        />
                        : <img
                            alt={'Zoonobet'}
                            width={300}
                            height={300}
                            style={imgStyle}
                        />}
                </div>
                <div className={styles['connect-title']}>
                    {content.title}
                </div>
            </NavigateContainer>
        );
    }));
}

export default ContentPageConnect;