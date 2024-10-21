import React, { useEffect, useRef, useState } from "react"
import { IOption } from "./types"

interface ISelect {
  options: IOption[]
  placeholder?: string
  value: string
  onChange: (option: any) => void
}

export const Select: React.FC<ISelect> = ({ options = [ { value: "", label: "" } ], placeholder, value, onChange }) => {
  const [ isOpen, setIsOpen ] = useState(false)
  const [ selectedOption, setSelectedOption ] = useState<IOption | null>(null)
  const selectRef = useRef(null)

  useEffect(() => {
    if (!options) {
      setSelectedOption(null)
    }

    const matchingOption = options?.find((option) => option.value === value)
    setSelectedOption(matchingOption || null)
  }, [ value, options ])

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option: IOption) => {
    setSelectedOption(option)
    setIsOpen(false)
    onChange(option)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div ref={selectRef} className="relative">
      <div className="select h-[20px] overflow-hidden p-[2px_2px_3px_12px]">
        <div className="flex items-center justify-between" onClick={handleToggleDropdown}>
          <p className="line-clamp-1 text-clip">{selectedOption ? selectedOption.label : placeholder}</p>
          <i className="icon-end" />
        </div>
      </div>
      {isOpen && (
        <ul className="select hide-scrollbar absolute left-0 top-0 z-10 max-h-[106px] w-full overflow-y-auto overflow-x-hidden px-[6px] py-[2px]">
          {options.map((option) => (
            <li key={option.value} className={`option px-[6px] py-[4px] ${selectedOption === option ? "active" : ""}`} onClick={() => handleOptionClick(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}