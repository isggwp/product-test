
import React, { Fragment } from 'react'
import { Skeleton } from '../ui/skeleton'
import {
    MaterialSymbolsDelete,
    MaterialSymbolsEdit,
    MaterialFavorite,
  } from '@/components/common/icon'

import { cn} from '@/lib/utils'
export default function SkelBookPreview() {
    
  return (
    <Fragment>
    <div className="w-full overflow-y-auto bg-slate-50 px-4 pr-1">
      <Skeleton className="aspect-[327/499] h-auto w-11/12 " />

      {/* Title */}
      <Skeleton className="mt-4 h-5 w-8/12" />
      {/* Author */}
      <Skeleton className="mt-4 h-3 w-4/12" />
      {/* Date */}
      <Skeleton className="mt-4 h-2 w-5/12" />

      {/* Description */}
      <Skeleton className="mt-5 h-5 w-10/12" />
      <Skeleton className="mt-3 h-5 w-10/12" />
      <Skeleton className="mt-3 h-5 w-10/12" />
      <Skeleton className="mt-3 h-5 w-4/12" />

      <section className="relative mt-6 flex h-16 w-full items-center justify-start space-x-2 border-b-[1px] border-slate-200 pr-3">
        <MaterialFavorite
          className={cn(
            'text-2xl text-slate-200 transition-all duration-300 hover:scale-125',
          )}
        />
        <div className="flex w-full flex-row justify-end space-x-2">
          <MaterialSymbolsEdit className="animate-pulse text-xl text-slate-200" />
          <MaterialSymbolsDelete className="animate-pulse text-xl text-slate-200" />
        </div>
      </section>
    </div>
  </Fragment>
    
  )
}
