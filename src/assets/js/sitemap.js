import { instance } from "./AxiosInstance";

export async function getInfoBySitemap(payload) {
  const { href, apiUrl } = payload
  const encodedUrl = encodeURIComponent(href)
  const response = await instance(apiUrl).get(`/checkUrl/${encodedUrl}`)
    .then(res => res.data)
  return response
}

const routeArray = ['/c_', '/tag_', '/p_'];
export const getRenamedContent = (sitemapUrl) => {
  const route = routeArray.find(item => sitemapUrl.indexOf(item) !== -1);
  const startIndex = sitemapUrl.indexOf(route) + 1;
  const endIndex = sitemapUrl.length;
  const renamed = sitemapUrl.substring(startIndex, endIndex);
  return renamed;
};
