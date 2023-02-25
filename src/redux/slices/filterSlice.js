import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    categoryId: 0,
    currentPage: 1,
    sort: { 
        name:'Популярности',
        sortProperty:'rating'},
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
        state.categoryId = action.payload
    },
    setSort(state,action){
        state.sort = action.payload
        
    },
    setCurrentPage(state,action){
      state.currentPage = action.payload
    },
    setFilter(state,action){
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
     
    }

  },
})


export const {setCategoryId, setSort, setCurrentPage, setFilter } = filterSlice.actions

export default filterSlice.reducer