import type {
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
} from 'next';
import type { NextPageWithLayout } from '../_app';
import { Meta } from '@layouts/Meta';
import { Main } from '@templates/Main';
import CommonPage from '@components/commonPage/commonPage';
import ContentPage from '@views/index-sections/ContentPage';

import {
  getTitleContentsByCategory,
  getCategoryList,
  getCategorySitemapUrls,
} from '@assets/js/categoryContents';
import {
  getCategoryInfo,
  getEditorSitemapUrls,
  getRelatedArticles,
  getTitleContents,
  getTitleContentsByID,
} from '@assets/js/titleContents';
import {
  getTagContents,
  getTagInfo,
  getTagList,
  getTagSitemapUrls,
} from '@assets/js/tagContents';
type CategoryProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPageWithLayout = ({
  mainTitle,
  commonPageItems,
  mainContent,
  relatedArticles,
  titleContents,
  sitemapUrl,
}: CategoryProps) => {
  return sitemapUrl ? (
    sitemapUrl.indexOf('p_') !== -1 ? (
      <ContentPage
        category        = {mainTitle}
        mainContent     = {mainContent}
        relatedArticles = {relatedArticles}
        titleContents   = {titleContents}
      />
    ) : sitemapUrl.indexOf('tag_') !== -1 ? (
      <CommonPage
        paramName={`# ${mainTitle}`}
        commonPageItems={commonPageItems}
      />
    ) : (
      <CommonPage
        paramName={mainTitle}
        commonPageItems={commonPageItems}
      />
    )
  ) : null;
};

export default Page;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const sitemapUrl = params?.sitemapUrl as string;
  console.log(
    '🚀🚀🚀🚀🚀🚀 ~ file: index.tsx:42 ~ getStaticProps:GetStaticProps= ~ sitemapUrl:',
    sitemapUrl
  );
  console.log(
    "🚀🚀🚀🚀🚀🚀 ~ file: index.tsx:42 ~ getStaticProps:GetStaticProps= ~ sitemapUrl.indexOf('p_'):",
    sitemapUrl.indexOf('p_')
  );
  let payload = {
    apiUrl: apiUrl,
    _id: null,
    page: 0,
    categoryName: '',
    tagName: '',
  };
  let titleContents,
    content,
    mainContent,
    relatedArticles,
    categoryList,
    categoryItems,
    categoryInfo,
    tagList,
    tagItems,
    tagInfo,
    editorTitleList;

  if (sitemapUrl.indexOf('p_') !== -1) {
    titleContents = await getTitleContents(payload);
    console.log(
      '🚀 ~ file: index.tsx:115 ~ const getStaticProps:GetStaticProps= ~ titleContents:',
      titleContents
    );
    content = titleContents.find(
      (content: any) => content.sitemapUrl === sitemapUrl
    );
    payload = {
      ...payload,
      _id: content._id,
    };
    mainContent = await getTitleContentsByID(payload);
    mainContent = {
      ...mainContent,
      name: mainContent.categories.name,
    };
    console.log(
      '🚀 ~ file: index.tsx:115 ~ const getStaticProps:GetStaticProps= ~ mainContent:',
      mainContent
    );

    relatedArticles = await getRelatedArticles(payload);
    return {
      props: {
        mainTitle: mainContent.name,
        commonPageItems: '',
        mainContent: mainContent,
        relatedArticles: relatedArticles,
        titleContents: titleContents,
        sitemapUrl: sitemapUrl,
      },
      revalidate: 10,
    };
  }
  if (sitemapUrl.indexOf('c_') !== -1) {
    categoryList = await getCategoryList(payload);
    mainContent = categoryList.find(
      (category: any) => category.sitemapUrl === sitemapUrl
    );

    payload = {
      ...payload,
      categoryName: mainContent.name,
      page: 1,
    };
    categoryItems = await getTitleContentsByCategory(payload);
    categoryInfo = await getCategoryInfo(payload);
    editorTitleList = [...categoryItems];
    return {
      props: {
        mainTitle: mainContent.name,
        commonPageItems: editorTitleList,
        mainContent: '',
        relatedArticles: '',
        titleContents: '',
        sitemapUrl: sitemapUrl,
      },
      revalidate: 10,
    };
  }
  if (sitemapUrl?.indexOf('tag_') !== -1) {
    payload = {
      ...payload,
      page: 1,
    };
    tagList = await getTagList(payload);
    console.log(
      '🚀 ~ file: index.tsx:161 ~ const getStaticProps:GetStaticProps= ~ tagList:',
      tagList
    );
    mainContent = tagList.find((tag: any) => tag.sitemapUrl === sitemapUrl);
    console.log(
      '🚀 ~ file: index.tsx:164 ~ const getStaticProps:GetStaticProps= ~ mainContent:',
      mainContent
    );

    payload = {
      ...payload,
      tagName: mainContent.name,
    };
    tagItems = await getTagContents(payload);
    tagInfo = await getTagInfo(payload);
    editorTitleList = [...tagItems];

    return {
      props: {
        mainTitle: mainContent.name,
        commonPageItems: editorTitleList,
        mainContent: '',
        relatedArticles: '',
        titleContents: '',
        sitemapUrl: sitemapUrl,
      },
      revalidate: 10,
    };
  }

  return {
    props: {
      mainTitle: '',
      commonPageItems: '',
      mainContent: '',
      relatedArticles: '',
      titleContents: '',
      sitemapUrl: undefined,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const navItems = ['lottery', 'sports', 'poker', 'matka', 'casino'];
  const payload = {
    apiUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  };
  const editorPromise = getEditorSitemapUrls(payload);
  const tagPromise = getTagSitemapUrls(payload);
  const categoryPromise = getCategorySitemapUrls(payload);
  const sitemapUrl = await Promise.all([
    editorPromise,
    categoryPromise,
    tagPromise,
  ]).then((res) => res.flat());
  console.log(
    '🚀 ~ file: index.astro:40 ~ getStaticPaths ~ sitemapUrl:',
    sitemapUrl
  );
  const paths = sitemapUrl.map((url) => ({
    params: { sitemapUrl: url },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

Page.getLayout = function getLayout(page: React.ReactElement) {
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
