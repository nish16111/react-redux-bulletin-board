import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { selectAllPosts, getPostsError, getPostsStatus, fetchPosts } from './postsSlice';
import PostsExcerpt from './PostsExcerpt';

const PostsList = () => {
    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(getPostsStatus)
    const error = useSelector(getPostsError)

    useEffect(() => {
        console.log("postsStatus", postsStatus)
        if(postsStatus === 'idle') {
            console.log("In if condition")
            dispatch(fetchPosts());
        }
    }, [postsStatus, dispatch])

    let content;

    if(postsStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if(postsStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        console.log(orderedPosts)
        content = orderedPosts.map((post) => {
            return(
                <PostsExcerpt key={post.id} post={post}/> 
            )
        })
    } else if(postsStatus === 'failed') {
        content = <p>{error}</p>
    }

    return(
        <section>
            <h2>Posts:</h2>
            {content}
        </section>
    )
}

export default PostsList;

/* When passing the prop from parent to 
child component the prop's key shld be
same. for example in post = {post}
the first post is the key and {post} is
the value (Key shld be same!!!)                      
*/