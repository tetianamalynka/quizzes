import React, { useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useNavigate } from 'react-router-dom'

export const RegistrationPage = () => {
    const { request } = useHttp()

    const navigate = useNavigate()

    const [ form, setForm ] = useState ({
        login: '', email: '', password: ''
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async(event) => {
        event.preventDefault()

        try {

            const data = await request('/api/v1/auth/register', 'POST', {...form})

            if (data) {
                console.log('Register success')
                navigate('/login', { replace: true })
            }

            

        } catch(e) {}
    }

    return (
        <div>
            <h1>Registration Page</h1>

            <form onSubmit = {registerHandler}>
                <label htmlFor = 'login' >Input login</label>
                <input id = 'login' type='text' name='login' value={form.login} onChange={changeHandler} ></input>

                <label htmlFor = 'email'>Input email</label>
                <input id='email' type='text' name='email' value={form.email} onChange={changeHandler} ></input>

                <label htmlFor = 'password' >Input password</label>
                <input id = 'password' type='password' name='password' value={form.password} onChange={changeHandler} ></input>

                <button>Register</button>

            </form>

        </div>
    )
}
