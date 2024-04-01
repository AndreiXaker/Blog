import { useState } from "react";
import PostComponent from "../Posts/PostComponent.tsx";
import usePosts from "../../hooks/usePost.ts";
import styles from "./Container.module.css";
import capitalizeFirstLetter from "../../firstLetter.ts";

export function Container() {
    const [searchInput, setSearchInput] = useState("");
    const { posts, likeStatus, dislikeStatus, setLikeStatus, setDislikeStatus } = usePosts(searchInput);

    const handleLike = (postId: number) => {

        setLikeStatus((prevStatus) => ({
            ...prevStatus,
            [postId]: {
                liked: true,
                count: (prevStatus[postId]?.count || 0) + 1
            }
        }));
    };

    const handleDislike = (postId: number) => {
        // Обновление dislikeStatus с новым количеством и состоянием дизлайка
        setDislikeStatus((prevStatus) => ({
            ...prevStatus,
            [postId]: {
                disliked: true,
                count: (prevStatus[postId]?.count || 0) + 1
            }
        }));
    };

    return (
        <>
            <div className={styles.searchBarContainer}>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Поиск по названию статьи"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </div>
            <div className={styles.gridContainer}>
                {posts.map((post,index) => (
                    <PostComponent
                        key={post.id}
                        isWide = {index === 0}
                        post={{ ...post, title: capitalizeFirstLetter(post.title), body: capitalizeFirstLetter(post.body) }}
                        likeStatus={likeStatus[post.id] || { liked: false, count: 0 }}
                        dislikeStatus={dislikeStatus[post.id] || { disliked: false, count: 0 }}
                        handleLike={handleLike}
                        handleDislike={handleDislike}
                    />
                ))}
            </div>
        </>
    );
}
