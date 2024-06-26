import { Fragment } from 'react/jsx-runtime'
import { Listbox, Transition } from '@headlessui/react'
import Caret from './caret.svg'

interface SelectProps {
  options: string[]
  selected: string
  onChange: (value: string) => void
}

export const Select = ({ onChange, options, selected }: SelectProps) => {
  return (
    <div>
      <Listbox value={selected} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="relative flex w-full min-w-[80px] cursor-default items-center justify-between gap-2 rounded-lg border-2 bg-white px-4 py-1 shadow-md">
            {selected}
            <img className="w-4" src={Caret} alt="caret down" />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full rounded-md border-2 bg-white py-1 text-sm shadow-lg">
              {options.map((option, i) => (
                <Listbox.Option
                  key={i}
                  className={({ active }) =>
                    `relative select-none px-2 ${
                      active ? 'bg-toronto text-white' : 'text-gray-900'
                    }`
                  }
                  value={option}
                >
                  {option}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
