import { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import { IPosts, Posts } from "../../api/posts.ts";
import styles from './PostPage.module.css'
import capitalizeFirstLetter from "../../firstLetter.ts";
export function PostPage() {
    const [post, setPost] = useState<IPosts | null>(null);
    const { postId } = useParams<{ postId: string }>();

    useEffect(() => {
        const fetchPost = async () => {
            const postsApi = new Posts();
            const post = await postsApi.getPostById(Number(postId));
            setPost(post);
        };

        fetchPost();
    }, [postId]);

    if (!post) {
        return <div>Загрузка...</div>;
    }

    return (
        <>
            <header>
                <Link to='/' className={styles.headerLink}>
                    <span className="material-symbols-outlined headerIcon">arrow_back</span>
                    Вернуться к статьям</Link>
            </header>
            <h1 className={styles.Title}>
                <strong>{capitalizeFirstLetter(post.title)}</strong>
            </h1>
            <div className={styles.ImageContainer}>
                <img src={'https://placehold.co/600x400'} alt="loading..." className={styles.ImagePage} />
            </div>
            <p>{capitalizeFirstLetter(post.body)}</p>
        </>
    );
}
