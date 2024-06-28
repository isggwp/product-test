'use client'
import { useState } from 'react'
import { useForm, useWatch, Controller } from 'react-hook-form'
import Image from 'next/image'
import Noise from '/public/noise.gif'
import DatePicker from 'react-datepicker'
import { BROKEN_IMAGE, FIX_CODE_IMAGE,  generateUniqueId,  validateImageUrl } from '@/lib/utils'

import 'react-datepicker/dist/react-datepicker.css'

import { dateToISO8601 } from '@/lib/utils'

import { useMediaQuery } from 'usehooks-ts'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'react-hot-toast'
import { FormBook } from '@/types/books'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { RootState } from '@/lib/redux/store'
import { Textarea } from '../ui/textarea'
import { addBook, updateBook, setStreamBooks } from '@/lib/redux/slices/booksSlice'
import { StoredBooks } from '@/types/books'

interface FormMode {
  mode: 'add' | 'edit' | 'view'
  setOpen: (open: boolean) => void
}


const noiseImage = (imageUrl: string) => {
  if(imageUrl === BROKEN_IMAGE) {
    return FIX_CODE_IMAGE
  }
  return Noise
}


export function FormDetails({ mode, setOpen }: FormMode) {
  const readOnlyStatus = mode === 'view'

  const isDesktop = useMediaQuery('(min-width: 768px)')

  const dispatch = useDispatch()
  const streamBooks = useSelector((state: RootState) => state.book.streamBooks)
  const books = useSelector((state: RootState) => state.book.books)
  const [isValidRenderImage, setIsValidRenderImage] = useState(true);

  const addId = generateUniqueId()

  const form = useForm<FormBook>({
    defaultValues: {
      title: '',
      author: '',
      description: '',
      cover: '',
      publicationDate: '',
    },
    mode: 'onChange',
  })


  const watchedImageUrl = useWatch({ control: form.control, name: 'cover' })

  useEffect(() => {
    const checkImageUrl = async () => {
      if (watchedImageUrl) {
        const isValid = await validateImageUrl(watchedImageUrl);
        setIsValidRenderImage(isValid);
      }
    };
    checkImageUrl();
  }, [watchedImageUrl]);

  async function onSubmit(data: FormBook) {
    const isValidImage = await validateImageUrl(data.cover);

    if(!isValidImage) {
      form.setError('cover', {
        type: 'manual',
        message: 'The URL does not point to a valid image',
      });
      return;
    }

    if (isValidImage) {

      const dataPayload: StoredBooks = {
        id: mode === 'add' ? addId : streamBooks.id,
        author: data.author,
        title: data.title,
        description: data.description,
        cover: data.cover,
        publicationDate: dateToISO8601(data?.publicationDate),
        isLocalData: true,
      }

      if (mode === 'add') {
        try {
          dispatch(addBook(dataPayload as StoredBooks))
          toast.success('new book successfully added')
          setOpen(false)
        } catch (error) {
          toast.error('Something went wrong!')
        }
      }

      if (mode === 'edit') {
        try {
          dispatch(updateBook(dataPayload as StoredBooks))
          dispatch(setStreamBooks(Number(dataPayload.id)))
          toast.success('Book successfully updated!')
          setOpen(false)
        } catch (error) {
          toast.error('Something went wrong!')
        }
      }
    }
  }

  useEffect(() => {
    if (mode === 'view' || 'edit') {
      form.reset({
        title: streamBooks.title,
        author: streamBooks.author,
        description: streamBooks.description,
        cover: streamBooks.cover,
        publicationDate: streamBooks.publicationDate,
      })
    }

    if (mode === 'add') {
      form.reset({
        title: '',
        author: '',
        description: '',
        cover: '',
        publicationDate: '',
      })
    }
  }, [mode])


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col space-y-3"
      >
        <div className="flex h-[90%] w-full flex-col overflow-y-auto lg:flex-row">
          <section className="w-full space-y-2 overflow-y-auto lg:w-1/2">
            <FormField
              rules={{
                required: {
                  value: true,
                  message: 'Cover Url is required',
                },
                pattern: {
                  value:
                    /^(https?:\/\/)[\w.-]+(?:\.[\w\.-]+)+(?:[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+)?$/,
                  message: 'Enter a valid secure image URL',
                },
              }}
              control={form.control}
              name="cover"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Url</FormLabel>
                  <FormControl>
                    <Input
                      readOnly={readOnlyStatus}
                      placeholder="ex: https://m.media-amazon.com/images/I/51RcjTKoCFL.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex w-full lg:hidden">
              <section className="flex aspect-[327/499] h-auto w-[50px] flex-col border-2 border-slate-200">
                <div className="relative h-full w-full bg-slate-200">
                  {watchedImageUrl ? (
                    <Image
                      className="left-0 top-0 h-full w-full"
                      src={isValidRenderImage ? watchedImageUrl : noiseImage(watchedImageUrl) }
                      alt="image review"
                      fill
                      objectFit="cover"
                    />
                  ) : null}
                </div>
              </section>

              <div className="w-auto px-3">
                <FormField
                  control={form.control}
                  name="isValidRenderImage"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              rules={{
                required: {
                  value: true,
                  message: 'Title is required',
                },
                maxLength: {
                  value: 50,
                  message: 'maximum characters is 50',
                },
              }}
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      readOnly={readOnlyStatus}
                      placeholder="ex: King of the North"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              rules={{
                required: {
                  value: true,
                  message: 'Author is required',
                },
              }}
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      readOnly={readOnlyStatus}
                      placeholder="ex: Johnwick"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              rules={{
                required: {
                  value: true,
                  message: 'Publication date is required',
                },
              }}
              control={form.control}
              name="publicationDate"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Publication Date</FormLabel>
                  <FormControl className="!w-1/2">
                    <Controller
                      control={form.control}
                      name="publicationDate"
                      render={({ field }) => (
                        <DatePicker
                          className="flex w-full cursor-pointer justify-start border-2 border-solid border-slate-200 px-3 py-1 font-sans text-xs outline-none focus-visible:outline-none"
                          disabled={readOnlyStatus}
                          showIcon
                          calendarIconClassName="text-xs text-slate-100"
                          calendarClassName="flex justify-center"
                          placeholderText="Select date"
                          selected={field.value as any}
                          onChange={field.onChange}
                          maxDate={new Date()}
                        />
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              rules={{
                required: {
                  value: true,
                  message: 'Description is required',
                },
              }}
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="text-xs outline-none focus:border-none focus:outline-none"
                      readOnly={readOnlyStatus}
                      placeholder="ex: Description of book"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pb-0 lg:pb-5"></div>
          </section>

          <div className="hidden w-1/2 flex-row px-4 py-0 lg:flex">
            <div className="w-1/2">
              <section className="flex aspect-[327/499] h-auto w-full flex-col border-2 border-slate-200">
                <div className="relative h-full w-full bg-slate-200">
                  {watchedImageUrl ? (
                    <Image
                      className="left-0 top-0 h-full w-full"
                      src={isValidRenderImage ? watchedImageUrl : noiseImage(watchedImageUrl) }
                      alt="tes"
                      fill
                      objectFit="cover"
                    />
                  ) : null}
                </div>
              </section>
            </div>
            <div className="w-1/2 px-3">
            </div>
          </div>
        </div>

        {/* MOBILE Button */}
        {mode && mode === 'edit' && !isDesktop && (
          <div className="fixed bottom-[3.5rem]  left-0 right-0 bg-white px-4 py-2">
            <Button
              size="sm"
              className="w-full rounded-xl bg-gray-800 tracking-widest hover:bg-gray-700"
              type="submit"
            >
              Submit
            </Button>
          </div>
        )}

        {/* MOBILE Button */}
        {mode && mode === 'add' && !isDesktop && (
          <div className="fixed bottom-[3.5rem]  left-0 right-0 bg-white px-4 py-2">
            <Button
              size="sm"
              className="w-full rounded-xl bg-gray-800 tracking-widest hover:bg-gray-700"
              type="submit"
            >
              Submit
            </Button>
          </div>
        )}

        {mode && mode === 'edit' && isDesktop && (
          <div className="bottom-[3.2rem] mx-auto flex w-full max-w-[1000px] bg-white px-1 py-2 lg:bottom-40">
            <Button
              size="sm"
              className="w-full rounded-xl bg-gray-800 hover:bg-gray-700"
              type="submit"
            >
              Submit
            </Button>
          </div>
        )}

        {mode && mode === 'add' && isDesktop && (
          <div className="bottom-[3.2rem] mx-auto flex w-full max-w-[1000px] bg-white px-1 py-2 lg:bottom-40">
            <Button
              size="sm"
              className="w-full rounded-xl bg-gray-800  hover:bg-gray-700"
              type="submit"
            >
              Submit
            </Button>
          </div>
        )}
      </form>
    </Form>
  )
}
