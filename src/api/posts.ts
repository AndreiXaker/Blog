import axios from "axios";

export interface IPosts {
    id : number,
    title : string,
    body : string
}

export class Posts {
    URL = 'https://jsonplaceholder.typicode.com/posts'
    async getPosts(searchQuery?: string) {
        let queryURL = this.URL;

        // Если предоставлен searchQuery, добавляем к URL параметры для фильтрации
        if (searchQuery) {
            queryURL += `?title_like=${encodeURIComponent(searchQuery)}`;
        }

        const { data } = await axios.get<IPosts[]>(queryURL);
        return data;
    }
    async getPostById(postId: number) {
        const url = `${this.URL}/${postId}`;
        const { data } = await axios.get<IPosts>(url)
        return data;
    }
}
