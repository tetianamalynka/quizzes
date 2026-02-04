import { useNavigate, useParams } from "react-router-dom"
import { useHttp } from "../hooks/http.hook"
import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { Test } from "../components/Test"

export const TestByIdPage = () => {
    const { testId } = useParams()
    const { request } = useHttp()
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const [ test, setTest] = useState()

    const fetchTest = useCallback ( async () => {
        try {
            const data = await request (`/api/v1/tests/${testId}`, 'GET', null, { Authorization: `Bearer ${auth.token}`})

            setTest(data)
        } catch (e) {
            if (e.status === 401 || e.status === 403) {
                auth.logout()
                navigate('/', { replace: true })
                return
            }

            console.log(e)
            setTest(null)
        }
    }, [request, testId, auth, navigate])

    useEffect(() => {
        fetchTest()
    }, [fetchTest])

    return (
        <div>
            <h1>Тест №{testId}</h1>

            { <Test test = {test} />}

            <button>Закінчити тест</button>
        </div>
    )
}