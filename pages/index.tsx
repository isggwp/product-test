import React, { Fragment, useState, useEffect, useId } from 'react'
import ResponsivePagination from 'react-responsive-pagination'
import { useQuery } from '@tanstack/react-query'
import { fetchBookList } from '@/lib/fetcher'
import { DeleteDialog } from '@/components/common/DeleteDialog'
import { MaterialAddIcon } from '@/components/common/icon'
import { FormDialog } from '@/components/common/FormDialog'
import { Button } from '@/components/ui/button'
import FAB from '@/components/common/FAB'
import CardBook from '@/components/common/CardBook'
import { MaterialFavorite } from '@/components/common/icon/MaterialFavorite'
import { BookResponseFromAPI, StoredBooks } from '@/types/books'
import BookPreview from '@/components/common/BookPreview'
import { combineAndSortData } from '@/lib/utils'

import { useDispatch, useSelector } from 'react-redux'
import { setBooks, setCurrentPage } from '@/lib/redux/slices/booksSlice'
import { RootState } from '@/lib/redux/store'
import { BooksDetailsDialog } from '@/components/common/BooksDetailsDialog'
import { FavoritesListDialog } from '@/components/common/FavoritesListDialog'
import SkelHomepage from '@/components/Skeleton/SkelHomepage'


export default function Home() {
  const xid = useId()
  const dispatch = useDispatch()
  const [hasFetched, setHasFetched] = useState(false)

  const bookState = useSelector((state: RootState) => state.book)
  const { paginatedBooks, books, pageSize, currentPage } = bookState

  const totalPages = Math.ceil(books.length / pageSize)

  const {
    data: apiData,
    error,
    isLoading,
  } = useQuery<BookResponseFromAPI[], Error>({
    queryKey: ['/books'],
    queryFn: () => fetchBookList(),
  })

  useEffect(() => {
    if (apiData && !hasFetched) {
      const combinedData = combineAndSortData(apiData, books)
      dispatch(setBooks(combinedData))
      setHasFetched(true)
    }
  }, [apiData, hasFetched])

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [FavoritesOpen, setFavoritesOpen] = useState(false)

  if (isLoading) return <SkelHomepage />

  if (error) return <div>Error: {error.message}</div>

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
                  onClick={() => setFavoritesOpen(true)}
                  className="h-8 items-center justify-center space-x-2 rounded-full border-[1.7px] border-solid border-gray-600 bg-white px-4 py-1 text-xs text-gray-600 hover:border-red-500 hover:bg-white hover:text-red-500 lg:flex"
                  size="sm"
                >
                  <MaterialFavorite className="mr-2 h-3 w-3" />
                  Favorites
                </Button>

                <Button
                  id="add-user-btn"
                  onClick={() => setCreateOpen(true)}
                  className="h-8 rounded-full bg-black px-4 py-1 text-xs hover:bg-red-950 lg:flex"
                  size="sm"
                >
                  <MaterialAddIcon className="mr-1 h-4 w-4 font-bold" />
                  Add new Book
                </Button>
              </div>
            </section>
            <section className="justify-items-between grid-rows-auto grid w-full grid-cols-2 justify-between gap-5 overflow-y-scroll  pb-10 sm:grid-cols-3 lg:grid-cols-5 lg:grid-rows-1">
              {paginatedBooks?.map((item: StoredBooks) => (
                <CardBook
                  setDeleteOpen={setDeleteOpen}
                  setDetailsOpen={setDetailsOpen}
                  setEditOpen={setEditOpen}
                  data={item}
                />
              ))}
            </section>

            {/* pagination  */}
            <div className="flex w-full justify-center lg:justify-end">
              <ResponsivePagination
                current={currentPage}
                total={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </section>

          <aside className="h-screeen hidden min-h-screen w-4/12 cursor-pointer flex-col border-none pb-4 pt-4 hover:border-slate-500 lg:flex">
            <BookPreview
              setEditOpen={setEditOpen}
              setDeleteOpen={setDeleteOpen}
            />
          </aside>
        </div>

        {/* Form Dialog */}
        <FormDialog open={editOpen} mode="edit" setOpen={setEditOpen} />
        <FormDialog open={createOpen} mode="add" setOpen={setCreateOpen} />

        <BooksDetailsDialog
          open={detailsOpen}
          setOpen={setDetailsOpen}
          setDeleteOpen={setDeleteOpen}
          setEditOpen={setEditOpen}
        />

        <FavoritesListDialog open={FavoritesOpen} setOpen={setFavoritesOpen} />

        {/* Delete Dialog*/}
        <DeleteDialog open={deleteOpen} setOpen={setDeleteOpen} />
        <FAB setOpen={setCreateOpen} />
      </main>
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-[3.2rem] w-full items-center justify-center border-t-[1px] lg:hidden">
        <a className="mx-auto flex h-full w-1/2 items-center justify-center bg-gray-500 font-sans text-sm font-medium text-white">
          Home
        </a>
        <div
          className="mx-auto flex h-full w-1/2 items-center justify-center bg-gray-700 text-sm text-white"
          onClick={() => setFavoritesOpen(true)}
        >
          Favorites
        </div>
      </nav>
    </Fragment>
  )
}
