import { useState, useCallback } from 'react'

export const useHttp = () => {

    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)

    const request = useCallback(async (url, method='GET', body = null, headers = {}) => {

        setLoading(true)

        try {
            if (body && typeof body === 'object') {
                headers = {'Content-Type': 'application/json', ...headers}
                body = JSON.stringify(body)
            }

            const response = await fetch (url, { method, body, headers })

            const data = await response.json()

            if (!response.ok) {
                const err = new Error(data.message || "Something goes wrong.")
                err.status = response.status
                err.data = data
                throw err
            }

            setLoading(false)

            return data
        } catch (e) {
            setLoading(false)

            setError (e.message)

            throw e
        }

    }, [])

    const clearError = useCallback ( () => setError(null), [])

    return { loading, request, error, clearError }
}