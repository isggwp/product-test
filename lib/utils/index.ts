import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { text_title, text_description } from "@/lib/utils/fontSize"
import { BookResponseFromAPI, StoredBooks } from '@/types/books';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const combineAndSortData = (apiData: BookResponseFromAPI[], localData: StoredBooks[]) => {
  const localBooksArray = Array.isArray(localData) ? localData : [];
  const idSet = new Set(localBooksArray.map(book => book.id));
  const combinedData = [
    ...localBooksArray,
    ...apiData.filter(book => !idSet.has(book.id))
  ];
  combinedData.sort((a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime());
  return combinedData;
};

export const paginateData = (data: StoredBooks[], pageSize: number) => {
  const pages = [];
  for (let i = 0; i < data.length; i += pageSize) {
    pages.push(data.slice(i, i + pageSize));
  }
  return pages;
};

export const BROKEN_IMAGE = 'https://m.media-amazon.com/images/I/52J0Go2ZCNL._SX329_BO1,204,203,200_.jpg'

export const FIX_CODE_IMAGE = 'https://m.media-amazon.com/images/I/4182WHOHqUL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg'
export const fixBrokenDavinceImage =(url: string)=> {
  if (url === BROKEN_IMAGE) {
    return FIX_CODE_IMAGE
  }

  return url

}

export function generateUniqueId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}




export const dateToISO8601 = (date: any) => {
  if (!date) return '';

  // Jika `date` adalah string atau tipe lain, coba konversi ke objek Date
  const dateObj = (typeof date === 'string' || typeof date === 'number') ? new Date(date) : date;

  // Pastikan `dateObj` adalah objek Date dan bukan `Invalid Date`
  if (dateObj instanceof Date && !isNaN(dateObj.getTime())) {
    return dateObj.toISOString();
  } else {
    return '';
  }
};


export const validateImageUrl = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image/')) {
      throw new Error('URL does not point to a valid image');
    }

    // Create an image element to verify it can be rendered
    const img = new Image();
    img.src = url;
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    return true;
  } catch (error) {
    return false;
  }
};

export { text_title, text_description }