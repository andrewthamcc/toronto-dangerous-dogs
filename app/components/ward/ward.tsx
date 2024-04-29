import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Dog } from '~/types'

interface WardProps {
  data: Dog[]
  isOpen: boolean
  onClose: () => void
  wardName: string
  wardNumber: string
}

export const Ward = ({
  data,
  isOpen,
  onClose,
  wardName,
  wardNumber,
}: WardProps) => {
  if (!isOpen) return null

  // getWardStats helper

  // chart of attacks by year
  // severity of attacks - total
  // last five years
  // sortation area

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
                <Dialog.Title as="h2" className="text-lg">
                  Ward {wardNumber} {wardName}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm ">blah blah blah</p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
