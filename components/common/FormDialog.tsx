import * as React from 'react'

import { useMediaQuery } from 'usehooks-ts'
import { Button } from '@/components/ui/button'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { FormDetails } from './FormDetails'

interface PropsFormDialog {
  open: boolean
  setOpen: (open: boolean) => void
  mode: 'add' | 'edit' | 'view'
}

export function FormDialog({ open, setOpen, mode }: PropsFormDialog) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <Drawer
      direction="bottom" open={open}  onOpenChange={setOpen}>
        <DrawerContent className='w-full lg:w-full lg:h-auto fixed  flex-w right-0 bottom-0 flex bg-white/50 backdrop-blur-sm outline-none focus:outline-none focus-visible:outline-none border-none' >
          <DrawerHeader className="pt-5 lg:pt-0 text-center w-full lg:max-w-[1000px] lg:rounded-tl-3xl lg:rounded-tr-3xl lg:mx-auto lg:w-full flex self-end bg-white lg:-mt-5">
            <DrawerTitle className="text-base lg:py-5 italic">
              {mode === 'view' ? 'Book Details' : `${mode} book`}
            </DrawerTitle>
          </DrawerHeader>
          <section className="h-full lg:h-auto p-0 w-full max-w-[1000px] mx-auto flex self-end bg-white overflow-y-auto px-3">
            <FormDetails setOpen={setOpen} mode={mode} />
          </section>
          <DrawerFooter className="pt-5 lg:pt-0 flex w-full lg:w-full self-end max-w-[1000px] mx-auto bg-white">
            <DrawerClose asChild>
              <Button
                size="sm"
                className="w-full rounded-xl bg-red-500 text-white hover:bg-red-700"
                type="button"
              >
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>

        </DrawerContent>
    </Drawer>
  )
}
