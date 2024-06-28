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
import Link from 'next/link'

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
  return (
    <Link {...props} key={data.id} href={`/product/${data.id}`}>
      <div
        className={cn([
          'flex aspect-[3/6] h-full w-full cursor-pointer flex-col rounded-md border-[0.5px] border-slate-200 bg-white hover:border-slate-300  hover:bg-blue-50',
        ])}
      >
        <section className="flex aspect-[327/499] h-auto w-full flex-col bg-black">
          <div className="relative h-full w-full">
            <Image
              className="left-0 top-0 h-full w-full"
              src={data.thumbnail}
              alt="book image"
              fill
              objectFit="cover"
            />
          </div>
        </section>
        <section className="flex h-[8rem] w-full flex-col items-start justify-start space-y-1 border-b-[0.5px] border-slate-200 px-2 pt-2 lg:space-y-2">
          <p className="line-clamp-1 text-[0.9rem] font-normal text-black sm:text-[1rem] lg:text-sm">
            {data?.title}
          </p>
          <p className="ellipsis line-clamp-2 text-[0.9rem] font-normal text-gray-400 sm:text-[1rem] lg:text-sm">
            {data.description}
          </p>
          <p className="ellipsis line-clamp-3 text-[0.9rem] font-bold text-gray-900 sm:text-[1rem] lg:text-sm">
            $ {data.price}
          </p>
        </section>
      </div>
    </Link>
  )
}
