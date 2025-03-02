import React, { useState, useRef } from 'react'
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
  const [isLoading, setIsLoading] = useState(true)

  const handleImageLoad = () => {
    setIsLoading(false)
  }

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
      {isLoading && (
        <div
          style={{
            width: '200px', 
            height: '400px', 
            backgroundColor: '#ccc', 
            filter: 'blur(8px)', 
            position: 'relative', 
          }}
        >
        </div>
      )}
      <img
        src={image}
        alt={name}
        onLoad={handleImageLoad}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
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
