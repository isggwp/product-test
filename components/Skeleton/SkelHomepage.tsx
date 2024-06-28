import React, { Fragment, useId } from 'react'
import { Skeleton } from '../ui/skeleton'

import SkelBookPreview from '@/components/Skeleton/SkelBookPreview'
import ResponsivePagination from 'react-responsive-pagination'
import { MaterialFavorite } from '@/components/common/icon'
import { Button } from '@/components/ui/button'
import { MaterialAddIcon } from '@/components/common/icon'

const fakeArray = Array.from({ length: 5 }, (_, index) => index)

export default function SkelHomepage() {
  const xid = useId()
  return (
    <Fragment>
      <main className="h-auto w-full max-w-[1200px] border-[1px] border-slate-100 px-2 lg:h-screen lg:px-4">
        <div className="flex h-full w-full flex-row lg:gap-2">
          <section className="flex w-full flex-col pb-40 lg:w-full lg:pb-0">
            <section className="flex items-center justify-between">
              <h1 className="py-4 font-sans text-xl font-medium text-gray-900  sm:text-xl">
                Product List
              </h1>
            </section>
            <section className="justify-items-between grid-rows-auto grid w-full grid-cols-2 justify-between gap-5 overflow-y-scroll  pb-10 sm:grid-cols-3 lg:grid-cols-5 lg:grid-rows-1">
              {fakeArray.map(() => (
                <div
                  id={xid}
                  className=" flex aspect-[3/6] h-full w-full flex-col border-2 border-slate-50 bg-white"
                >
                  <Skeleton className="flex h-[70%] w-full animate-pulse bg-slate-200 " />
                  <div className="mt-2 px-2">
                    <Skeleton className=" h-4 w-10/12" />
                    <Skeleton className="mt-2 h-4 w-8/12" />
                    <Skeleton className="mt-4 h-4 w-6/12" />
                  </div>
                </div>
              ))}
            </section>
            <div className="mt-5 flex w-full justify-center lg:justify-end">
              <Skeleton className="h-7 w-8/12 bg-slate-200" />
            </div>
          </section>
        </div>
      </main>
    </Fragment>
  )
}
