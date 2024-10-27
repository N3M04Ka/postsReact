import React, { Dispatch, FormEvent, SetStateAction,useContext,useState } from "react";
import { DataContext } from "./context/DataContext";
import { PostT } from "./RouterApp";
export default function NewPosts() {
    let{posts,api,setPosts,navigate} =useContext(DataContext);
    const [postTitle, setPostTitle] = useState<string>("");
    const [postBody, setPostBody] = useState<string>("");
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const id = posts.length ? parseInt(posts[posts.length - 1].id) + 1 : 1;
        const newPost: PostT = { id: id.toString(), title: postTitle, body: postBody };

        try {
            const response = await api.post("/posts", newPost);
            setPosts([...posts, response.data]);
            setPostBody("");
            setPostTitle("");
            navigate("/");
        } catch (err: any) {
            console.error(`Error: ${err.message}`);
        }
    }
    return (
        <main className="NewPost">
            <h2>New Post</h2>
            <form action="" className="newPostForm" onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />
                <label htmlFor="postBody">Body:</label>
                <input
                    type="text"
                    id="postBody"
                    required
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </main>
    );
}
