import React, { useEffect, useState, useCallback } from 'react';
import styles from './contentPage.module.css';
import IndexDecorationImage from "@components/IndexDecorationImage/IndexDecorationImage";
import ContentPageLeft from '@components/ContentPageLeft/ContentPageLeft';
import InterestedContents from '@components/InterestedContents/InterestedContents';
import Image from 'next/image'
import { animateScroll as scroll } from "react-scroll";
import { useAppContext } from '@store/context';
import useInitial from "@hook/useInitial";

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


function ContentPage({
  category,
  mainContent,
  relatedArticles,
  previousAndNextPage
}) {
  console.log("🚀 ~ file: ContentPage.jsx:31 ~ ContentPage ~ previousAndNextPage:", previousAndNextPage)
  const { previousEditor, nextEditor } = previousAndNextPage;
  const { state, dispatch } = useAppContext();
  useInitial({
    state,
    dispatch,
    category
  });

  console.log("🚀 ~ file: ContentPage.jsx:28 ~ ContentPage ~ mainContent:", mainContent)
  console.log("🚀 ~ file: ContentPage.jsx:28 ~ ContentPage ~ relatedArticles:", relatedArticles)

  const clientWidth = state.clientWidth
  const [item, setItem] = useState();

  const scrollToPosition = useCallback((top = 520) => {
    if (!clientWidth) return
    if (clientWidth <= 768)
      top = top === 0 ? top : 250
    scroll.scrollTo(top, {
      duration: 0,
      delay: 0,
      smooth: false,
    });
  }, [clientWidth])
  const [_theContent_, setTheContent] = useState(null);
  const [interestedContents, setInterestedContents] = useState(null);

  useEffect(() => {
    const filteredRelatedArticles = relatedArticles.filter(article => article.hidden === false
      && article.categories.name.toLowerCase() !== 'uncategorized')
    setTheContent(mainContent);
    setInterestedContents(filteredRelatedArticles)
  }, [mainContent, relatedArticles]);

  useEffect(() => {
    // console.log("🚀 ~ file: ContentPage.jsx:92 ~ useEffect ~ state.lastPathname:", state.lastPathname)
    if (state.lastPathname && state.lastPathname.indexOf('/p_') !== -1) {
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
  }, [state, clientWidth, scrollToPosition]);

  return (
    <>
      {item && (
        <div className={`section ${styles.section}`}>
          <a href={'https://zoobet168.com/'} target="_blank" rel="noopener noreferrer" />
          {/* <img src={item.src} alt={item.altText} title={item.title} width={'100%'} /> */}
          <Image
            src={item.src}
            alt={item.altText}
            title={item.title}
            width={1920}
            height={300}
          />
        </div>)
      }


      <ContentPageLeft
        content={_theContent_}
        prevInfo={previousEditor}
        nextInfo={nextEditor}
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




