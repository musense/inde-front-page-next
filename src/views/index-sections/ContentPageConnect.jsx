import React from "react";
import styles from "./contentPage.module.css";
import NavigateContainer from "@components/NavigateContainer/NavigateContainer";

function ContentPageConnect({ contents}) {

    return (contents.map((content, index) => {
        console.log("🚀 ~ file ContentPageConnect.jsx:8 ~ return ~ content:", content)

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

                    <img width='100%' height='100%' src={content.homeImagePath} alt={content.altText} />
                </div>
                <div className={styles['connect-title']}>
                    {content.title}
                </div>
            </NavigateContainer>
        );
    }));
}

export default ContentPageConnect;