import React, { useEffect, useMemo, useState } from 'react';
import Carousel from '@components/Carousel/Carousel';

import IndexViewBlock from '@components/IndexViewBlock/IndexViewBlock';
import styles from './indexView.module.css';
import IndexDecorationImage from '@components/IndexDecorationImage/IndexDecorationImage';
import { animateScroll as scroll } from 'react-scroll';
import { getCategoryList } from '@assets/js/categoryContents';
import { useAppContext } from '@store/context';

import Lottery from '@assets/img/index/image_1.png';
import Sports from '@assets/img/index/image_2.png';
import Poker from '@assets/img/index/image_3.png';
import Matka from '@assets/img/index/image_4.png';
console.log('🚀 ~ file: IndexView.jsx:13 ~ Matka:', Matka);

const indexViewBlockItems = [
  {
    title: 'Lottery',
    image: Lottery,
    altText: 'Lottery',
    article: `Lottery is a game that offers the possibility of transforming your life with a modest sum of money. It involves a basic guessing game where you can effortlessly trade in small amounts of your own cash for the chance to win substantial rewards! Take a shot at it and see if you can generate a life-altering miracle. Play Lotto and embrace the excitement!`,
  },
  {
    title: 'Sports',
    image: Sports,
    altText: 'Sports',
    article: `Sports betting is an immensely popular activity in India, with cricket, football, hockey, volleyball, basketball, and badminton being the most commonly wagered-on sports. The excitement never stops as there is always another event to look forward to. In India, cricket is an integral part of daily life! The allure of sports betting lies in the opportunity ...`,
  },
  {
    title: 'Poker',
    image: Poker,
    altText: 'Poker',
    article: `Poker is widely regarded as the most popular card game in the world, offering players endless hours of entertainment. From Teen Patti and Rummy to Andar Bahar, Baccarat, Blackjack, and Texas Hold'em, online casinos offer a wide variety of poker games to cater to players' preferences. The game's simplicity lies in its straightforward combinations...`,
  },
  {
    title: 'Matka',
    image: Matka,
    altText: 'Matka',
    article: `Matka is considered to be one of the most popular lotteries in India. It offers a range of gaming features, including Jodi, Sangam, and Patti, all of which have Open and Close options. Players can also choose from Big, Small, Odd, and Even options. For those who prefer a fast-paced game, High Speed Matka is available, with numbers drawn every 10 minutes.`,
  },
];

function IndexView() {
  const { state, dispatch } = useAppContext();
  console.log("🚀 ~ file: IndexView.jsx:46 ~ IndexView ~ state:", state)
  const [categoryList, setCategoryList] = useState([]);
  async function getNavbar() {
    const payload = {
      apiUrl: process.env.NEXT_PUBLIC_SERVER_URL || '',
    };
    const categoryList = await getCategoryList(payload);

    return categoryList;
  }

  useEffect(() => {
    const getNavbarAsync = async () => {
      const navbar = await getNavbar();
      console.log(
        '🚀 ~ file: IndexNavbar.tsx:48 ~ useEffect ~ navbar:',
        navbar
      );
      setCategoryList(navbar);
    };
    getNavbarAsync().catch(console.error);
  }, []);

  const layoutBlockItems = useMemo(() => {
    if (categoryList.length === 0) return;
    return indexViewBlockItems.map((item) => {
      // console.log(
      //   '🚀 ~ file: IndexView.tsx:67 ~ layoutBlockItems ~ categoryList:',
      //   categoryList
      // );
      return {
        ...item,
        sitemapUrl: categoryList.find(
          (category) => category.name === item.title.toLocaleLowerCase()
        ).sitemapUrl,
      };
    });
  }, [categoryList]);

  const scrollToTop = (clientWidth) => {
    if (!clientWidth) return;

    let top = 0;

    console.log('🚀 ~ file: IndexNavbar.jsx:22 ~ scrollToTop ~ top:', top);

    scroll.scrollTo(top, {
      duration: 500,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  useEffect(() => {
    dispatch({
      type: 'SET_CATEGORY_NAME',
      payload: {
        categoryName: 'home',
      },
    });
    scrollToTop(state.clientWidth);
  }, [dispatch, state.clientWidth]);

  return (
    <>
      <Carousel />
      <div className={styles['index-fixed-background']} />
      <div className={styles['index-decoration-image-wrapper']}>
        <IndexDecorationImage
          marginTop={'3rem'}
          marginBottom={'0rem'}
          imageType={'thin-line'}
        />
      </div>
      {layoutBlockItems &&
        layoutBlockItems.map((item, index) => {
          return (
            <IndexViewBlock
              key={index}
              reverse={index % 2 === 1 ? true : false}
              viewBlock={item}
            />
          );
        })}
    </>
  );
}

export default IndexView;
