import React from 'react';
import styles from './PostComponent.module.css';
import { Link } from 'react-router-dom';
import { IPosts } from "../../api/posts.ts";

export interface ILikeStatus {
    liked?: boolean;
    count: number;
}

export interface IDislikeStatus {
    disliked?: boolean;
    count: number;
}

export interface PostComponentProps {
    post: IPosts;
    likeStatus: ILikeStatus;
    dislikeStatus: IDislikeStatus;
    handleLike: (postId: number) => void;
    handleDislike: (postId: number) => void;
    isWide?: boolean;
}

const PostComponent: React.FC<PostComponentProps> = ({post, likeStatus,
dislikeStatus, handleLike, handleDislike, isWide = false
}) => {
    const renderPostImage = (imageUrl: string, altText: string) => (
        <img src={imageUrl} alt={altText} className={styles.imagePosts} />
    );

    return (
        <div className={`${styles.post} ${isWide ? styles.postWide : ''}`}>
            {renderPostImage('https://placehold.co/600x400', `Post Image ${post.id}`)}
            <div className={styles.titleAndReactions}>
                <h3 className={styles.title}>{post.title}</h3>
                <div className={styles.reactions}>
                    <div className={`${styles.reaction} ${likeStatus.liked ? styles.liked : ''}`} onClick={() => handleLike(post.id)}>
                        <span className={`${styles.iconUp} material-icons`}>thumb_up</span>
                        <span>{likeStatus.count}</span>
                    </div>
                    <div className={`${styles.reaction} ${dislikeStatus.disliked ? styles.disliked : ''}`} onClick={() => handleDislike(post.id)}>
                        <span className={`${styles.iconDown} material-icons`}>thumb_down</span>
                        <span>{dislikeStatus.count}</span>
                    </div>
                </div>
            </div>
            <p>{post.body}</p>
            <Link to={`posts/${post.id}`} className={styles.readMore}>Читать далее...</Link>
        </div>
    );
};

export default PostComponent;
