import { createSlice } from "@reduxjs/toolkit";


const initialState = [
    {id: '0', name: 'Nishant Sirwani'},
    {id: '1', name: 'Aman Shah'},
    {id: '2', name:'Parth Soni'}
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{}
})

export const selectAllUsers = (state) => state.users;
export const usersReducer = usersSlice.reducer;