'use client'

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
export default function NameAndRaceForm() {
    const nameRef = useRef<HTMLInputElement | null >(null);
    const vigorRef = useRef<HTMLInputElement | null>(null);
    const dexterityRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();

    const buttonHandler =(event: React.MouseEvent) => {
        event.preventDefault()
        if (!nameRef.current || !vigorRef.current || !dexterityRef.current) {
            return
        }

        const obj = {
            name: nameRef.current.value,
            vigor: parseInt(vigorRef.current.value),
            dexterity: parseInt(dexterityRef.current.value),
        }

        localStorage.setItem('character', JSON.stringify(obj))


        router.push('/weapons_form');
    }
    
    return (
        <div>
        <form>
            <label>Name:</label>
            <input type="text" name="name" ref={nameRef} required />
            <label>Stats:</label>
            <div>
                <label htmlFor="vigor">Vigor</label>
                <input type="number" id="vigor" name="vigor" required min="1" max="100" ref={vigorRef} aria-describedby="vigor-help" />
            </div>
            <div>
                <label htmlFor="dexterity">Vigor</label>
                <input type="number" id="dexterity" name="dexterity" required min="1" max="100" ref={dexterityRef} aria-describedby="dexterity-help" />
            </div>
        </form>
            <button type="submit" onClick={buttonHandler}>Submit</button>
        </div>
    ) 
}