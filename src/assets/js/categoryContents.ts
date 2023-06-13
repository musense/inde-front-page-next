import { instance } from "./AxiosInstance";
import { getRenamedContent } from '@assets/js/sitemap';


type PayloadProps = {
    apiUrl: string
}
const navItems = ['lottery', 'sports', 'poker', 'matka', 'casino'];
//* LIST
export async function getCategoryList(payload: PayloadProps): Promise<any[]> {
    const { apiUrl } = payload
    const response = await instance(apiUrl).get(`/categories`)
        .then(res => res.data.data)
        // .then(res => { console.log("🚀 ~ file: categoryContents.js:11 ~ getCategoryList ~ res:", res); return res })
        // .then(res => { console.log(`🚀 ~ file: categoryContents.js:11 ~ getCategoryList ~ res:`, res); return res })
        .then(res => res.map(category => {
            return {
                ...category,
                headTitle: category.headTitle && category.headTitle.length > 0
                    ? category.headTitle : category.name
            }
        }))
        .then((categoryList) =>
            categoryList.filter((category: { name: string }) =>
                navItems.includes(category.name)
            )
        )
        .then((categoryList) =>
            navItems.map((item) => {
                const category = categoryList.find(
                    (category: { name: string }) => category.name === item
                );
                return {
                    ...category,
                    sitemapUrl: getRenamedContent(category.sitemapUrl),
                };
            })
        );
    // console.log("🚀 ~ file: categoryContents.js:11 ~ getCategoryList ~ response:", response)
    return response
}

//* LIST
export async function getCategorySitemapUrls(payload) {
    const { apiUrl } = payload
    const response = await instance(apiUrl).get(`/categories`)
        .then(res => res.data)
        // .then(res => { console.log(res); return res })
        .then(res => res.data.filter(item => item.name.toLowerCase() !== "uncategorized"))
    // .then(res => { console.log(res); return res })
    const idArray = response.reduce((acc, curr) => {
        return [...acc, getRenamedContent(curr.sitemapUrl)]
    }, [])
    return idArray
}