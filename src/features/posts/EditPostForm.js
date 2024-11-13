import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectPostById, updatePost, deletePost } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';

const EditPostForm = () => {

    const dispatch = useDispatch();
    const { postId } = useParams();
    const navigate = useNavigate();

    const post = useSelector((state) => selectPostById(state, Number(postId)))
    const users = useSelector(selectAllUsers) 

    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.body)
    const[userId, setUserId] = useState(post?.userId)
    const[requestStatus, setRequestStatus] = useState('idle')

    if(!post) {
      return (
        <section>
          <h2>Post Not found!</h2>
        </section>
      )
    }

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(Number(e.target.value))

    const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle'; 

    const onSavePostClicked = () => {
      if(canSave){
        try{
          setRequestStatus('pending')
          dispatch(updatePost({ id: post.id, title: title, body: content, userId, reactions: post.reactions })).unwrap()

          setTitle('')
          setContent('')
          setUserId('')
          navigate(`/post/${postId}`)
        } catch(e) {
          console.log("Failled to save the post: ", e)
        } finally{
          setRequestStatus('idle')
        }
      }
    }

    const userOptions = users.map(user => (
      <option
        key={user.id}
        value={user.id}
      >
        {user.name}
      </option>
    ))

    const onDeletePostClicked = () => {
      try{
        setRequestStatus('pending')
        dispatch(deletePost({ id: post.id })).unwrap()

        setTitle('')
        setContent('')
        setUserId('')
        navigate('/')
      } catch(error) {
        console.log("Failed to delete the post", error)
      } finally {
        setRequestStatus('idle')
      }
    }

  return (
    <section>
      <h2>Edit Post: </h2>

      <form>
        <label htmlFor='postTtitle'>Post Title:</label>
        <input
          type='text'
          id='postTitle'
          value={title}
          onChange={onTitleChanged}
          name='postTitle'
        />

        <label htmlFor='postAuthor'>Post Author: </label>
        <select
          id='postAuthor'
          value={userId}
          onChange={onAuthorChanged}
        >
          <option value=""></option>
          {userOptions}
        </select>

        <label htmlFor='postContent'>Content: </label>
        <textarea 
          id='postContent'
          name='postContent'
          value={content}
          onChange={onContentChanged}
        />

        <button
          type='button'
          onClick={onSavePostClicked}
          disabled={!canSave}
        >
          Save Post
        </button>

        <button className='deleteButton'
          type='button'
          onClick={onDeletePostClicked}
        >
          Delete Post
        </button>

      </form>

    </section>
  )
}

export default EditPostForm