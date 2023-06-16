import { type ReactNode } from 'react';
import Footer from '@components/DarkFooter/DarkFooter';
import Navbar from '@components/IndexNavbar/IndexNavbar';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

function Main({ meta, children }: IMainProps) {
  return (
    <div className='w-full'>
      {meta}
      <div className='mx-auto'>
        <Navbar />
        <main className='relative z-10'>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export { Main };
