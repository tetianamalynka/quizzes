export const Test = ({ test }) => {

    if (!test || test.length === 0) {
        return <p>такого тесту не існує.</p>
    }

    return (
        <div>
            <h2>{test.test.title}</h2>
            <p>{test.test.description}</p>
            
            {test.questions.map((question) =>
                <div key={question._id}>
                    {question.question}

                    {question.answers.map((answer) =>
                        <div key={answer._id}>
                            <input type={question.type} name={answer._id}/>
                            <lable htmlFor = {answer._id}>{answer.answer}</lable>
                        </div>
                    )}
                </div>
            )}
        </div>
    )

}