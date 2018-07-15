const express = require('express')
const bodyParser = require('body-parser')
const logic = require('logic')
const jwt = require('jsonwebtoken')
const jwtValidation = require('./utils/jwt-validation')

const router = express.Router()

const { env: { TOKEN_SECRET, TOKEN_EXP } } = process

const jwtValidator = jwtValidation(TOKEN_SECRET)

const jsonBodyParser = bodyParser.json()

router.post('/users', jsonBodyParser, (req, res) => {
    const { body: { name, surname, email, username, password } } = req
    logic.registerUser(name, surname, email, username, password)
        .then(id => {
            res.status(201)
            res.json({ status: 'OK', data: { id } })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})
router.post('/auth', jsonBodyParser, (req, res) => {
    const { body: { email, password } } = req

    logic.authenticateUser(email, password)
        .then(id => {
            const token = jwt.sign({ id }, TOKEN_SECRET, { expiresIn: TOKEN_EXP })

            res.status(200)
            res.json({ status: 'OK', data: { id, token } })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})
router.get('/users/:userId', jwtValidator, (req, res) => {
    const { params: { userId } } = req

    return logic.retriveUser(userId)
        .then(user => {
            res.status(200)
            res.json({ status: 'OK', data: user })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})
router.patch('/users/:userId', [jwtValidator, jsonBodyParser], (req, res) => {
    const { params: { userId }, body: { email, password, newPassword } } = req

    logic.updatePassword(userId, email, password, newPassword)
        .then(() => {
            res.status(200)
            res.json({ status: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})
router.delete('/users/:userId', [jwtValidator, jsonBodyParser], (req, res) => {
    const { params: { userId }, body: { email, password } } = req
    logic.unregisterUser(userId, email, password)
        .then(() => {
            res.status(200)
            res.json({ status: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})
router.post('/users/:userId/orders',  [jwtValidator, jsonBodyParser], (req, res) => {
    const {  body: { userId, deliveryAdress, creditCard, price, items } } = req
    logic.newOrder(userId, deliveryAdress, creditCard, price, items)
        .then(orderId => {
            res.status(201)
            res.json({ status: 'OK', data: orderId })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})
router.get('/users/:userId/orders', [jwtValidator, jsonBodyParser], (req, res) => {
    const { params: { userId } } = req

    logic.listOrders(userId)
        .then(orders => {
            res.json({ status: 'OK', data: orders })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.get('/:categories', (req, res) => {
    const { params: { categories } } = req

    logic.showItems(categories)
        .then(items => {
            res.status(200)
            res.json({ status: 'OK', data: items })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})
router.get('/users/orders/:itemId', (req, res) => {
    const { params: { itemId } } = req

    logic.showItem(itemId)
        .then(item => {
            res.status(200)
            res.json({ status: 'OK', data: item })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})
router.get('/users/:userId/orders', jwtValidator, (req, res) => {
    const { params: { id } } = req

    logic.listOrdersItems(id)
        .then(note => {
            res.json({ status: 'OK', data: items })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})
// listItemsFromOrder(id, orderId) {

// },

router.delete('/users/:userId/orders/:orderId', jsonBodyParser, (req, res) => {
    const { body: { id, orderId } } = req

    logic.id, orderId(id, orderId)
        .then(() => {
            res.status(200)
            res.json({ status: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

module.exports = router

// router.post('/items', jsonBodyParser, (req, res) => {
//     const { body: { title, image, description, color, category, stock, price } } = req
//     logic.newItem(title, image, description, color, category, stock, price)
//         .then(id => {
//             res.status(201)
//             res.json({ status: 'OK', data: { id } })
//         })
//         .catch(({ message }) => {
//             res.status(400)
//             res.json({ status: 'KO', error: message })
//         })
// })