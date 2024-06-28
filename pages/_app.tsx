import '@/app/globals.css'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import PublicLayout from '@/components/Layout/PublicLayout'
import NextNProgressClient from '@/components/common/NextNProgressClient'
import { Toaster } from 'react-hot-toast'
import { wrapper, store, persistor } from '@/lib/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { useMediaQuery } from 'usehooks-ts'
import ReactQueryProvider from '@/lib/tanstack/ReactQueryProvider'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return getLayout(
    <ReactQueryProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PublicLayout>
            <NextNProgressClient />
            <Component {...pageProps} />
            <Toaster
              containerClassName={isDesktop ? 'text-sm' : 'text-xs'}
              position="top-center"
            />
          </PublicLayout>
        </PersistGate>
      </Provider>
    </ReactQueryProvider>,
  )
}

export default wrapper.withRedux(MyApp)
