import React from 'react'
import { cn, fixBrokenDavinceImage } from '@/lib/utils'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToFavorites,
  removeFromFavorites,
  setStreamBooks,
} from '@/lib/redux/slices/booksSlice'

import { StoredBooks } from '@/types/books'
import { RootState } from '@/lib/redux/store'

interface CardBookProps {
  data: StoredBooks
}

export default function CardLine({ data, ...props }: CardBookProps) {
  const dispatch = useDispatch()

  const streamBooks = useSelector((state: RootState) => state.book.streamBooks)
  const favorites = useSelector((state: RootState) => state.book.favorites)
  const isActivePreview = streamBooks.id === Number(data.id)
  const isFavorites = favorites.includes(Number(data.id))

  const handleFavorite = () => {
    if (isFavorites) {
      dispatch(removeFromFavorites(Number(data.id)))
    } else {
      dispatch(addToFavorites(Number(data.id)))
    }
  }

  return (
    <div
      {...props}
      key={data.id}
      onClick={() => dispatch(setStreamBooks(Number(data.id)))}
      className="snap-center shrink-0 w-[100px] cursor-pointer h-auto"
    >
      <section className="flex h-auto aspect-[327/499] w-full flex-col bg-black">
        <div className="relative h-full w-full">
          <Image
            className="left-0 top-0 h-full w-full"
            src={fixBrokenDavinceImage(data.cover)}
            alt="book image"
            fill
            objectFit="cover"
          />
        </div>
      </section>
    </div>
  )
}
