import { MaterialAddIcon } from './icon'

type FABProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FAB({setOpen}: FABProps ) {
  return (
    <div onClick={() =>setOpen(true)} className="fixed flex lg:hidden bottom-20 right-9 lg:bottom-16 lg:right-24 z-40 h-12 w-12 rounded-full bg-gray-800 shadow-2xl">
      <div className="group flex w-full h-full justify-center items-center cursor-pointer">
        <MaterialAddIcon className='text-white text-xl' />
      </div>
    </div>
  )
}
