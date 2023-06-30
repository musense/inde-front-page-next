import { instance } from "@assets/js/AxiosInstance";

export default async function handler(request, resolver) {
    const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const response = await instance(apiUrl).get(`/sitemap.xml`)
        .then(res => res.data)
    return resolver.status(200).send(response)
}
