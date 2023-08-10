import { instance } from "./AxiosInstance";

export async function getInfoBySitemap(payload) {
  const { href, apiUrl } = payload
  const encodedUrl = encodeURIComponent(href)
  const response = await instance(apiUrl).get(`/checkUrl/${encodedUrl}`)
    .then(res => res.data)
  return response
}

export async function getAllSitemapUrl(payload) {
  const { apiUrl } = payload
  const response = await instance(apiUrl).get(`/sitemap/getAllUrl`)
    .then(res => res.data)
  const sitemapUrlArray = response.reduce((acc, curr) => {
    return [...acc, getRenamedContent(curr.url)]
  }, [])
  return sitemapUrlArray
}

const routeArray = ['/c_', '/tag_', '/p_'];
export const getRenamedContent = (sitemapUrl) => {
  console.log("🚀 ~ file: sitemap.js:13 ~ getRenamedContent ~ sitemapUrl:", sitemapUrl)
  const route = routeArray.find(item => sitemapUrl.indexOf(item) !== -1);
  const startIndex = sitemapUrl.indexOf(route) + 1;
  const endIndex = sitemapUrl.length;
  const renamed = sitemapUrl.substring(startIndex, endIndex);
  return renamed;
};
