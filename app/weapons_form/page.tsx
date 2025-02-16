// pages/stats.js
'use client'
import React, { useState, useEffect } from 'react'
import { fetchData } from '../Utils/utils'
import Cards from '@/Components/Cards';
import { Weapon } from '@/Interfaces/Interfaces';

export default function StatsForm() {
  const [data, setData] = useState<Weapon[]>([]);
  const [pagerData, setPagerData] = useState<number[]>([]);

  const buttonHandler = async (event: React.MouseEvent) => {
    let id=event.currentTarget.id;
    const data = await fetchData(
      `https://eldenring.fanapis.com/api/weapons?limit=50&page=${id}`
    )
    setData(data.data)
  }

  const handleInput = (event: React.MouseEvent) => {
    const storage = localStorage.getItem('character');
    const obj = JSON.parse(storage || '{}');
    obj.weapon = (event.currentTarget as HTMLElement).dataset.id;
    localStorage.setItem('character', JSON.stringify(obj));
  }

  const setWeaponsData = async () => {
    const data = await fetchData('https://eldenring.fanapis.com/api/weapons?limit=50');
    let num = Math.ceil(data.total / data.count)
    setData(data.data)
    const pagers = Array.from({ length: num }, (_, i) => i + 1)
    setPagerData(pagers);//+
  }

  useEffect(() => {
    setWeaponsData();
  }, []);
 
  return (
    <>
      <h1>Weapons</h1>
      <div className="flex flex-wrap">
        {data.map((d) => {
          return <Cards key={d.id} id={d.id} name={d.name} image={d.image} inputHandler={handleInput} />
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
