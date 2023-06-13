import React, { useCallback } from "react";
import Tag from "@components/Tag/Tag";
// import { Link } from "react-router-dom";
import GoToContentPage from "@components/page/goToContentPage";
import styles from './contentPageLeft.module.css'
import DecoBackground from "@components/DecoBackground/DecoBackground";
import IndexDecorationImage from "@components/IndexDecorationImage/IndexDecorationImage";
import DateTimeStamp from "@components/Date/DateTimeStamp";


function ContentPageLeft({
  content,
  prevInfo,
  nextInfo }) {
  // console.log("🚀 ~ file: ContentPageLeft.jsx:15 ~ nextInfo:", nextInfo)
  console.log("🚀 ~ file: ContentPageLeft.jsx:85 ~ content:", content)
  const clientWidth = localStorage.getItem("clientWidth");

  const Background = useCallback(() => {
    if (clientWidth <= 768) {
      return <DecoBackground
        repeat={'repeat'}
        position={'fixed'}
        offset={'0.2rem'}
      />
    } else {
      return (<DecoBackground
        repeat={'repeat'}
        position={'absolute'}
        offset={'-375px'}

      />)
    }
  }, [clientWidth])

  console.log("🚀 ~ file: ContentPageLeft.jsx:36 ~ useEffect ~ clientWidth:", clientWidth)

  return content && (
    <div className={styles['content-page']}>

      <Background />
      <div className={styles['left-content']}>


        <div className={styles['title-view']}>
          <a id='contentPage-return-button' className={styles['main-title-decoration']}
            href={`/${content.categories.sitemapUrl}`}>Return</a>
          <div className={styles['contentPageLeft-decoration-image-wrapper']}>
            <IndexDecorationImage
              marginTop={'2rem'}
              marginBottom={'2rem'}
              imageType={'line'} />
          </div>
          <h1 className={`${styles['main-title']} title`}>{content.title}</h1>
          <DateTimeStamp date={content.createdAt} />
        </div>
        <div className={styles['main-content']}>
          <div>
            <div>
              <div
                className={styles['title-main-content']}
                dangerouslySetInnerHTML={{ __html: content.htmlContent }}
              />
              <a className={styles['play-now']}
                href="https://www.zoobetin.com/?al=00034"
                target="_blank"
                rel="noopener noreferrer"
              />
            </div>
            {(prevInfo || nextInfo) && <GoToContentPage
              prevInfo={prevInfo}
              nextInfo={nextInfo}
            />}
          </div>

          <div className={styles['content-side']}>
            <a href={'https://zoobet168.com/'} target="_blank" rel="noopener noreferrer" >
              <div className={styles['content-advertise']} />
            </a>
            <div className={styles['content-tags']}>
              <div>Tag</div>
              <div>
                {content.tags.length > 0 && content.tags.map((tag, index) =>
                  <Tag key={index} tag={tag} />
                )}

              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ContentPageLeft;

