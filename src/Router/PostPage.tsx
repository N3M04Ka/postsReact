import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { PostT } from "./RouterApp";
import { DataContext } from "./context/DataContext";

export default function PostPage() {
    let { posts, api, setPosts, navigate } = useContext(DataContext);
    async function handleDelete(id: string) {
        try {
            await api.delete(`/posts/${id}`);
            const filteredPosts = posts.filter((el:PostT) => el.id !== id);
            setPosts(filteredPosts);
            navigate("/");
        } catch (err: any) {
            console.error(`Error: ${err.message}`);
        }
    }
    let { id } = useParams<{ id: string }>();
    let post = posts.find((post: PostT) => post.id === id);
    return (
        <main className="PostPage">
            <article className="post">
                {post && (
                    <>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                        <Link to={`/edit/${post.id}`}>
                            <button className="editButton">Edit</button>
                        </Link>
                        <button
                            className="deleteButton"
                            onClick={() => handleDelete(post.id)}
                        >
                            deletePost
                        </button>
                    </>
                )}
                {!post && (
                    <>
                        А<h2>Post Not Found</h2>
                        <p>Well,that's disappointing</p>
                        <p>
                            <Link to="/">Visit Our HomePage</Link>
                        </p>
                    </>
                )}
            </article>
        </main>
    );
}
