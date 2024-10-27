import React from "react";
import { Link } from "react-router-dom";
import {PostT} from './RouterApp'
type Props = {
    post:PostT;
}
export default function Post({post}: Props) {
    return (
        <article className="post">
            <Link to={`/post/${post.id}`}>
                <h2>{post.title}</h2>
            </Link>
            <p className="postBody">{
                (post.body).length<=25? post.body :`${(post.body).slice(0,25)}...`}</p>
        </article>
    );
}
