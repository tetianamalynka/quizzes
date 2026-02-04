import React, { useCallback, useContext, useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { TestTitle } from '../components/TestsList.js'
import { useNavigate } from 'react-router-dom'

export const HomePage = () => {

    const { request } = useHttp()
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const [ tests, setTests ] = useState([])

    const fetchTests = useCallback ( async () => {
        try {
            const data = await request ("/api/v1/tests", "GET", null, { Authorization: `Bearer ${auth.token}` })

             setTests(Array.isArray(data) ? data : (data.tests ?? []))
        } catch (e) {
            if (e.status === 401 || e.status === 403) {
                auth.logout()
                navigate('/', { replace: true })
                return
            }

            console.log(e)
        }
    }, [auth, request, navigate])

    useEffect(() => {
        fetchTests()
    }, [fetchTests])

    return (
        <div>
            <h1>Home Page</h1>

            {<TestTitle tests = {tests} />}
        </div>
    )
}
