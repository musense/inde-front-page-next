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
import Logo from './Logo';
import NavButton from './NavButton';
import Hamburger from './Hamburger';
import NavBackDrop from './NavBackDrop';
import { getCategoryList } from '@assets/js/categoryContents';
import { getRenamedContent } from '@assets/js/sitemap';

function IndexNavbar() {
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const navRef = useRef(null);
  const hamburgerRef = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState(false);

  const stopPropagationAndToggleHamburger = useCallback((e) => {
    e.stopPropagation();
    toggleHamburger(e);
  }, []);
  const unCheck = useCallback(() => {
    const hamburgerCheck = hamburgerRef.current!;
    setActive(false);
    hamburgerCheck.checked = false;
  }, [active]);
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
      setCategoryList(navbar)
    };
    getNavbarAsync().catch(console.error);
  }, []);
  // const categoryList = useMemo<Promise<any[]>>(() => getNavbar(), []);

  // useEffect(async () => {
  //   const categoryList = await getNavbar();
  //   setCategoryList(categoryList);
  // }, []);

  useEffect(() => {
    const clientWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const pathname = window.location.pathname;
    setLastPagePathnameInLocalStorage();
    // setTimeout(() => {
    setClientWidthInLocalStorage(clientWidth);
    setPathnameInLocalStorage(pathname);

    // }, 0)
  }, []);
  useEffect(() => {
    const clientWidth = localStorage.getItem(
      'clientWidth'
    ) as unknown as number;
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

  const toggleHamburger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const active = e?.target?.checked || false
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

function setClientWidthInLocalStorage(clientWidth) {
  if (
    !(
      localStorage.getItem('clientWidth') &&
      localStorage.getItem('clientWidth') == clientWidth
    )
  ) {
    localStorage.setItem('clientWidth', clientWidth);
  }
}

function setPathnameInLocalStorage(pathname: string) {
  if (!pathname) return;
  if (
    !(
      localStorage.getItem('pathname') &&
      localStorage.getItem('pathname') == pathname
    )
  ) {
    pathname = window.location.pathname;
    localStorage.setItem('pathname', window.location.pathname);
  }
}

function setLastPagePathnameInLocalStorage() {
  const lastPagePathname = localStorage.getItem('pathname');
  console.log(
    '🚀 ~ file: IndexNavbar.jsx:91 ~ setPathnameInLocalStorage ~ lastPagePathname:',
    lastPagePathname
  );
  if (lastPagePathname) {
    localStorage.setItem('last-page-pathname', lastPagePathname);
  }
}

function setCategoryNameInLocalStorageAndReturn(pathname: string) {
  if (!pathname) return;
  let categoryName;
  if (pathname.indexOf('/c_') !== -1) {
    if (pathname.indexOf('/p_') !== -1) {
      categoryName = pathname.split('/c/')[1].split('/p/')[0];
      localStorage.setItem('categoryName', categoryName);
      console.log(
        '🚀 ~ file: IndexNavbar.jsx:31 ~ useEffect ~ category:',
        categoryName
      );
    } else {
      categoryName = pathname.split('/c_')[1];
      categoryName = categoryName.replace('/', '');
      console.log(
        '🚀 ~ file: IndexNavbar.jsx:31 ~ useEffect ~ categoryName:',
        categoryName
      );
    }
    localStorage.setItem('categoryName', categoryName);
  } else {
    categoryName = 'home';
    localStorage.setItem('categoryName', categoryName);
  }
  return categoryName;
}

function Header({ children }: { children: React.ReactNode }) {
  return (
    <Navbar
      id='navbar'
      className={`fixed-top ${styles.navbar} ${styles.show}`}
    >
      <Container className={styles.container}>{children}</Container>
    </Navbar>
  );
}

function NavWrapper({
  active,
  zIndex,
  navRef,
  categoryList,
}: {
  active      : boolean;
  zIndex      : number;
  navRef      : any;
  categoryList: any[];
}) {
  console.log("🚀 ~ file: IndexNavbar.tsx:214 ~ categoryList:", categoryList)
  // const selectedCategory = localStorage.getItem("categoryName")
  // useEffect(() => {
  //   const pathname = localStorage.getItem("pathname")
  //   console.log("🚀 ~ file: IndexNavbar.jsx:168 ~ useEffect ~ selectedCategory:", selectedCategory)
  //   if (pathname && pathname.indexOf('/tag_') !== -1) {
  //     // return null;
  //     setSelectedCategoryName(undefined)
  //   } else {
  //     // return selectedCategory
  //     setSelectedCategoryName(selectedCategory)
  //   }
  // }, []);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
  categoryList = [{ name: 'home', sitemapUrl: '' }, ...categoryList];
  const navHandler = useCallback((e) => {
    console.log(e.type);
    e.preventDefault();
  }, []);
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
      liList.forEach((li) => {
        li.addEventListener('touchstart', liHandler);
      });
    }
  }, [navRef.current]);

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
