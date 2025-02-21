import React, { useEffect, useRef } from 'react'
import { Weapon } from '@/Interfaces/Interfaces'
import { isChecked } from '@/app/Utils/utils'

const Cards: React.FC<Weapon> = ({
  id,
  name,
  image,
  inputHandler,
  inputType,
  formType,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null)


  const setCheckedState = (elem: HTMLInputElement) => {
    if (elem) {
        const character = localStorage.getItem('character')
        if (!character) return
        const obj = JSON.parse(character || '{}')
        elem.checked=isChecked(obj[formType], name)
    }
  }

  return (
    <div id={id} className="basis-1/3 cursor-pointer">
      <img src={image} alt={name} />
      <label
        data-id={name}
        data-url={image}
        onClick={(event) => inputHandler(event)}
      >
        <input
          ref={setCheckedState}
          type={inputType}
          checked={inputRef.current?.checked}
          name="choose"
        />
        Choose item
      </label>
    </div>
  )
}

export default Cards
