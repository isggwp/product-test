import React, { Fragment, useId } from 'react'
import { Skeleton } from '../ui/skeleton'

import SkelBookPreview from '@/components/Skeleton/SkelBookPreview'
import ResponsivePagination from 'react-responsive-pagination'
import {
    MaterialFavorite,
  } from '@/components/common/icon'
import { Button } from '@/components/ui/button'
import { MaterialAddIcon } from '@/components/common/icon'

const fakeArray = Array.from({ length: 5 }, (_, index) => index)

export default function SkelHomepage() {

  const xid = useId()
  return (
    <Fragment>
        <main className="h-auto w-full max-w-[1200px] border-[1px] border-slate-100 px-2 lg:h-screen lg:px-4">
          <div className="flex h-full w-full flex-row lg:gap-2">
            <section className="flex w-full flex-col pb-40 lg:w-8/12 lg:pb-0">
              <section className="flex items-center justify-between">
                <h1 className="py-4 font-sans text-xl font-medium text-gray-900  sm:text-xl">
                  Top Seller Books
                </h1>

                <div className="hidden flex-row space-x-3 lg:flex">
                  <Button
                    id="add-user-btn"
                    className="h-8 items-center justify-center space-x-2 rounded-full border-[1.7px] border-solid border-gray-600 bg-white px-4 py-1 text-xs text-gray-600 hover:border-red-500 hover:bg-white hover:text-red-500 lg:flex"
                    size="sm"
                  >
                    <MaterialFavorite className="mr-2 h-3 w-3" />
                    Favorites
                  </Button>

                  <Button
                    id="add-user-btn"
                    className="h-8 rounded-full bg-black px-4 py-1 text-xs hover:bg-red-950 lg:flex"
                    size="sm"
                  >
                    <MaterialAddIcon className="mr-1 h-4 w-4 font-bold" />
                    Add new Book
                  </Button>
                </div>
              </section>
              <section className="justify-items-between grid-rows-auto grid w-full grid-cols-2 justify-between gap-5 overflow-y-scroll  pb-10 sm:grid-cols-3 lg:grid-cols-5 lg:grid-rows-1">
                {fakeArray.map(() => (
                  <div
                    id={xid}
                    className=" flex aspect-[3/7.2] h-full w-full flex-col border-2 border-slate-50 bg-white"
                  >
                    <Skeleton className="flex h-[63%] w-full animate-pulse bg-slate-200 " />
                    <div className="mt-2 px-2">
                      <Skeleton className=" h-4 w-10/12" />
                      <Skeleton className="mt-2 h-4 w-8/12" />

                      <Skeleton className="mt-4 h-4 w-8" />
                    </div>
                  </div>
                ))}
              </section>
              <div className="flex w-full justify-center lg:justify-end">
                <ResponsivePagination
                  current={1}
                  total={4}
                  onPageChange={() => null}
                />
              </div>
            </section>

            <aside className="h-screeen hidden min-h-screen w-4/12 cursor-pointer flex-col border-none pb-4 pt-4 hover:border-slate-500 lg:flex">
              <SkelBookPreview />
            </aside>
          </div>
        </main>
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-[3.2rem] w-full items-center justify-center border-t-[1px] lg:hidden">
          <a className="mx-auto flex h-full w-1/2 items-center justify-center bg-gray-500 font-sans text-sm font-medium text-white">
            Home
          </a>
          <div className="mx-auto flex h-full w-1/2 items-center justify-center bg-gray-700 text-sm text-white">
            Favorites
          </div>
        </nav>
      </Fragment>

  )
}
