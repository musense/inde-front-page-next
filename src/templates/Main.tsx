import Link from 'next/link';
import { useEffect, type ReactNode, useContext, useReducer } from 'react';
import { AppConfig } from '@utils/AppConfig';
import Footer from './DarkFooter';
import Navbar from './IndexNavbar';

import {
  MainContext,
  // , MainDispatchContext
} from '@store/context';
import { mainReducer, initialState } from '@store/reducer';
import { ReducerActionEnum } from '@store/types';

// import { getRenamedContent } from '@assets/js/sitemap';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

function Main({ meta, children }: IMainProps) {
  //   console.log('🚀 ~ file: Main.tsx:15 ~ Main ~ props:', props);

  // const [state, dispatch] = useReducer(mainReducer, initialState);
  // console.log('🚀 ~ file: Main.tsx:25 ~ Main ~ state:', state);

  // function setClientWidthInLocalStorage() {
  //   dispatch({
  //     type: ReducerActionEnum.SET_WINDOW_SIZE,
  //     payload: {
  //       width:
  //         window.innerWidth ||
  //         document.documentElement.clientWidth ||
  //         document.body.clientWidth,
  //       height:
  //         window.innerHeight ||
  //         document.documentElement.clientHeight ||
  //         document.body.clientHeight,
  //     },
  //   });
  // }

  // function setPathnameInLocalStorage(pathname: string) {
  //   if (!pathname) return;
  //   if (
  //     !(
  //       localStorage.getItem('pathname') &&
  //       localStorage.getItem('pathname') == pathname
  //     )
  //   ) {
  //     dispatch({
  //       type: ReducerActionEnum.SET_PATHNAME,
  //       payload: {
  //         pathname: window.location.pathname,
  //       },
  //     });
  //   }
  // }

  // function setLastPagePathnameInLocalStorage() {
  //   const lastPagePathname = state.pathname;
  //   console.log(
  //     '🚀 ~ file: IndexNavbar.jsx:91 ~ setPathnameInLocalStorage ~ lastPagePathname:',
  //     lastPagePathname
  //   );
  //   if (lastPagePathname) {
  //     dispatch({
  //       type: ReducerActionEnum.SET_LAST_PATHNAME,
  //       payload: {
  //         lastPathname: lastPagePathname,
  //       },
  //     });
  //   }
  // }

  useEffect(() => {
    const pathname = window.location.pathname;

    console.log(
      '🚀 ~ file: IndexNavbar.tsx:60 ~ useEffect ~ pathname:',
      pathname
    );
    // setLastPagePathnameInLocalStorage();
    // setClientWidthInLocalStorage();
    // setPathnameInLocalStorage(pathname);
  }, []);
  return (
    <div className='w-full px-1 text-gray-700 antialiased'>
      {meta}

      <div className='mx-auto max-w-screen-md'>
        {/* <MainContext.Provider value={state}> */}
        {/* <MainDispatchContext.Provider value={dispatch}> */}
        <Navbar />

        <main className='content py-5 text-xl'>{children}</main>

        <Footer />
        {/* </MainDispatchContext.Provider> */}
        {/* </MainContext.Provider> */}
      </div>
    </div>
  );
}

export { Main };
