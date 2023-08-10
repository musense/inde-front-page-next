import { instance } from "./AxiosInstance";
import { getRenamedContent } from '@assets/js/sitemap';

export async function getMainContentByID(payload) {
  const { _id, apiUrl } = payload
  console.log("🚀 ~ file: titleContents.js:6 ~ getTitleContentsByID ~ _id:", _id)
  const response = await instance(apiUrl).get(`/editor/${_id}`)
    .then(res => res.data)
    .then(mainContent => {
      return {
        ...mainContent,
        headTitle: mainContent.headTitle && mainContent.headTitle.length > 0
          ? mainContent.headTitle : mainContent.title,
        tags: mainContent.tags && mainContent.tags.length > 0 && mainContent.tags.map(tag => {
          return {
            ...tag,
            sitemapUrl: getRenamedContent(tag.sitemapUrl)
          }
        }),
        categories: {
          _id: mainContent.categories._id,
          name: mainContent.categories.name,
          sitemapUrl: getRenamedContent(mainContent.categories.sitemapUrl)
        }
      }
    })
  console.log("🚀 ~ file: titleContents.js:9 ~ getMainContentByID ~ response:", response)
  return response
}

export async function getMainContentBySitemapUrl(payload) {
  const { sitemapUrl, apiUrl } = payload
  let encodedSitemapUrl = encodeURIComponent(sitemapUrl)
  const response = await instance(apiUrl).get(`/checkUrl/${encodedSitemapUrl}`)
    .then(res => res.data.data)
    .then(mainContent => {
      console.log("🚀 ~ file: titleContents.js:37 ~ getMainContentBySitemapUrl ~ mainContent:", mainContent)
      return {
        ...mainContent,
        headTitle: mainContent.headTitle && mainContent.headTitle.length > 0
          ? mainContent.headTitle : mainContent.title,
        tags: mainContent.tags && mainContent.tags.length > 0 && mainContent.tags.map(tag => {
          return {
            ...tag,
            sitemapUrl: getRenamedContent(tag.sitemapUrl)
          }
        }),
        categories: {
          ...mainContent.categories,
          sitemapUrl: getRenamedContent(mainContent.categories.sitemapUrl),
        }
      }
    })
  const {
    serialNumber,
    content,
    manualUrl,
    pageView,
    topSorting,
    hidden,
    recommendSorting,
    popularSorting,
    homeImagePath,
    draft,
    updatedAt,
    status,
    __v,
    originalUrl,
    publishedAt,
    ...data } = response
  console.log("🚀 ~ file: titleContents.js:72 ~ getMainContentBySitemapUrl ~ data:", data)
  return data
}

//* LIST
export async function getPreviousAndNextPageById(payload) {
  const { apiUrl, _id } = payload
  const response = await instance(apiUrl).get(`/editor/adjacentArticle/${_id}`)
    .then(res => res.data)
  // .then(res => { console.log(res); return res })
  return response
}

//* LIST
export async function getTitleContents(payload) {
  const { apiUrl } = payload
  const response = await instance(apiUrl).get(`/editor?limit=9999&pageNumber=1`)
    .then(res => res.data.data)
    // .then(res => res.data.filter(item => item.categories.name.toLowerCase() !== "uncategorized"
    // && item.hidden === false
    // ))
    .then(res => { console.log(res); return res })
    .then(res => res.map(content => {
      return {
        ...content,
        headTitle: content.headTitle && content.headTitle.length > 0
          ? content.headTitle : content.title,
        tags: content.tags && content.tags.length > 0 && content.tags.map(tag => {
          return {
            ...tag,
            sitemapUrl: getRenamedContent(tag.sitemapUrl)
          }
        }),
        categories: {
          _id: content.categories._id,
          name: content.categories.name,
          sitemapUrl: getRenamedContent(content.categories.sitemapUrl)
        },
        sitemapUrl: getRenamedContent(content.sitemapUrl),
      }
    }))
  // .then(res => { console.log(res); return res })
  return response
}

//* LIST
export async function getEditorSitemapUrls(payload) {
  const { apiUrl } = payload
  const response = await instance(apiUrl).get(`/editor?limit=9999&pageNumber=1`)
    .then(res => {

      console.log("🚀 ~ file: titleContents.js:121 ~ getEditorSitemapUrls ~ res.data.data:", res.data.data)
      return res.data.data
    })
  //唯二不產URL的只有uncategorized && 未發布
  // .then(res => res.data.filter(item => item.categories.name.toLowerCase() !== "uncategorized"))


  const idArray = response.reduce((acc, curr) => {
    return [...acc, curr.sitemapUrl]
    // return [...acc, getRenamedContent(curr.sitemapUrl)]
  }, [])
  return idArray
}

export async function getCategoryInfo(payload) {
  const { categoryName, apiUrl } = payload
  const response = await instance(apiUrl).get(`/category/${categoryName}`)
    .then(res => res.data)
    .then(category => ({
      ...category,
      headTitle: category.headTitle && category.headTitle.length > 0
        ? category.headTitle : category.name,
    })
    )
  // console.log("🚀 ~ file: titleContents.js:31 ~ getCategoryInfo ~ response:", response)
  return response
}

//* LIST
export async function getTitleContentsByCategoryAndGetOnlyID(payload) {
  const { categoryName, page, apiUrl } = payload
  const response = await instance(apiUrl).get(`/categories/${categoryName}?limit=9999&pageNumber=${page}`)
    .then(res => res.data)
  const { data } = response
  const idArray = data.reduce((acc, curr) => {
    return [...acc, curr._id]
  }, [])
  return idArray
}

//* LIST
export async function getRelatedArticles(payload) {
  const { _id, apiUrl } = payload
  console.log("🚀 ~ file: titleContents.js:154 ~ getRelatedArticles ~ _id:", _id)
  const response = await instance(apiUrl).get(`/editor/relatedArticles/${_id}`)
    .then(res => res.data.data)
    // .then(res => { console.log(res); return res })
    // .then(res => res.data.filter(item => item.categories.name.toLowerCase() !== "uncategorized"))
    .then(relatedArticles => relatedArticles.map(article => {
      console.log("🚀 ~ file: titleContents.js:147 ~ getRelatedArticles ~ article:", article)
      const {
        commonTagsCount,
        publishedAt,
        tags,
        ...data
      } = article
      return {
        ...data,
        sitemapUrl: getRenamedContent(data.sitemapUrl)
      }
    }))
  // .then(res => { console.log(res); return res })
  return response
}


