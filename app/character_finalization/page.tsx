'use client'
export default function characterFinalization() {
    const character = localStorage.getItem('character');
    const obj = character ? JSON.parse(character) : {};
    console.log(obj)

}