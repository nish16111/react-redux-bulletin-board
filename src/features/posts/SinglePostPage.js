import React from 'react'
import { selectPostById } from "./postsSlice";
import { useSelector } from "react-redux";

import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';
import { useParams } from 'react-router-dom';

const SinglePostPage = () => {

    const { postId } = useParams()
    const post = useSelector((state) => selectPostById(state, Number(postId)))

    if(!post) {
      console.log("Id is: ", postId)
      return(
        <section>
          Post not found!
        </section>
      )
    }

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p className='postCredit'>
        <PostAuthor userId={post.userId}/>
        <TimeAgo timestamp={post.date}/>
      </p>
      <ReactionButtons post={post}/>
    </article>
  )
}

export default SinglePostPage
