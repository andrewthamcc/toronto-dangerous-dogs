import { Switch as HeadlessSwitch } from '@headlessui/react'

interface SwitchProps {
  checked: boolean
  id: string
  label: string
  onChange: () => void
  reverse?: boolean
}

export const Switch = ({
  checked,
  id,
  label,
  onChange,
  reverse = false,
}: SwitchProps) => {
  return (
    <div
      className={`flex flex-row items-center gap-2 ${reverse ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
      <HeadlessSwitch
        id={id}
        checked={checked}
        onChange={onChange}
        className={`${
          checked ? 'bg-toronto' : 'bg-gray-200'
        } relative inline-flex h-5 w-9 items-center rounded-full`}
      >
        <span
          className={`${
            checked ? 'translate-x-5' : 'translate-x-1'
          } inline-block h-3 w-3 transform rounded-full bg-white transition`}
        />
      </HeadlessSwitch>
    </div>
  )
}
