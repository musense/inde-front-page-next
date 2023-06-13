import type { NextPageWithLayout } from './_app';
import { Meta } from '@layouts/Meta';
import { Main } from '@templates/Main';
import Link from 'next/link';
import IndexView from '@components/IndexView/IndexView';

const Home: NextPageWithLayout = () => {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-72'>
      <IndexView      />
    </main>
  );
};

export default Home;

Home.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Main
      meta={
        <Meta
          title='Zoonobet'
          description='Zoonobet'
        />
      }
    >
      {page}
    </Main>
  );
};
