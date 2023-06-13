

import Link from 'next/link';
import type { ReactNode } from 'react';
import { AppConfig } from '@utils/AppConfig';
import Footer from './DarkFooter';
import Navbar from './IndexNavbar';

// import { getRenamedContent } from '@assets/js/sitemap';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};


function Main(props: IMainProps) {
  console.log('🚀 ~ file: Main.tsx:15 ~ Main ~ props:', props);

  return (
    <div className='w-full px-1 text-gray-700 antialiased'>
      {props.meta}

      <div className='mx-auto max-w-screen-md'>
        <Navbar />

        <main className='content py-5 text-xl'>{props.children}</main>

        <Footer />
      </div>
    </div>
  );
}

export { Main };
