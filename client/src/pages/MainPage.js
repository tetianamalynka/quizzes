import React from 'react'
import { NavLink } from 'react-router-dom'

export const MainPage = () => {
    return (
        <div>
            <h1>Hello! You are in MainPage</h1>
            <p> Some info will be right hear later</p>
            <button><NavLink to = "/registration">Register</NavLink></button>
            <button><NavLink to = "/login">Login</NavLink></button>
        </div>
    )
}
