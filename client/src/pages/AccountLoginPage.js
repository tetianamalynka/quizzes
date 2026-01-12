import React from 'react'

export const AccountLoginPage = () => {

    const loginHandler = async() => {

        try {

            // const data = await request('/api/v1/auth/login', 'POST', {...form})

        } catch (e) {}

    }

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmin = {loginHandler}>
                <label for = 'emailOrLogin'></label>
                <input></input>
            </form>
        </div>
    )
}
