import type {
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
} from 'next'
import { Meta } from '@layouts/Meta'
import { Main } from '@components/Main/Main'
import CommonPage from '@components/CommonPage/commonPage'
import ContentPage from '@components/ContentPage/ContentPage'

import {
  getTitleContentsByCategory,
  getCategoryList,
  getCategorySitemapUrls,
} from '@assets/js/categoryContents'
import {
  getCategoryInfo,
  getEditorSitemapUrls,
  getRelatedArticles,
  getPreviousAndNextPageById,
  getMainContentBySitemapUrl,
} from '@assets/js/titleContents'
import {
  getTagContents,
  getTagInfo,
  getTagList,
  getTagSitemapUrls,
} from '@assets/js/tagContents'
import IndexView from '@components/IndexView/IndexView'
type CategoryProps = InferGetStaticPropsType<typeof getStaticProps>

const Page = ({
  mainTitle,
  commonPageItems,
  mainContent,
  relatedArticles,
  previousAndNextPage,
  sitemapUrl,
  meta,
}: CategoryProps) => {
  console.log('🚀 ~ file: index.tsx:41 ~ sitemapUrl:', sitemapUrl)
  console.log('🚀 ~ file: index.tsx:41 ~ meta:', meta)

  const page = sitemapUrl ? (
    sitemapUrl.indexOf('p_') !== -1 ? (
      <ContentPage
        category={mainTitle}
        mainContent={mainContent}
        relatedArticles={relatedArticles}
        previousAndNextPage={previousAndNextPage}
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
  )

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
  )
}

export default Page

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL
  const sitemapUrl = params?.sitemapUrl as string
  console.log(
    '🚀🚀🚀🚀🚀🚀 ~ file: index.tsx:42 ~ getStaticProps:GetStaticProps= ~ sitemapUrl:',
    sitemapUrl
  )
  console.log(
    "🚀🚀🚀🚀🚀🚀 ~ file: index.tsx:42 ~ getStaticProps:GetStaticProps= ~ sitemapUrl.indexOf('p_'):",
    sitemapUrl.indexOf('p_')
  )
  let payload = {
    apiUrl: apiUrl,
    sitemapUrl: `${process.env.NEXT_PUBLIC_SITE}/${sitemapUrl}`,
    _id: null,
    page: 0,
    categoryName: '',
    tagName: '',
  }
  let mainContent,
    previousAndNextPage,
    relatedArticles,
    categoryList,
    categoryItems,
    categoryInfo,
    tagList,
    tagItems,
    tagInfo,
    editorTitleList

  if (sitemapUrl.indexOf('p_') !== -1) {
    mainContent = await getMainContentBySitemapUrl(payload)
    console.log(
      '🚀 ~ file: index.tsx:115 ~ const getStaticProps:GetStaticProps= ~ mainContent:',
      mainContent
    )
    payload = {
      ...payload,
      _id: mainContent._id.toString(),
    }
    mainContent = {
      ...mainContent,
      name: mainContent.categories.name,
    }
    previousAndNextPage = await getPreviousAndNextPageById(payload)
    console.log(
      '🚀 ~ file: index.tsx:128 ~ constgetStaticProps:GetStaticProps= ~ previousAndNextPage:',
      previousAndNextPage
    )
    relatedArticles = await getRelatedArticles(payload)
    console.log(
      '🚀 ~ file: index.tsx:136 ~ constgetStaticProps:GetStaticProps= ~ relatedArticles:',
      relatedArticles
    )
    return {
      props: {
        mainTitle: mainContent.name,
        commonPageItems: '',
        mainContent: mainContent,
        previousAndNextPage: previousAndNextPage,
        relatedArticles: relatedArticles,
        sitemapUrl: sitemapUrl,
        meta: {
          headTitle: mainContent.headTitle,
          headDescription: mainContent.headDescription,
          headKeyword: mainContent.headKeyword,
        },
      },
      revalidate: 10,
    }
  }
  if (sitemapUrl.indexOf('c_') !== -1) {
    categoryList = await getCategoryList(payload)

    mainContent = categoryList.find(
      (category: any) => category.sitemapUrl === sitemapUrl
    )
    payload = {
      ...payload,
      categoryName: mainContent.name,
      page: 1,
    }
    categoryItems = await getTitleContentsByCategory(payload)
    categoryInfo = await getCategoryInfo(payload)
    editorTitleList = [...categoryItems]
    return {
      props: {
        mainTitle: mainContent.name,
        commonPageItems: editorTitleList,
        mainContent: '',
        previousAndNextPage: '',
        relatedArticles: '',
        sitemapUrl: sitemapUrl,
        meta: categoryInfo,
      },
      revalidate: 10,
    }
  }
  if (sitemapUrl?.indexOf('tag_') !== -1) {
    payload = {
      ...payload,
      page: 1,
    }
    tagList = await getTagList(payload)
    console.log(
      '🚀 ~ file: index.tsx:161 ~ const getStaticProps:GetStaticProps= ~ tagList:',
      tagList
    )
    mainContent = tagList.find((tag: any) => tag.sitemapUrl === sitemapUrl)
    console.log(
      '🚀 ~ file: index.tsx:164 ~ const getStaticProps:GetStaticProps= ~ mainContent:',
      mainContent
    )

    payload = {
      ...payload,
      tagName: mainContent.name,
    }
    tagItems = await getTagContents(payload)
    tagInfo = await getTagInfo(payload)
    editorTitleList = [...tagItems]

    return {
      props: {
        mainTitle: mainContent.name,
        commonPageItems: editorTitleList,
        mainContent: '',
        previousAndNextPage: '',
        relatedArticles: '',
        sitemapUrl: sitemapUrl,
        meta: tagInfo,
      },
      revalidate: 10,
    }
  }

  return {
    props: {
      mainTitle: '',
      commonPageItems: '',
      mainContent: '',
      previousAndNextPage: '',
      relatedArticles: '',
      sitemapUrl: null,
      meta: '',
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const navItems = ['lottery', 'sports', 'poker', 'matka', 'casino']
  const payload = {
    apiUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  }
  const editorPromise = getEditorSitemapUrls(payload)
  const tagPromise = getTagSitemapUrls(payload)
  const categoryPromise = getCategorySitemapUrls(payload)
  const sitemapUrl = await Promise.all([
    editorPromise,
    categoryPromise,
    tagPromise,
  ]).then((res) => res.flat())
  console.log(
    '🚀 ~ file: index.astro:40 ~ getStaticPaths ~ sitemapUrl:',
    sitemapUrl
  )
  const paths = sitemapUrl.map((url) => ({
    params: { sitemapUrl: url },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}
