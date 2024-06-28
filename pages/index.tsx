import React, { Fragment, useState, useEffect } from 'react'
import ResponsivePagination from 'react-responsive-pagination'
import { useQuery } from '@tanstack/react-query'
import { fetchProducts, fetchProductsCatagories } from '@/lib/fetcher'
import CardBook from '@/components/common/CardBook'
import SkelHomepage from '@/components/Skeleton/SkelHomepage'
import { useRouter } from 'next/router'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function Home() {
  const router = useRouter()
  const { query, isReady } = router

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (query.page) {
      setCurrentPage(Number(query.page))
    }
  }, [query.page])

  const {
    data: producsData,
    error,
    isLoading,
  } = useQuery<any[], Error>({
    queryKey: ['/products', { query }],
    queryFn: () => fetchProducts(query),
  })

  const {
    data: catagoriesData,
    error: erC,
    isLoading: isLoadingC,
  } = useQuery<any[], Error>({
    queryKey: ['/catagories'],
    queryFn: () => fetchProductsCatagories(),
  })

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    router.push({
      query: { ...query, page, skip: (page - 1) * 5 },
    })
  }

  if (isLoading) return <SkelHomepage />
  if (error) return <div>Error: {error.message}</div>

  if (isReady) {
    return (
      <Fragment>
        <main className="h-auto w-full max-w-[1200px] border-[1px] border-slate-100 px-2 lg:h-screen lg:px-4">
          <div className="flex h-full w-full flex-row lg:gap-2">
            <section className="flex w-full flex-col pb-40 lg:w-full lg:pb-0">
              <section className="flex flex-col items-center justify-between lg:flex-row">
                <h1 className="py-4 font-sans text-xl font-medium text-gray-900 sm:text-xl">
                  Product List
                </h1>

                <div className="flex-col space-x-3 lg:flex lg:flex-row">
                  <Select
                    onValueChange={(e) =>
                      router.push({ query: { ...query, catagories: e } })
                    }
                  >
                    <SelectTrigger className="w-full lg:w-[180px]">
                      <SelectValue placeholder="Select Catagories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {catagoriesData?.map((item: any) => (
                          <SelectItem key={item.id} value={item.slug}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Select
                    onValueChange={(e) =>
                      router.push({ query: { ...query, sort: e } })
                    }
                  >
                    <SelectTrigger className="w-full lg:w-[180px]">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem key="asc" value="asc">
                          Asc
                        </SelectItem>
                        <SelectItem key="desc" value="desc">
                          Desc
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </section>
              <section className="justify-items-between grid-rows-auto grid w-full grid-cols-2 justify-between gap-5 overflow-y-scroll pb-10 sm:grid-cols-3 lg:grid-cols-5 lg:grid-rows-1">
                {producsData?.products?.map((item: any) => (
                  <CardBook key={item.id} data={item} />
                ))}
              </section>

              {/* pagination */}
              <div className="flex w-full justify-center lg:justify-end">
                <ResponsivePagination
                  current={currentPage}
                  total={Math.ceil(producsData?.total / 5)}
                  onPageChange={handlePageChange}
                />
              </div>
            </section>
          </div>
        </main>
      </Fragment>
    )
  }
}
