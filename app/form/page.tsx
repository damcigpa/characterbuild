import React from "react"
export default function Form() {
    return (
        <form>
            <label>Name:</label>
            <input type="text" name="name" required />
            <label>Email:</label>
            <input type="email" name="email" required />
            <button type="submit">Submit</button>
        </form>
    ) 
}