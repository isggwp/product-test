import * as React from 'react'
import { Button } from '@/components/ui/button'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import CardLine from './CardLine'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/redux/store'
import { deleteBook, removeFromFavorites } from '@/lib/redux/slices/booksSlice'

interface FavoritesPropsDialog {
  open: boolean
  setOpen: (open: boolean) => void
}

export function FavoritesListDialog({ open, setOpen  }: FavoritesPropsDialog) {

  const books = useSelector((state: RootState) => state.book.books)
  const favorites = useSelector((state: RootState) => state.book.favorites)

  return (
    <Drawer
      direction="bottom" open={open}  onOpenChange={setOpen}>
        <DrawerContent className='rounded-none h-auto lg:w-full mx-auto lg:h-auto fixed flex flex-col  bg-black/70 backdrop-blur-sm outline-none focus:outline-none focus-visible:outline-none border-none' >
          <section className="relative w-full max-w-[1100px] mx-auto flex gap-x-3 snap-x snap-mandatory overflow-x-auto pb-4">
            {
              books?.map((book) => {
                if(favorites.includes(Number(book.id))) return (
                  <CardLine data={book} />
                )
                return null
              })
            }
          </section>
            <DrawerClose asChild>
              <Button
                size="sm"
                className="w-full max-w-[1100px] mx-auto rounded-xl bg-black text-white hover:bg-gray-700"
                type="button"
              >
                Back
              </Button>
            </DrawerClose>

        </DrawerContent>
    </Drawer>
  )
}
