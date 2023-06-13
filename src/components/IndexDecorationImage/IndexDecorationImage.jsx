import React from "react";
import styles from "./indexDecorationImage.module.css";

//margin unit: px
//position: 'relative' || 'absolute'
function IndexDecorationImage({ imageType, marginTop, marginBottom, position = 'relative' }) {

    return (
        <div className={styles['image-wrapper']} style={position === 'relative'
            ? {
                marginTop: marginTop,
                marginBottom: marginBottom,
            } : {
                position: 'absolute',
                top: marginTop,
                bottom: marginBottom,
            }}>
            <div className={`${styles.image} ${styles[imageType]}`}></div>
        </div>
    );
}

export default IndexDecorationImage;