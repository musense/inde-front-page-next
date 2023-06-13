import type { NextPageWithLayout } from './../_app';
import { Meta } from '@layouts/Meta';
import { Main } from '@templates/Main';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  console.log('🚀 ~ file: index.tsx:8 ~ Page ~ router:', router);
  const id = router.query.id as string;
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-72'>
      <h1>{id}</h1>
      <Link href={'..'}>Back</Link>
    </main>
  );
};

export default Page;

Page.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Main
      meta={
        <Meta
          title='Zoonobet [id]'
          description='Zoonobet'
        />
      }
    >
      {page}
    </Main>
  );
};
