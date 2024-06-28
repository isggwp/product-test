import { BookResponseFromAPI } from "@/types/books";


export const fetchBookList = async (): Promise<BookResponseFromAPI[]> => {
    try {
      const res = await fetch(`https://my-json-server.typicode.com/cutamar/mock/books`);
      return res.json()
    } catch (error) {
      throw new Error('Network response was error');
    }
};


export const fetchBookDetail = async (id: number): Promise<BookResponseFromAPI> => {
  try {
    const res = await fetch(`https://my-json-server.typicode.com/cutamar/mock/books/${id}`);
    return res.json()
  } catch (error) {
    throw new Error('Network response was error');
  }
};

export const isImageURL = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentType = response.headers.get('content-type');
    return contentType !== null && contentType.startsWith('image');
  } catch (error) {
    console.error('Error fetching the URL:', error);
    return false;
  }
};
