import React from 'react'
import { useSelector } from 'react-redux';
import { selectAllPosts } from './postsSlice';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';

const PostsList = () => {

    const posts = useSelector(selectAllPosts);

    const renderedPosts = posts.map((posts) => {
        return(
            <article key={posts.id}>

                <div style={{display: 'flex'}}>
                    <h3>{posts.title}</h3>
                </div>

                <p>{posts.content.substring(0, 100)}</p>
                <p className='postCredit'>
                    <PostAuthor userId={posts.userId}/>
                    <TimeAgo timestamp={posts.date}/>
                </p>
            </article>
        )
    })

    return(
        <section>
            <h2>Posts:</h2>
            {renderedPosts}
        </section>
    )
}

export default PostsList;



