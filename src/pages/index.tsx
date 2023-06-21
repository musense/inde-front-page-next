import { Meta } from '@layouts/Meta';
import { Main } from '@components/Main/Main';
import IndexView from '@components/IndexView/IndexView';

const Home = () => {
  return (
    <Main
      meta={
        <Meta
          title={process.env.NEXT_PUBLIC_TITLE || 'Zoonobet'}
          description={process.env.NEXT_PUBLIC_DESCRIPTION || 'Zoonobet'}
          keywords={process.env.NEXT_PUBLIC_KEYWORDS || 'Zoonobet'}
          canonical={process.env.NEXT_PUBLIC_SITE}
        />
      }
    >
      <IndexView />;
    </Main>
  );
};

export default Home;
