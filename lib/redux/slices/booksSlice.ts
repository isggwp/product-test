// booksSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StoredBooks } from '@/types/books'
import { paginateData } from '@/lib/utils'
import { object } from 'zod'

type ActivePreviewId = number | null

export interface BooksState {
  books: StoredBooks[]
  paginatedBooks: StoredBooks[]
  streamBooks: StoredBooks
  currentPage: number
  pageSize: number
  favorites: number[]
  activePreviewId: ActivePreviewId
}

const initialState: BooksState = {
  books: [],
  streamBooks: {
    id: 0,
    title: '',
    author: '',
    description: '',
    cover: '',
    publicationDate: '',
  },
  paginatedBooks: [],
  currentPage: 1,
  pageSize: 5,
  favorites: [],
  activePreviewId: null,
}

const booksSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setStreamBooks: (state, action: PayloadAction<number>) => {
      const foundBook = state.books.find(book => book.id === action.payload)
      if(foundBook){
        state.streamBooks = foundBook
      } 
    },
    setActivePreviewId: (state, action: PayloadAction<number | null>) => {
      state.activePreviewId = action.payload
    },
    
    editBooks: (state, action: PayloadAction<StoredBooks>) => {
      const index = state.books.findIndex(
        (item) => item.id === action.payload.id,
      )
      if (index !== -1) {
        state.books[index] = action.payload
      }
    },
    addToFavorites: (state, action: PayloadAction<number>) => {
      state.favorites.push(action.payload)
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(
        (item) => item !== action.payload,
      )
    },
    setBooks: (state, action: PayloadAction<StoredBooks[]>) => {
      state.books = action.payload;
      const paginated = paginateData(state.books, state.pageSize);
      state.paginatedBooks = paginated[state.currentPage - 1] || [];
      if(state.streamBooks.id === 0){
        state.streamBooks = state.paginatedBooks[0]
      }
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
      const paginated = paginateData(state.books, state.pageSize);
      state.paginatedBooks = paginated[state.currentPage - 1] || [];
    },
    addBook: (state, action: PayloadAction<StoredBooks>) => {
      state.books.push(action.payload);
      state.books.sort((a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime());
      const paginated = paginateData(state.books, state.pageSize);
      state.paginatedBooks = paginated[state.currentPage - 1] || [];
    },
    updateBook: (state, action: PayloadAction<StoredBooks>) => {
      const index = state.books.findIndex(book => book.id === action.payload.id);
      if (index !== -1) {
        state.books[index] = action.payload;
        state.books.sort((a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime());
        const paginated = paginateData(state.books, state.pageSize);
        state.paginatedBooks = paginated[state.currentPage - 1] || [];
      }
    },
    deleteBook: (state, action: PayloadAction<number>) => {
      state.books = state.books.filter(book => book.id !== action.payload);
      state.books.sort((a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime());
      const paginated = paginateData(state.books, state.pageSize);
      // Adjust currentPage if it exceeds total pages after deletion
      const totalPages = paginated.length;
      if (state.currentPage > totalPages) {
        state.currentPage = totalPages;
      }
      state.paginatedBooks = paginated[state.currentPage - 1] || [];
      setStreamBooks(Number(state.paginatedBooks[0].id))

    },
  },
})

export const {
  setBooks,
  setStreamBooks,
  addBook,
  editBooks,
  deleteBook,
  updateBook,
  setCurrentPage,
  setActivePreviewId,
  addToFavorites,
  removeFromFavorites,
} = booksSlice.actions

export const booksReducer = booksSlice.reducer
