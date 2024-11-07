import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

const AddPostForm = () => {
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')

    const users = useSelector(selectAllUsers)

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChanged = (e) => setContent(e.target.value);
    const onAuthorChanged = (e) => setUserId(e.target.value);

    console.log("UserId is: ", userId)

    const onSavePostClicked = () => {

        if(title && content){
            dispatch(postAdded(title, content, userId))
            setTitle('')
            setContent('')
            console.log("Data Saved..")
        } else{
            console.log("Error Saving data")
        }
    }

    const usersOption = users.map((users) => {
        return(
            <option key={users.id} value={users.id}>
                {users.name}
            </option>
        )
    })

    return(
        <section>
            <h2>Add New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Authors:</label>
                <select
                    id="postAuthor"
                    value={userId}
                    onChange={onAuthorChanged}
                >
                    <option value=""></option>
                    {usersOption}
                </select>
                <label htmlFor="postContent">Post Content:</label>
                <textarea
                    type="text" 
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button 
                    onClick={onSavePostClicked} 
                    type="button"
                >Save Post</button>
            </form>
        </section>
    )
}

export default AddPostForm;