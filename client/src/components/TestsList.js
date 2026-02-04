import React from "react"
import { Link } from 'react-router-dom'


export const TestTitle = ({ tests }) => {

    if ( !tests || tests.length === 0 ) {
        return <p>Тестів немає</p>
    }

    return (
        <div>
            <h2>Список тестів</h2>
            { tests.map (( test ) => {
                return (
                    < div key={ test._id }>
                        <Link to={ `/test/${test._id}` }>
                            <h3>{ test.title }</h3>
                        </Link>
                        <p>{ test.description }</p>
                    </div>
                )
            })}
        </div>
    )
}