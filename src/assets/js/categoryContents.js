import { instance } from "./AxiosInstance";
import { getRenamedContent } from '@assets/js/sitemap';


//* LIST
export async function getCategoryList(payload) {
    const { apiUrl } = payload
    const response = await instance(apiUrl).get(`/categories`)
        .then(res => res.data.data)
        // .then(res => { console.log("🚀 ~ file: categoryContents.js:11 ~ getCategoryList ~ res:", res); return res })
        // .then(res => { console.log(`🚀 ~ file: categoryContents.js:11 ~ getCategoryList ~ res:`, res); return res })
        // .then(res => res.data.filter((item) => item.name.toLowerCase() !== "uncategorized"))
        .then(categoryList => categoryList.map((category) => {
            return {
                ...category,
                headTitle: category.headTitle && category.headTitle.length > 0
                    ? category.headTitle : category.name,
                sitemapUrl: getRenamedContent(category.sitemapUrl),
            }
        }))



    console.log("🚀 ~ file: categoryContents.js:11 ~ getCategoryList ~ response:", response)
    return response
}

//* LIST
export async function getCategorySitemapUrls(payload) {
    const { apiUrl } = payload
    const response = await instance(apiUrl).get(`/categories`)
        .then(res => res.data.data)
    // .then(res => { console.log(res); return res })
    // .then(res => res.data.filter((item) => item.name.toLowerCase() !== "uncategorized"))
    // .then(res => { console.log(res); return res })
    const idArray = response.reduce((acc, curr) => {
        return [...acc, getRenamedContent(curr.sitemapUrl)]
    }, [])
    return idArray
}


//* LIST
export async function getTitleContentsByCategory(payload) {
    const { categoryName, page, apiUrl } = payload
    console.log("🚀 ~ file: categoryContents.ts:63 ~ getTitleContentsByCategory ~ categoryName:", categoryName)
    const response = await instance(apiUrl).get(`/categories/${categoryName}?limit=9999&pageNumber=${page}`)
        .then(res => res.data.data)
        .then(res => { console.log("🚀 ~ file: categoryContents.ts:66 ~ getTitleContentsByCategory ~ res:", res); return res })
        // .then(res => res.data.filter((item) => item.categories.name.toLowerCase() !== "uncategorized"))
        .then(categoryContents => categoryContents.map((content) => {
            return {
                ...content,
                sitemapUrl: getRenamedContent(content.sitemapUrl)
            }
        }))
    // .then(res => { console.log(res); return res })
    return response
}