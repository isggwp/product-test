import * as React from 'react'

import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'

export function CarouselCommon({ data }: { data: string[] }) {
  console.log('dta', data)
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {data?.map((x, index) => (
          <CarouselItem key={index}>
            <div className="">
              <Card>
                <CardContent className="flex aspect-[327/499] h-auto w-full flex-col bg-black">
                  <div className="relative h-full w-full">
                    <Image
                      className="left-0 top-0 h-full w-full"
                      src={x}
                      alt={x}
                      fill
                      objectFit="cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
