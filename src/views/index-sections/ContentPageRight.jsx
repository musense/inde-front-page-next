import React from "react";
import TitleImage from "./TitleImage";
import styles from "./contentPageRight.module.css";
import Tag from "@components/Tag/Tag";

function ContentPageRight({ tags }) {

  return (<div className={styles['right-content']}>
    <div className={styles['trend-tags']}>
      <TitleImage
        type='trend'
        showLogo={false}
        title={'トレンド'}
      />
      <div className={styles['trend-tags-flex-site']}>
        {/* {tags
          ? tags.map((tag, index) => (
            <Tag key={index} tagName={tag.name} />
          ))
          : null} */}
      </div>
    </div>
  </div>);
}

export default ContentPageRight;