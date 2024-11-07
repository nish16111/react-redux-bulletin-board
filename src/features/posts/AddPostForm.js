import React, { useState } from "react";
import { postAdded } from "./postsSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const AddPostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const dispatch = useDispatch()

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChanged = (e) => setContent(e.target.value);
    // console.log("Title is", title)
    // console.log("Content is", content)

    const onSavePostClicked = () => {

        if(title && content){
            dispatch(postAdded({
                id: nanoid(),
                title: title,
                content: content
            }))
            setTitle('')
            setContent('')
            console.log("Data Saved..")
        } else{
            console.log("Error Saving data")
        }
    }

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