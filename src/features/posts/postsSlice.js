import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import axios from "axios";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = createAsyncThunk( 'posts/fetchPosts', async() => {
    const response = await axios.get(POSTS_URL)
    return response.data
} )

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
        },
        extraReducers(builder) {
            builder
                .addCase(fetchPosts.pending, (state, action) => {
                    state.status = 'loading...'
                })

                .addCase(fetchPosts.fulfilled, (state, action) => {
                    state.status = 'succeeded'

                    // Updated the state with posts and add reactions
                    let min = 1;
                    const loadedPosts = action.payload.map((post) => {
                        post.date = sub(new Date(), {minutes: min++}).toISOString();
                        post.reactions = {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    })

                    state.posts = state.posts.concat(loadedPosts);
                })
                
                .addCase(fetchPosts.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message;
                })
        }
    }
})

export const selectAllPosts = (state) => state.posts.posts;

export const { postAdded, reactionAdded } = postsSlice.actions;

export const postsReducer =  postsSlice.reducer;


/*
Async functions with Promises allow Redux thunks to handle async operations (like fetching data) 
smoothly without blocking the rest of the code execution. By combining Promises with async/await, 
async thunks help simplify managing and organizing async code within Redux.
*/

/*
What is a Promise in the Context of async Functions and Thunks?
A Promise is an object that represents an operation (like an API call) that may take some time to 
complete. 

It has three possible states:

Pending: The operation is ongoing, and we don't yet know the result.
Fulfilled: The operation completed successfully, and the result is available.
Rejected: The operation failed, and an error message is available.
 */