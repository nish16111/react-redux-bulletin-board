import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from 'date-fns';

const initialState = {
    posts: [],
    status: 'idle',
    error: 'null',
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{
        postAdded: {
            reducer(state, action){
                state.posts.push(action.payload);
            },
            prepare(title, content, userId){
                return{
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find((post) => post.id === postId)
            if(existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    }
})

export const selectAllPosts = (state) => state.posts.posts;

export const { postAdded, reactionAdded } = postsSlice.actions;

export const postsReducer =  postsSlice.reducer;