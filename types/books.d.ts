import z from 'zod'

const urlSchema = z.string().url();
type URLString = z.infer<typeof urlSchema>;

  export interface BookResponseFromAPI {
    id: number | string;
    title: string; 
    author: string;
    description: string;
    cover: URLString; 
    publicationDate: string;
  }

  export type FormBook = Omit<BookResponseFromAPI, 'id'>  & {
    isValidRenderImage: number 
  }

  export interface StoredBooks extends BookResponseFromAPI {
    isLocalData?: boolean
  }

  export type ActivePreviewId = number | null