'use strict'

require('dotenv').config()

const { mongoose, models: { Item, Order, User } } = require('.')
const expect = require('expect')

const { env: { DB_URL } } = process


describe('models (User)', () => {

    before(() => mongoose.connect(DB_URL))

    beforeEach(() => Promise.all([User.remove(), Item.deleteMany(), Order.deleteMany()]))



    describe('create user)', () => {
        it('it should succeed', () => {
            logic.registerUser('John', 'Doe', 'johndoe@mail.com', 'JD', '123')

            const user = new User({ username: 'JD', name: 'John', surname: 'Doe', email: 'johndoe@mail.com', password: '123' })
            const item = new Item({ title: 'Super sofa', image: 'url', description: 'lorem ipsum', color: 'blue', caregory: 'sofa', stock: 1, price: 100 })
            const order = new Order({
                deliveryAdress: 'Roc boronat', creditCard: 1234567890,
                date: "10/06/18"
            })

            user.orders.push(order)

            user.orders[0].items.push(item)

            return user.save()
                .then(user => {
                    expect(user).toBeDefined()
                    expect(user.name).toBe('John')
                    expect(user.password).toBe('123')
                    expect(user.orders[0].creditCard).toBe(1234567890)
                    expect(user.orders[0].items[0].price).toBe(100)
                    expect(user.orders[0].items[0].title).toBe('Super sofa')
                })

        })
    })
    after(done => mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done)))

})