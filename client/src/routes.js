import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Сторінки що доступні до проходження авторизації

import { MainPage } from './pages/MainPage'
import { RegistrationPage } from './pages/RegistrationPage'
import { AccountLoginPage } from './pages/AccountLoginPage'

// СТорінки які доступні авторизованому користувачу

import { HomePage } from './pages/HomePage'
import { TestByIdPage } from './pages/TestByIdPage'

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path = '/home' element = { < HomePage /> } />
                <Route path = '/test/:testId' element = { < TestByIdPage /> } />
                <Route path = '*' element = { < Navigate to = '/home' replace /> } />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path = '/' element = { < MainPage /> } />
            <Route path = '/registration' element = { < RegistrationPage />} />
            <Route path = '/login' element = { < AccountLoginPage /> } />
            <Route path = '*' element = { < Navigate to = '/' replace /> }/>
        </Routes>
    )
}