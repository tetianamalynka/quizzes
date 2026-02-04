import React, { useContext, useState } from 'react'
import { useHttp } from '../hooks/http.hook'

import { AuthContext } from '../context/AuthContext'

export const AccountLoginPage = () => {

    const { request } = useHttp()

    const [form, setForm] = useState ({
        loginOrEmail: '', password: ''
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    const auth = useContext(AuthContext)

    const loginHandler = async(event) => {

        event.preventDefault()
        
        try {

             const data = await request('/api/v1/auth/login', 'POST', {...form})
             auth.login(data.token, data.userId)

             console.log ('data: ', data)


        } catch (e) {}

    }

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit = {loginHandler}>
                <label htmlFor = 'loginOrEmail' >Input login or email</label>
                <input id = 'loginOrEmail' type='text' name='loginOrEmail' value={form.loginOrEmail} onChange={changeHandler} ></input>

                <label htmlFor = 'password' >Input password</label>
                <input id = 'password' type='password' name='password' value={form.password} onChange={changeHandler} ></input>

                <button>Login</button>

            </form>
        </div>
    )
}
