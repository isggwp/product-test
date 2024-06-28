// @ts-ignore

import React, { Fragment } from 'react'
import 'dayjs/locale/id'

import { useQuery } from '@tanstack/react-query'
import useFavoriteHandler from '@/hooks/useFavoritehandler'

import { BookResponseFromAPI } from '@/types/books'
import { fetchProductsDetail } from '@/lib/fetcher'
import { useRouter } from 'next/router'

import SkelBookPreview from '@/components/Skeleton/SkelBookPreview'

import { CarouselCommon } from '@/components/common/CarouselCommon'

interface PropsBookPreview {
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>
  setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function Product() {
  const router = useRouter()

  const { query, isReady } = router
  const { id } = query

  const { isFavorites, handleFavorite } = useFavoriteHandler(Number(id))

  const { data, isLoading } = useQuery<BookResponseFromAPI, Error>({
    queryKey: ['/product-detail', { id }],
    queryFn: () => fetchProductsDetail(Number(id)),
  })

  if (isLoading) return <SkelBookPreview />

  if (isReady) {
    return (
      <div className="mx-auto w-full overflow-y-auto bg-slate-50 px-4 pr-1 sm:max-w-[400px]">
        <CarouselCommon data={data?.images} />
        <p className="mt-4 text-xl">{data.title}</p>
        <p className="mt-2 w-auto text-base font-bold italic text-indigo-900">
          #{data.category}
        </p>
        <p className="mt-1 text-sm font-medium text-gray-800">
          rating: {data.rating}
        </p>
        <p className="mt-5 text-base text-gray-800">{data?.description}</p>

        <p className="ellipsis mt-2 line-clamp-3 text-sm font-bold text-gray-900 lg:text-lg">
          $ {data.price}
        </p>
      </div>
    )
  }
}
