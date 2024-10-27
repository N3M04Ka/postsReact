import React, { SetStateAction, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { PostT } from "./RouterApp";
import { useContext } from "react";
import { DataContext } from "./context/DataContext";
export default function EditPosts() {
    let {posts,setPosts,api,navigate}=useContext(DataContext)
    const [editTitle, setEditTitle] = useState<string>("");
    const [editBody, setEditBody] = useState<string>("");
    async function handleEdit(id: string) {
        const updatedPost: PostT = { id, title: editTitle, body: editBody };
        try {
            const response = await api.put(`/posts/${id}`, updatedPost);
            setPosts(posts.map((post:PostT) => (post.id === id ? response.data : post)));
            setEditBody("");
            setEditTitle("");
            navigate("/");
        } catch (err: any) {
            console.error(`Error: ${err.message}`);
        }
    }
    let { id } = useParams();
    let post = posts.find((post:PostT) => post.id.toString() === id);
    useEffect(() => {
        if (post) {
            setEditBody(post.body);
            setEditTitle(post.title);
        }
    }, [posts, setEditBody, setEditTitle]);
    return (
        <>
            <main className="NewPost">
                {editTitle && (
                    <>
                        <h2>Edit Post</h2>
                        <form
                            action=""
                            className="newPostForm"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <label htmlFor="postTitle">Title:</label>
                            <input
                                type="text"
                                id="postTitle"
                                required
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                            <label htmlFor="postBody">Body:</label>
                            <input
                                type="text"
                                id="postBody"
                                required
                                value={editBody}
                                onChange={(e) => setEditBody(e.target.value)}
                            />
                            <button
                                type="submit"
                                onClick={() => handleEdit(post!.id)}
                            >
                                Submit
                            </button>
                        </form>
                    </>
                )}
                {!editTitle && (
                    <>
                        <h2>Post Not Found</h2>
                        <p>Well,that disappointing</p>
                        <p>
                            <Link to="/">Wisit Our HomePage</Link>
                        </p>
                    </>
                )}
            </main>
        </>
    );
}
