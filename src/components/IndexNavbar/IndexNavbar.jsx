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
import { ReducerActionEnum } from "@store/types";

import { useRouter } from 'next/router';
import { document } from 'postcss';

function IndexNavbar() {
  const { state, dispatch } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    dispatch({
      type: 'SET_LAST_PATHNAME',
      payload: {
        lastPathname: state.pathname,
      },
    });
    dispatch({
      type: 'SET_PATHNAME',
      payload: {
        pathname: router.asPath,
      },
    });
  }, [router.asPath]);
  useEffect(() => {
    if (state.clientWidth === 0) {
      dispatch({
        type: 'SET_WINDOW_SIZE',
        payload: {
          width:
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth,
          height:
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight,
        },
      });
    }
  }, []);
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
    // dispatch({
    //   type: ReducerActionEnum.SET_NAVBAR_ACTIVE_STATUS,
    //   payload: {
    //     active: false,
    //   },
    // })
  }, []);
  async function getNavbar() {
    const payload = {
      apiUrl: process.env.NEXT_PUBLIC_SERVER_URL || '',
    };
    const navItems = ['lottery', 'sports', 'poker', 'matka', 'casino'];
    const categoryList = await getCategoryList(payload)
      .then((categoryList) =>
        categoryList.filter((category) => navItems.includes(category.name))
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
  }, [hamburgerRef]);

  const toggleHamburger = (e) => {
    const active = e?.target?.checked || false;
    console.log('Clicked, new value = ' + e.target.checked);
    setActive(active);
    // dispatch({
    //   type: ReducerActionEnum.SET_NAVBAR_ACTIVE_STATUS,
    //   payload: {
    //     active: active,
    //   },
    // })
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
  }, [navHandler, navRef]);

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
