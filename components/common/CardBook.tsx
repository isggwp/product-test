import React from 'react'
import { cn, fixBrokenDavinceImage } from '@/lib/utils'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToFavorites,
  removeFromFavorites,
  setStreamBooks,
} from '@/lib/redux/slices/booksSlice'

import {
  MaterialSymbolsDelete,
  MaterialSymbolsEdit,
  MaterialFavorite,
  MaterialEye,
} from '@/components/common/icon'

import { StoredBooks } from '@/types/books'
import { RootState } from '@/lib/redux/store'

interface CardBookProps {
  data: StoredBooks
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>
  setDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CardBook({
  data,
  setEditOpen,
  setDetailsOpen,
  setDeleteOpen,
  ...props
}: CardBookProps) {
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

  const handleEdit = () => {
    setEditOpen(true)
    dispatch(setStreamBooks(Number(data.id)))
  }

  const handleDetails = () => {
    setDetailsOpen(true)
    dispatch(setStreamBooks(Number(data.id)))
  }

  const handleDelete = () => {
    setDeleteOpen(true)
    dispatch(setStreamBooks(Number(data.id)))
  }


  return (
    <div
      {...props}
      key={data.id}
      onClick={() => dispatch(setStreamBooks(Number(data.id)))}
      className={cn([
        isActivePreview
          ? 'bg-gradient-to-l from-blue-100 to-transparent'
          : 'bg-white',
        'flex aspect-[3/6] h-full w-full cursor-pointer flex-col rounded-md border-[0.5px] border-slate-200 hover:border-slate-300  hover:bg-blue-50',
      ])}
    >
      <section className="flex aspect-[327/499] h-auto w-full flex-col bg-black">
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
      <section className="flex h-[5.6rem] w-full flex-col items-start justify-start space-y-1 border-b-[0.5px] border-slate-200 px-2 pt-2 lg:space-y-2">
        <p className="line-clamp-2 text-[0.9rem] font-normal text-black sm:text-[1rem] lg:text-sm">
          {data?.title}
        </p>
        <p className="ellipsis line-clamp-1 text-[0.9rem] font-normal text-gray-400 sm:text-[1rem] lg:text-sm">
          {data.author}
        </p>
      </section>
      <section className="flex h-8 w-full items-center justify-between space-x-2 px-2">
        <div className="flex w-auto space-x-3 lg:space-x-2">
          <MaterialFavorite
            onClick={handleFavorite}
            className={cn(
              'text-base transition-all duration-300 hover:scale-125 hover:text-red-300',
              isFavorites ? 'text-red-500' : 'text-gray-400',
            )}
          />
          {data.isLocalData && (
            <>
              <MaterialSymbolsEdit
                onClick={handleEdit}
                className="text-sm text-gray-400 hover:text-gray-900"
              />
              <MaterialSymbolsDelete 
              
                onClick={handleDelete}
              className="text-sm text-gray-400 hover:text-red-400" />
            </>
          )}
        </div>

        <MaterialEye
          onClick={handleDetails}
        className="flex lg:hidden text-base text-gray-400 hover:text-gray-900" />
      </section>
    </div>
  )
}
