import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
// reactstrap components
import { Navbar, Nav, Container } from 'reactstrap';

import styles from './indexNavbar.module.css';
import Logo from '@components/Logo/Logo';
import NavButton from '@components/NavButton/NavButton';
import Hamburger from '@components/Hamburger/Hamburger';
import NavBackDrop from '@components/NavBackDrop/NavBackDrop';
import { getCategoryList } from '@assets/js/categoryContents';

import { useAppContext } from '@store/context';

import { useRouter } from 'next/router';
import { AppConfig } from '@utils/AppConfig';

import useInitial from "@hook/useInitial";


function IndexNavbar() {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  useInitial({
    state,
    dispatch,
    path: router.asPath
  });
  // console.group("🚀 ~ file: IndexNavbar.jsx:25 ~ IndexNavbar ~ state:")
  // console.table(state)
  // console.groupEnd("🚀 ~ file: IndexNavbar.jsx:25 ~ IndexNavbar ~ state:")



  const [categoryList, setCategoryList] = useState([]);
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);
  const [active, setActive] = useState(false);

  const stopPropagationAndToggleHamburger = useCallback(
    (e) => {
      console.log(
        '🚀 ~ file: IndexNavbar.tsx:31 ~ stopPropagationAndToggleHamburger ~ e:',
        e
      );
      e.stopPropagation();

      toggleHamburger(e);
    },
    []
  );
  const unCheck = useCallback(() => {
    const hamburgerCheck = hamburgerRef.current;
    hamburgerCheck.checked = false;
    setActive(false);
  }, []);
  async function getNavbar() {
    const payload = {
      apiUrl: process.env.NEXT_PUBLIC_SERVER_URL || '',
    };
    const navItems = AppConfig.nav_items;
    const categoryList = await getCategoryList(payload)
      .then((categoryList) =>
        navItems.map(item => {
          const category = categoryList.find(
            (category) => category.name === item
          );
          return category;
        })
      );;
    console.log("🚀 ~ file: IndexNavbar.jsx:93 ~ getNavbar ~ categoryList:", categoryList)



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

  useEffect(() => {
    const clientWidth = state.clientWidth;
    if (clientWidth <= 768) {
      if (hamburgerRef.current == null && navRef.current === null) {
        return;
      } else {
        hamburgerRef.current?.addEventListener(
          'click',
          stopPropagationAndToggleHamburger,
          false
        );
        hamburgerRef.current?.addEventListener(
          'touchstart',
          stopPropagationAndToggleHamburger,
          false
        );
      }
    }
  }, [hamburgerRef, state.clientWidth, stopPropagationAndToggleHamburger]);

  const toggleHamburger = (e) => {
    const active = e?.target?.checked || false;
    console.log('Clicked, new value = ' + e.target.checked);
    setActive(active);
  };

  return (
    <Header>
      <NavBackDrop
        active={active}
        unCheck={unCheck}
        zIndex={2}
      />
      <Logo
        zIndex={1}
        active={active}
      />
      <NavWrapper
        active={active}
        navRef={navRef}
        unCheck={unCheck}
        zIndex={3}
        categoryList={categoryList}
      />
      <Hamburger
        ref={hamburgerRef}
        unCheck={unCheck}
        zIndex={3}
      />
    </Header>
  );
}

export default IndexNavbar;



function Header({ children }) {
  return (
    <Navbar
      id='navbar'
      className={`fixed-top ${styles.navbar} ${styles.show}`}
    >
      <Container className={styles.container}>
        {children}
      </Container>
    </Navbar>
  );
}

function NavWrapper({
  active,
  zIndex,
  unCheck,
  navRef,
  categoryList,
}) {
  console.log('🚀 ~ file: IndexNavbar.tsx:172 ~ categoryList:', categoryList);

  categoryList = [{ name: 'home', sitemapUrl: '' }, ...categoryList];

  const navHandler = useCallback((e) => {
    console.log("🚀🚀🚀🚀🚀 ~ navRef ~ e.type:", e.type)
    e.preventDefault();
  }, []);

  const linkHandler = useCallback((e) => {
    console.log("🚀🚀🚀🚀🚀 ~ link ~ e.type:", e.type);
    e.stopPropagation();
  }, []);

  useEffect(() => {
    if (navRef.current === null) {
      return;
    } else {
      // navRef.current.addEventListener('touchstart', navHandler);
      navRef.current.addEventListener('wheel', navHandler);
      navRef.current.addEventListener('scroll', navHandler);
      navRef.current.addEventListener('touchmove', navHandler);
      const linkList = navRef.current.querySelectorAll('a');
      linkList.forEach(
        (link) => {
          console.log("🚀 ~ file: IndexNavbar.jsx:221 ~ useEffect ~ link:", link)
          link.addEventListener('touchstart', linkHandler);
        }
      );
    }
  }, [navHandler, linkHandler, navRef]);

  const activeStyle = active ? 'active' : '';
  return (
    <div
      ref={navRef}
      style={{ zIndex: zIndex }}
      className={`${styles['nav-btn-wrapper']} ${styles[activeStyle]}`}>
      <Nav
      >
        {categoryList.map((category, index) => {
          return (
            <NavButton
              key={index}
              unCheck={unCheck}
              category={category}
            />
          );
        })}
      </Nav>
    </div>
  );
}
