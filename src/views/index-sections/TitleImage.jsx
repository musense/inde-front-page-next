import React from "react";

import styles from './titleImage.module.css'
function TitleImage({ type, title, showLogo }) {

    const showLogoStatus = showLogo === false ? styles.hideLogo : styles.showLogo;

    return (
        <div className={`${styles['title-wrapper']} ${styles[type]}`}>
            <div className={`${styles['title-logo']} ${showLogoStatus}`}></div>
            <div className={`${styles['title-image']}`}></div>
        </div>
    );
}

export default TitleImage;