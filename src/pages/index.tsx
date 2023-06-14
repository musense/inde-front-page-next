import { Meta } from '@layouts/Meta';
import { Main } from '@components/Main/Main';
import IndexView from '@components/IndexView/IndexView';

const Home = () => {
  return (
    <Main
      meta={
        <Meta
          title='Zoonobet'
          description='Zoonobet'
          keywords='Zoonobet'
        />
      }
    >
      <IndexView />;
    </Main>
  );
};

export default Home;
