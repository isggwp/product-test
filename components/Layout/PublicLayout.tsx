'use client'

import { Fragment } from 'react'
import { Drawer } from 'vaul'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Fragment>
      <div
        className={`relative mx-auto flex w-full flex-col items-center justify-center bg-white px-0 pt-0  font-sans ${
          process.env.NODE_ENV === 'development' ? 'debug-screens' : undefined
        }`}
      >
        {children}
      </div>
    </Fragment>
  )
}
