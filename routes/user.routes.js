const { Router } = require('express')

const User = require('../models/User')
const auth = require('../middleware/auth.middleware')

const router = Router()

// PATCH /api/v1/users/:userIdChange/role/:roleName
// Якщо користувач суперадмін, то він може змінити роль іншому користувачу на іншу існуючу роль
router.patch('/:userIdChange/role/:roleName', auth, async (req, res) => {
    try {  

        const roles = ['user', 'admin', 'superAdmin']

        const userId = req.user.userId
        const user = await User.findById(userId)

        if (!user) {
            return res.status(401).json({ message: 'User not found.' })
        }

        if (user.role != 'superAdmin') {
            return res.status(403).json({ message: 'Access denied.' })
        }

        const { roleName, userIdChange } = req.params

        if (!roles.includes(roleName)){
            return res.status(400).json({ message: `Role ${roleName} does not exist.`})
        }

        const userChange = await User.findById(userIdChange)

        if (!userChange) {
            return res.status(404).json({ message: 'User to change not found.' })
        }
        
        if (roleName == userChange.role) {
            return res.status(409).json({ message: `User has already role ${roleName}.`})
        }

        userChange.role = roleName

        await userChange.save()

        res.status(200).json({ message: `For user ${userChange.login}, role has been changed to ${roleName}`})

    } catch (e) {
        console.error('PATCH USER ROLE ERROR: ', e.message)
        res.status(500).json({ message: 'Something goes wrong \\ 0 - 0 /. Try again.1' })
    }
})


module.exports = router