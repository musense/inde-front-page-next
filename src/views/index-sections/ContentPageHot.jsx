import React from "react";
import styles from "./contentPage.module.css";
import NavigateContainer from "components/NavigateContainer/NavigateContainer";



function ContentPageHot({ contents }) {
    return (contents.map((content, index) => {
        if (index >= 5) return;

        return (
            <NavigateContainer
                key={index}
                index={index}
                contentID={content._id}>
                <div className={styles['title-mainImage']} />
                <div
                    className={`${styles.title}`}
                    key={index + 'divTitleHot'}
                >
                    {content.title}
                </div>
            </NavigateContainer>
        );
    }));
}

export default ContentPageHot;