import { Fragment } from 'react'
import { RadioGroup } from '@headlessui/react'

interface ToggleGroupProps {
  id?: string
  onChange: (value: string) => void
  options: string[]
  selected: string
}

export const ToggleGroup = ({
  id,
  onChange,
  options,
  selected,
}: ToggleGroupProps) => {
  return (
    <RadioGroup
      id={id}
      className="flex"
      value={selected}
      onChange={(value) => onChange(value)}
    >
      {options.map((option, i) => (
        <Fragment key={option}>
          <RadioGroup.Label className="sr-only">{option}</RadioGroup.Label>
          <RadioGroup.Option value={option}>
            {({ checked }) => (
              <button
                className={`border-2 px-2 py-1 text-sm capitalize ${checked ? 'bg-toronto font-semibold text-white' : ''} ${i === 0 ? 'rounded-l-md' : 'border-l-0'} ${i === options.length - 1 ? 'rounded-r-md' : ''}`}
              >
                {option}
              </button>
            )}
          </RadioGroup.Option>
        </Fragment>
      ))}
    </RadioGroup>
  )
}
