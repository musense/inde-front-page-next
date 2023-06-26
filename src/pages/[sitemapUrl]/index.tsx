import type {
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
} from 'next';
import { Meta } from '@layouts/Meta';
import { Main } from '@components/Main/Main';
import CommonPage from '@components/CommonPage/commonPage';
import ContentPage from '@components/ContentPage/ContentPage';

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
import IndexView from '@components/IndexView/IndexView';
type CategoryProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page = ({
  mainTitle,
  commonPageItems,
  mainContent,
  relatedArticles,
  titleContents,
  sitemapUrl,
  meta,
}: CategoryProps) => {
  console.log('🚀 ~ file: index.tsx:41 ~ sitemapUrl:', sitemapUrl);
  console.log('🚀 ~ file: index.tsx:41 ~ meta:', meta);

  const page = sitemapUrl ? (
    sitemapUrl.indexOf('p_') !== -1 ? (
      <ContentPage
        category={mainTitle}
        mainContent={mainContent}
        relatedArticles={relatedArticles}
        titleContents={titleContents}
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
  ) : (
    <IndexView />
  );

  return (
    <Main
      meta={
        <Meta
          title={meta.headTitle}
          description={meta.headDescription}
          keywords={meta.headKeyword}
          canonical={`${process.env.NEXT_PUBLIC_SITE}/${sitemapUrl}`}
        />
      }
    >
      {page}
    </Main>
  );
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
        meta: mainContent,
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
        meta: categoryInfo,
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
        meta: tagInfo,
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
      sitemapUrl: null,
      meta: '',
    },
    revalidate: 10,
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
