import { type ReactNode } from 'react';
import Footer from '@components/DarkFooter/DarkFooter';
import Navbar from '@components/IndexNavbar/IndexNavbar';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

function Main({ meta, children }: IMainProps) {

  return (
    // <Context>
      <div className='w-full px-1 text-gray-700 antialiased'>
        {meta}

        <div className='mx-auto max-w-screen-md'>
          <Navbar />
          <main className='content py-5 text-xl'>{children}</main>
          <Footer />
        </div>
      </div>
    // </Context>
  );
}

export { Main };
