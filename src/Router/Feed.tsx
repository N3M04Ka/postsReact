import React from 'react'
import Post from './Post'
import {PostT} from '../App'
type Props = {
    posts:PostT[];
}


export default function Feed({posts}: Props) {
  return (
    <>
        {posts.map(el=>
            <Post key={el.id} post={el}/>
        )}
    </>
  )
}
