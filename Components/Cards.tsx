import React from 'react'
import { Weapon } from '@/Interfaces/Interfaces';

const Cards: React.FC<Weapon> = ({ id, name, image, inputHandler }) => {
  return (
    <div id={id} className="basis-1/3 cursor-pointer">
      <img src={image} alt={name} />
      <label data-id={id} onClick={(event) => inputHandler(event)}>
        <input type="radio" data-id={id} name="choose" />
        Choose item
      </label>
    </div>
  )
}

export default Cards;
