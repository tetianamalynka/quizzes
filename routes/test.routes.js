const { Router } = require('express')

const auth = require('../middleware/auth.middleware')

const router = Router()

// Потрібні моделі
const Test = require('../models/Test')
const Question = require('../models/Question')
const Answer = require('../models/Answer')

const User = require('../models/User')

// POST /api/v1/tests/
// Створюємо тест з запитаннями та відповідями
router.post('/', auth, async (req, res) => {
    try {

        const { title, description, questions} = req.body
        
        const userId = req.user.userId

        if ( !title || !description || !questions ) {
            return res.status(400).json ({ message: 'Invalid data.' })
        }

        const test = new Test ({ title, description, userId})
        await test.save()

        for (const q of questions) {
            const question = new Question ({ testId: test._id, question: q.question, type: q.type, points: q.points })
            await question.save()

            const answers = q.answers

            if (!answers) {
                return res.status(400).json ({ message: 'Invalid data.' })
            }

            for (const a of answers) {
                const answer = new Answer ({ questionId: question._id, answer: a.answer, correct: a.correct})
                await answer.save()
            }
        }

        res.status(201).json({ message: 'Test has been created.' })

    } catch (e) {
        console.error('TEST CREATE ERROR:', e.message)
        res.status(500).json({ message: 'Something goes wrong \\ 0 - 0 /. Try again.' })
    }
})

// GET /api/v1/tests/
// Виводимо список тестів (де isAcrive == true)
router.get('/', auth, async (req, res) => {
    try {
    
        const tests = await Test.find({ isActive: true })

        res.json(tests)

    } catch (e) {
        console.error('TEST GET ERROR:', e.message)
        res.status(500).json({ message: 'Something goes wrong \\ 0 - 0 /. Try again.' })
    }
})

// GET /api/v1/tests/deactivated
// Виводимо список тестів (де isAcrive == false)(доступний тільки User.role == admin)
router.get('/deactivated', auth, async (req, res) => {
    try {

        const userId = req.user.userId
        const user = await User.findById(userId)

        if (user.role != 'admin' && user.role != 'superAdmin') {
            return res.status(403).json({ message: 'Access denied.' })
        }
    
        const tests = await Test.find({ isActive: false })

        res.json(tests)

    } catch (e) {
        res.status(500).json({ message: 'Something goes wrong \\ 0 - 0 /. Try again.' })
    }
})

// GET /api/v1/tests/user/:userId
// Виводимо список тестів створених певним користувачем
router.get('/user/:userId', auth, async (req, res) => {

    try {

        const { userId } = req.params

        const tests = await Test.find({ userId , isActive: true})

        res.json(tests)

    } catch (e) {
        console.error('TEST BY USER GET ERROR:', e.message)
        res.status(500).json({ message: 'Something goes wrong \\ 0 - 0 /. Try again.' })
    }
})

// GET /api/v1/tests/:testId
// Виводимо тест по id та його питання і відповіді
router.get('/:testId', auth, async (req, res) => {
    try {

        const { testId } = req.params

        const test = await Test.findById( testId )

        if (!test) {
            return res.status(400).json({ message: 'Test not found.' })
        }

        const questionsAndAnswers = []

        const questions = await Question.find( { testId })

        for (const q of questions) {
            const answers = await Answer.find({ questionId: q._id })

            questionsAndAnswers.push({ 
                _id: q._id, 
                question: q.question,
                type: q.type,
                points: q.points,
                answers: answers
            })
        }

        res.json ({ test, questions: questionsAndAnswers })

    } catch (e) {
        console.error('TEST BY ID GET ERROR:', e.message)
        res.status(500).json({ message: 'Something goes wrong \\ 0 - 0 /. Try again.1' })
    }
})

// PATCH /api/v1/tests/:testId/deactivate
// Типу видалення тесту, деактивація, звичайному користувачу стає недоступним
router.patch('/:testId/deactivate', auth, async (req, res) => {
    try {
        
        const userId = req.user.userId
        const user = await User.findById(userId)
        const { testId } = req.params

        const test = await Test.findById (testId)

        if (!test) {
            return res.status(404).json({ message: 'Test not found.'})
        }

        if ((userId != test.userId) && user.role != 'admin' && user.role != 'superAdmin') {
            return res.status(403).json({ message: 'You cannot delete this test.' })
        }

        test.isActive = false
        test.closedAt = Date.now()

        await test.save()

        res.json({ message: 'Test has been deleted.'})

    } catch (e) {
        console.error('TEST BY ID DELETE ERROR:', e.message)
        res.status(500).json({ message: 'Something goes wrong \\ 0 - 0 /. Try again.2' })
    }
})

// PATCH /api/v1/tests/:id
// Поки що обійдемося без цього функціоналу

module.exports = router

