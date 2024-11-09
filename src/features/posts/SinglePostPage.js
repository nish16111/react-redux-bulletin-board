import React from 'react'
import { selectPostById } from "./postsSlice";
import { useSelector } from "react-redux";

import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';

const SinglePostPage = () => {

    const post = useSelector((state) => selectPostById(state, postId))

  return (
    <div>
      
    </div>
  )
}

export default SinglePostPage
