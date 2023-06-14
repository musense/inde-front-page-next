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
    setActive(false);
    hamburgerCheck.checked = false;
  }, []);
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
  navRef,
  categoryList,
}) {
  console.log('🚀 ~ file: IndexNavbar.tsx:214 ~ categoryList:', categoryList);

  categoryList = [{ name: 'home', sitemapUrl: '' }, ...categoryList];
  const navHandler = useCallback(
    (e) => {
      console.log(e.type);
      e.preventDefault();
    },
    []
  );
  const liHandler = (e) => {
    console.log(e);
    e.stopPropagation();
  };
  useEffect(() => {
    if (navRef.current === null) {
      return;
    } else {
      navRef.current.addEventListener('touchstart', navHandler);
      navRef.current.addEventListener('wheel', navHandler);
      navRef.current.addEventListener('scroll', navHandler);
      navRef.current.addEventListener('touchmove', navHandler);
      const liList = navRef.current.querySelectorAll('li');
      liList.forEach(
        (li) => {
          li.addEventListener('touchstart', liHandler);
        }
      );
    }
  }, [navHandler, navRef]);

  const activeStyle = active ? 'active' : '';
  return (
    <Nav
      style={{ zIndex: zIndex }}
      className={`${styles['nav-btn-wrapper']} ${styles[activeStyle]}`}
    >
      <div ref={navRef}>
        {categoryList.map((category, index) => {
          return (
            <NavButton
              key={index}
              category={category}
            />
          );
        })}
      </div>
    </Nav>
  );
}
