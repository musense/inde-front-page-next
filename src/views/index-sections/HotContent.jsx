import React from "react";
import styles from './newTitle.module.css'
import NavigateContainer from "components/NavigateContainer/NavigateContainer";

const ranking = new Map([
    [0, '1st'],
    [1, '2nd'],
    [2, '3rd'],
    [3, '4th'],
    [4, '5th'],
    [5, '6th'],
    [6, '7th'],
    [7, '8th'],
    [8, '9th'],
    [9, '10th'],
])

function HotContent({ index, content }) {

    return (
        <NavigateContainer
            key={index}
            index={index}
            contentID={content._id}
            styles={styles}
            customClassName={'hot-container'}
        >
            <div className={styles['title-mainImage']} />

            <div className={styles['title-wrapper']}>
                <div className={`${styles.title}`} key={index + 'divTitleHot'}>
                    <span className={`${styles.ranking}`}>{ranking.get(index)}</span>
                    {content.title}
                </div>
                <div
                    className={`${styles.content}`}
                    dangerouslySetInnerHTML={{ __html: content.content }} />
                <div className={styles['title-more']} />
            </div>
        </NavigateContainer>
    );
}

export default HotContent;