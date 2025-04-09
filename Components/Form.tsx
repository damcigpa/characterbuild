
'use client'
import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchData } from '@/app/Utils/utils'
import Cards from '@/Components/Cards'
import { Weapon } from '@/Interfaces/Interfaces'
import { isChecked } from '@/app/Utils/utils'

interface FormProps {
  formType: string
  inputType: string
}

const Form = ({ formType, inputType }: FormProps) => {
  const [pagerData, setPagerData] = useState<number[]>([])
  const [page, setPage] = useState('1')

  const { data, error, isLoading } = useQuery({
    queryKey: ['weapons', page],
    queryFn: () => fetchData(
      `https://eldenring.fanapis.com/api/${formType}?limit=50&page=${page}`
    ),
  })

  const buttonHandler = async (event: React.MouseEvent) => {
    let id = event.currentTarget.id
    setPage(id)
  }

  const handleInput = (event: React.MouseEvent) => {
    const storage = localStorage.getItem('character')
    const obj = JSON.parse(storage || '{}')
    const name= (event.currentTarget as HTMLElement).dataset.id || ''
    const url = (event.currentTarget as HTMLElement).dataset.url

    if (inputType === 'checkbox') {
      const arr = obj[formType] || []

      const newArr = isChecked(arr, name)
        ? arr.filter((item: { name: string }) => item.name !== name)
        : [...arr, { name, url }]
      obj[formType] = newArr
    } else {
      obj[formType] = [
        {
          name,
          url,
        },
      ]
    }

    localStorage.setItem('character', JSON.stringify(obj))
  }

  useEffect(() => {
    if (pagerData.length === 0) {
      let num = Math.round(data?.total / data?.count)
      const pagers = Array.from({ length: num }, (_, i) => i + 1)
      setPagerData(pagers)
    }
  }, [data])

  if (isLoading) return <div>Fetching posts...</div>
  if (error) return <div>An error occurred: {error.message}</div>

  return (
    <>
      <h1>{formType.toUpperCase()}</h1>
      <div className="flex flex-wrap">
        {data?.data.map((d: Weapon) => {
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
