// pages/stats.js
'use client'
import React, { useState, useEffect} from 'react'
import { fetchData } from '@/app/Utils/utils'
import Cards from '@/Components/Cards'
import { Weapon, WeaponId } from '@/Interfaces/Interfaces'
import { isChecked } from '@/app/Utils/utils'

interface FormProps {
  formType: string
  inputType: string
}

const Form = ({ formType, inputType }: FormProps) => {
  const [data, setData] = useState<Weapon[]>([])
  const [pagerData, setPagerData] = useState<number[]>([])

  const buttonHandler = async (event: React.MouseEvent) => {
    let id = event.currentTarget.id
    const data = await fetchData(
      `https://eldenring.fanapis.com/api/${formType}?limit=50&page=${id}`
    )
    setData(data.data)
  }

  const handleInput = (event: React.MouseEvent) => {
    const storage = localStorage.getItem('character')
    const obj = JSON.parse(storage || '{}')
    const id = (event.currentTarget as HTMLElement).dataset.id || ''
    const url = (event.currentTarget as HTMLElement).dataset.url

    if (inputType === 'checkbox') {
      const arr = obj[formType] || []

      const newArr = isChecked(arr, id)
        ? arr.filter((item: {id: string}) => item.id !== id)
        : [...arr, { id, url }]
      obj[formType] = newArr
    } else {
      obj[formType] = [{
        id,
        url,
      }];
    }

    localStorage.setItem('character', JSON.stringify(obj))
  }

  const setWeaponsData = async () => {
    const data = await fetchData(
      `https://eldenring.fanapis.com/api/${formType}?limit=50`
    )
    let num = Math.ceil(data.total / data.count)
    setData(data.data)
    const pagers = Array.from({ length: num }, (_, i) => i + 1)
    setPagerData(pagers)
  }

  useEffect(() => {
    setWeaponsData()
  }, [])

  return (
    <>
      <h1>{formType.toUpperCase()}</h1>
      <div className="flex flex-wrap">
        {data.map((d) => {
          return (
            <Cards
              formType={formType}
              key={d.id}
              id={d.id}
              name={d.name}
              image={d.image}
              inputType={inputType}
              inputHandler={handleInput}
            />
          )
        })}
      </div>
      {pagerData.map((p) => {
        return (
          <button key={p} id={p.toString()} onClick={buttonHandler}>
            {p}
          </button>
        )
      })}
    </>
  )
}

export default Form
