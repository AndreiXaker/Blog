import { useState, useEffect } from 'react';
import {IPosts, Posts} from "../api/posts.ts";
export  interface ILikeStatus {
    [key: number]: { liked: boolean; count: number };
}

export interface IDislikeStatus {
    [key: number]: { disliked: boolean; count: number };
}

const usePosts = (searchInput : string) => {
    const [posts, setPosts] = useState<IPosts[]>([]);
    const [likeStatus, setLikeStatus] = useState<ILikeStatus>({});
    const [dislikeStatus, setDislikeStatus] = useState<IDislikeStatus>({});

    useEffect(() => {
        const postInstance = new Posts();
        async function fetchData(query : string) {
            const data = await postInstance.getPosts(query);
            setPosts(data);

            const initialLikes = {};
            const initialDislikes = {};
            data.forEach(post => {
                initialLikes[post.id] = { liked: false, count: Math.floor(Math.random() * 51) };
                initialDislikes[post.id] = { disliked: false, count: Math.floor(Math.random() * 51) };
            });
            setLikeStatus(initialLikes);
            setDislikeStatus(initialDislikes);
        }

        fetchData(searchInput);
    }, [searchInput]);
    return { posts, likeStatus, dislikeStatus, setLikeStatus, setDislikeStatus };
};

export default usePosts;
