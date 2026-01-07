const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../models/User')

const router = Router()

// api/v1/auth/register
router.post('/register', [], async (req, res) => {
    try {

        const {login, email, password} = req.body

        const checkLogin = await User.findOne({ login })
        if (checkLogin) {
            return res.status(400).json({ message: 'This login is already taken, please choose another one.'})
        }

        const checkEmail = await User.findOne({ email })
        if (checkEmail) {
            return res.status(400).json({ message: 'This email is already taken, please choose another one.'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({ login, email, password: hashedPassword })
        await user.save()

        res.status(201).json({ message: 'You have successfully registered.' })

    } catch (e) {
        res.status(500).json({ message: 'Something goes wrong \\ 0 - 0 /. Try again.' })
    }
})

// api/v1/auth/login
router.post('/login', [], async (req, res) => {
    try {

        const { loginOrEmail, password } = req.body

        const checkLogin = await User.findOne({ login: loginOrEmail })
        const checkEmail = await User.findOne({ email: loginOrEmail })

        const user = checkLogin || checkEmail

        if (!user) {
            return res.status(400).json({ message: 'Incorrect login/email or password.'})
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            return res.status(400).json({ message: 'Incorrect login/email or password.'})
        }

        const token = jwt.sign(
            { userId: user.is},
            config.get('jwtsecret'),
            { expiresIn: '1h' }
        )

        res.json({ token, userId: user.id })

    } catch(e) {
        console.log(e.message)
        res.status(500).json({ message: 'Something goes wrong \\ 0 - 0 /. Try again.' })
    }
})

module.exports = router