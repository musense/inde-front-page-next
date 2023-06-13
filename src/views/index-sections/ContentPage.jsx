import React, { useEffect, useState, useCallback } from 'react';
import styles from './contentPage.module.css';
import IndexDecorationImage from "@components/IndexDecorationImage/IndexDecorationImage";
import ContentPageLeft from './ContentPageLeft';
import InterestedContents from '@views/index-sections/InterestedContents';

import {
  getTitleContentsByID,
  getRelatedArticles,
  getTitleContents,
} from '@assets/js/titleContents';
import { animateScroll as scroll } from "react-scroll";
import { getRenamedContent } from '../../assets/js/sitemap';


const mobileItem = {
  image: import('@assets/img/mobile/index/banner.png'),
  altText: 'The most popular games in India',
  title: 'The most popular games in India',
};
const pcItem = {
  image: import('@assets/img/index/banner.png'),
  altText: 'The most popular games in India',
  title: 'The most popular games in India',
};


function ContentPage({ category, mainContent, relatedArticles, titleContents, id, apiUrl }) {
  console.log("🚀 ~ file: ContentPage.jsx:29 ~ ContentPage ~ mainContent:", mainContent)
  console.log("🚀 ~ file: ContentPage.jsx:28 ~ ContentPage ~ relatedArticles:", relatedArticles)

  localStorage.setItem("categoryName", mainContent.categories.name);
  const clientWidth = localStorage.getItem('clientWidth');

  const [item, setItem] = useState();

  const scrollToPosition = useCallback((top = 520) => {
    if (!clientWidth) return
    if (clientWidth <= 768)
      top = top === 0 ? top : 250
    scroll.scrollTo(top, {
      duration: 100,
      delay: 0,
      smooth: false,
    });
  }, [clientWidth])
  const [_theContent_, setTheContent] = useState(null);
  const [prevInfo, setPrevInfo] = useState(null);
  const [nextInfo, setNextInfo] = useState(null);
  const [interestedContents, setInterestedContents] = useState(null);

  const findOneByIdAndReturnPrevNextID = (arr = [], serialNumber = null) => {

    if (arr.length === 0) return null
    if (serialNumber === null || typeof serialNumber !== 'number') return null;
    const mapContentInto = (content) => content && ({
      _id: content._id,
      category: content.categories.name,
      sitemapUrl: getRenamedContent(content.sitemapUrl),
      title: content.title,
    })
    //* basically, the bigger the serialNumber is, the newer the editor is
    const theIndex = arr.findIndex(a => a.serialNumber === serialNumber)
    const prevContent = theIndex === arr.length - 1 ? null : arr[theIndex + 1]
    const nextContent = theIndex === 0 ? null : arr[theIndex - 1]

    const prevInfo = prevContent ? mapContentInto(prevContent) : null
    const nextInfo = nextContent ? mapContentInto(nextContent) : null
    setPrevInfo(prevInfo)
    setNextInfo(nextInfo)
  };

  useEffect(() => {
    const payload = {
      _id: id,
      apiUrl: apiUrl,
    };
    // let theContent = null;
    // setTheContent(mainContent);
    // theContent = mainContent
    // findOneByIdAndReturnPrevNextID(titleContents, theContent.serialNumber)
    // setInterestedContents(relatedArticles)
    getTitleContentsByID(payload)
      .then(newMainContent => {
        let theContent = null;
        if (JSON.stringify(newMainContent) !== JSON.stringify(mainContent)) {
          setTheContent(newMainContent);
          theContent = newMainContent
        } else {
          setTheContent(mainContent);
          theContent = mainContent
        }
        return theContent
      })
      .then((theContent) =>
        getTitleContents(payload)
          .then(newTitleContents => {
            if (JSON.stringify(newTitleContents) !== JSON.stringify(titleContents)) {
              findOneByIdAndReturnPrevNextID(newTitleContents, theContent.serialNumber)
            } else {
              findOneByIdAndReturnPrevNextID(titleContents, theContent.serialNumber)
            }
          })
      )
    getRelatedArticles(payload)
      .then(newRelatedArticles => {
        if (JSON.stringify(newRelatedArticles) !== JSON.stringify(relatedArticles)) {
          setInterestedContents(newRelatedArticles)
        } else {
          setInterestedContents(relatedArticles)
        }
      });

  }, [id, apiUrl]);

  useEffect(() => {
    if (localStorage.getItem('last-page-pathname') && localStorage.getItem('last-page-pathname').indexOf('/p/') !== -1) {
      scrollToPosition()
    } else {
      scrollToPosition(0)
    }
    let bannerImport
    if (clientWidth <= 768) {
      bannerImport = mobileItem.image
      bannerImport.then(res => setItem({
        src: res.default.src,
        altText: mobileItem.altText,
        title: mobileItem.title,
      }))
    } else {
      bannerImport = pcItem.image
      bannerImport.then(res => setItem({
        src: res.default.src,
        altText: pcItem.altText,
        title: pcItem.title,
      }))
    }
  }, [scrollToPosition, clientWidth]);

  return (
    <>
      {item && (
        <div className={`section ${styles.section}`}>
          <a href={'https://zoobet168.com/'} target="_blank" rel="noopener noreferrer" />
          <img src={item.src} alt={item.altText} title={item.title} width={'100%'} />
        </div>)
      }


      <ContentPageLeft
        content={_theContent_}
        prevInfo={prevInfo}
        nextInfo={nextInfo}
        category={category}
      />

      <div className={styles['contentPage-decoration-image-wrapper-pc']}>
        <IndexDecorationImage
          marginTop={66}
          marginBottom={52}
          imageType={'line'} />
      </div>

      <InterestedContents
        interestedContents={interestedContents} />

      <div className={styles['contentPage-decoration-image-wrapper-mobile']}>
        <IndexDecorationImage
          marginTop={'2rem'}
          marginBottom={'2rem'}
          imageType={'line'} />
      </div>
    </>
  );
}

export default ContentPage;




