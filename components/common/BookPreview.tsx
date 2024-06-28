import React, { Fragment } from 'react'
import Image from 'next/image'

import {
  MaterialSymbolsDelete,
  MaterialSymbolsEdit,
  MaterialFavorite,
} from '@/components/common/icon'

import { cn, fixBrokenDavinceImage } from '@/lib/utils'
import { useSelector, useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import 'dayjs/locale/id'

import { useQuery } from '@tanstack/react-query'
import useFavoriteHandler from '@/hooks/useFavoritehandler'

import { BookResponseFromAPI } from '@/types/books'
import { fetchBookDetail } from '@/lib/fetcher'

import { RootState } from '@/lib/redux/store'
import { Skeleton } from '../ui/skeleton'
import { deleteBook, setStreamBooks } from '@/lib/redux/slices/booksSlice'
import SkelBookPreview from '../Skeleton/SkelBookPreview'

interface PropsBookPreview {
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>
  setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function BookPreview({
  setEditOpen,
  setDeleteOpen,
}: PropsBookPreview) {
  const dispatch = useDispatch()

  const streamBooks = useSelector((state: RootState) => state.book.streamBooks)

  const { id, isLocalData } = streamBooks
  const { isFavorites, handleFavorite } = useFavoriteHandler(Number(id))

  const { data, isLoading } = useQuery<BookResponseFromAPI, Error>({
    queryKey: ['/book-detail', { id }],
    queryFn: () => fetchBookDetail(Number(id)),
    enabled: !isLocalData,
  })

  const handleEdit = () => {
    setEditOpen(true)
    dispatch(setStreamBooks(Number(streamBooks.id)))
  }

  const handleDelete = () => {
    setDeleteOpen(true)
    dispatch(deleteBook(Number(streamBooks.id)))
  }

  if (isLoading) return <SkelBookPreview />

  return (
    <div className="w-full overflow-y-auto  bg-slate-50 px-4 pr-1">
      <section className="flex aspect-[327/499] h-auto w-8/12 flex-col bg-blue-300 lg:w-11/12">
        <div className="relative h-full w-full">
          <Image
            className="left-0 top-0 h-full w-full"
            src={
              isLocalData
                ? streamBooks.cover
                : fixBrokenDavinceImage(data?.cover as string)
            }
            alt={data?.title as string}
            fill
            objectFit="cover"
          />
        </div>
      </section>
      <p className="mt-4 text-xl">
        {isLocalData ? streamBooks.title : (data?.title as string)}
      </p>
      <p className="text-base text-gray-400">
        {isLocalData ? streamBooks.author : data?.author}
      </p>
      <p className="mt-1 text-sm text-gray-800">
        {isLocalData
          ? dayjs(streamBooks.publicationDate).format('YYYY-MMMM-DD')
          : dayjs(data?.publicationDate).format('YYYY-MMMM-DD')}
      </p>
      <p className="mt-5 text-base text-gray-800">
        {isLocalData ? streamBooks.description : data?.description}
      </p>

      <section className="relative mt-6 flex h-16 w-full items-center justify-start space-x-2 border-b-[1px] border-slate-200 pr-3">
        <MaterialFavorite
          onClick={handleFavorite}
          className={cn(
            'text-2xl transition-all duration-300 hover:scale-125 hover:text-red-300',
            isFavorites ? 'text-red-500' : 'text-gray-400',
          )}
        />

        <div className="flex w-full flex-row justify-end space-x-2">
          {isLocalData && (
            <>
              <MaterialSymbolsEdit
                onClick={handleEdit}
                className="text-xl text-gray-400 hover:text-gray-900"
              />
              <MaterialSymbolsDelete
                onClick={handleDelete}
                className="text-xl text-gray-400 hover:text-red-400"
              />
            </>
          )}
        </div>
      </section>
    </div>
  )
}
