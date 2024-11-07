import React from 'react'
import { useSelector } from 'react-redux';

const PostsList = () => {

    const posts = useSelector((state) => state.posts);

    const renderedPosts = posts.map((posts) => {
        return(
            <div key={posts.id}>

                <div style={{display: 'flex'}}>
                <span>({posts.id})</span>
                <h3>{posts.title}</h3>
                </div>

                <p>{posts.content.substring(0, 100)}</p>
            </div>
        )
    })

    return(
        <div>
            {renderedPosts}
        </div>
    )
}

export default PostsList;



