import { instance } from "./AxiosInstance";
import { getRenamedContent } from '@assets/js/sitemap';

//* LIST
export async function getTagSitemapUrls(payload) {
    const { apiUrl } = payload
    const response = await instance(apiUrl).get(`/tags?limit=9999&pageNumber=1`)
        .then(res => res.data.data)
        .then(tagList => tagList.filter(content => content.sitemapUrl.indexOf('/tag_') !== -1))
    const idArray = response.reduce((acc, curr) => {
        return [...acc, getRenamedContent(curr.sitemapUrl)]
    }, [])

    return idArray
}

//* LIST
export async function getTagList(payload) {
    const { page, apiUrl } = payload
    const response = await instance(apiUrl).get(`/tags?limit=9999&pageNumber=${page}`)
        .then(res => res.data.data)
        // .then(res => { console.log(`🚀 ~ file: tagContents.js:19 ~ getTagInfo ~ res:`, res); return res })
        .then(res => res.map(tag => {
            return {
                ...tag,
                  headTitle    : tag.headTitle && tag.headTitle.length > 0
                                    ? tag.headTitle: tag.name,
                  sitemapUrl   : getRenamedContent(tag.sitemapUrl)
            }
        }))
    console.log("🚀 ~ file: tagContents.js:7 ~ getTagList ~ response:", response)

    return response
}

export async function getTagInfo(payload) {
    const { tagName, apiUrl } = payload
    const response = await instance(apiUrl).get(`/tags/${tagName}`)
        .then(res => res.data)

    // console.log("🚀 ~ file: tagContents.js:19 ~ getTagInfo ~ response:", response)

    return response
}


//* LIST
export async function getTagContents(payload) {
    // console.log("🚀 ~ file tagContents.js:4 ~ getTagsContent ~ payload:", payload)
    const { tagName, page, apiUrl } = payload
    const response = await instance(apiUrl).get(`/tags/tagSearch/${tagName}?limit=9999&pageNumber=${page}`)
        .then(res => res.data.data)
        // .then(res => { console.log(res); return res })
        // .then(res => res.data.filter(item => item.categories.name.toLowerCase() !== "uncategorized"))
        .then(tagContents => tagContents.map(content => {
            return {
                ...content,
                sitemapUrl: getRenamedContent(content.sitemapUrl)
            }
        }))
    // .then(res => { console.log("🚀 ~ file: tagContents.js:26 ~ getTagsContent ~ res:", res); return res })
    // console.log("🚀 ~ file: tagContents.js:26 ~ getTagsContent ~ response:", response)

    return response
}