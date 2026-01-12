import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Сторінки що доступні до проходження авторизації

import { MainPage } from './pages/MainPage'
import { RegistrationPage } from './pages/RegistrationPage'
import { AccountLoginPage } from './pages/AccountLoginPage'

// СТорінки які доступні авторизованому користувачу

import { HomePage } from './pages/HomePage'

export const useRoutes = (isAuthentificated) => {
    if (isAuthentificated) {
        return (
            <Routes>
                <Route path = '/home' element = { < HomePage /> } />
                <Route path = '*' element = { < Navigate path = '/home' replace /> } />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path = '/' element = { < MainPage /> } />
            <Route path = '/registration' element = { < RegistrationPage />} />
            <Route path = '/login' element = { < AccountLoginPage /> } />
            <Route path = '*' element = { < Navigate path = '/' replace /> }/>
        </Routes>
    )
}