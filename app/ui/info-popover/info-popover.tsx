import { Fragment, PropsWithChildren } from 'react'
import { Popover, Transition } from '@headlessui/react'

export default function InfoPopover({ children }: PropsWithChildren) {
  return (
    <Popover className="relative">
      {() => (
        <>
          <Popover.Button className="flex items-center fill-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path d="M9 18A9 9 0 1 1 9 0a9 9 0 0 1 0 18zm-1.02-6.348V13.5h1.884v-1.848H7.98zm-1.932-3.96h1.764c0-.216.024-.418.072-.606.048-.188.122-.352.222-.492s.228-.252.384-.336c.156-.084.342-.126.558-.126.32 0 .57.088.75.264.18.176.27.448.27.816a.983.983 0 0 1-.114.54 1.61 1.61 0 0 1-.33.396c-.136.12-.284.24-.444.36a3.02 3.02 0 0 0-.456.426 2.48 2.48 0 0 0-.378.594c-.108.232-.174.52-.198.864v.54h1.62v-.456c.032-.24.11-.44.234-.6.124-.16.266-.302.426-.426.16-.124.33-.248.51-.372s.344-.274.492-.45c.148-.176.272-.388.372-.636.1-.248.15-.564.15-.948a2.154 2.154 0 0 0-.648-1.5 2.763 2.763 0 0 0-.918-.582c-.38-.156-.854-.234-1.422-.234-.44 0-.838.074-1.194.222a2.65 2.65 0 0 0-.912.618 2.818 2.818 0 0 0-.588.936 3.43 3.43 0 0 0-.222 1.188z" />
            </svg>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 w-screen max-w-md">
              <div className="overflow-hidden rounded-lg bg-white px-6 py-4 shadow-2xl">
                <div className="relative bg-white text-sm">{children}</div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
