'use strict'

require('dotenv').config()

const { expect } = require('chai')
const { mongoose, models: { Item, Order, User } } = require('data')
const logic = require('.')


const { env: { DB_URL } } = process

describe('logic (furniture )', () => {
    const user = { username: 'JD', name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' }
    const user2 = { username: 'MT', name: 'Mike', surname: 'Tyson', email: 'miketyson@mail.com', password: '123' }
    const dummyUserId = '123456781234567812345678'
    const item = { title: 'Super sofa', image: 'url', description: 'lorem ipsum', color: 'blue', category: 'sofa', stock: 1, price: 100 }
    const itemI = { title: 'Super sofa1', image: 'url', description: 'lorem ipsum', color: 'blue', category: 'sofa', stock: 1, price: 100 }
    const itemII = { title: 'Super sofa2', image: 'url', description: 'lorem ipsum', color: 'blue', category: 'mesa', stock: 1, price: 100 }
    const order = {
        deliveryAdress: 'Roc boronat', creditCard: 1234567890,
        price: 150
    }
    const orderI = {
        deliveryAdress: 'Segarra', creditCard: 9876543210,
        price: 100
    }
    const categories = 'sofa'
    before(() => mongoose.connect(DB_URL))

    beforeEach(() => {
        return Promise.all([User.remove()])
    })

     describe('register user', () => {
        it('should succed on correct data', () => {
            logic.registerUser('John', 'Doe', 'johndoe@mail.com', 'JD', '123')
                .then(res => expect(res).to.exist)
        })
        it('should fail on already registered email', () =>
            User.create(user)
                .then(() => {
                    const { name, surname, email, username, password, _id, order } = user

                    return logic.registerUser(name, surname, email, username, password)
                })
                .catch(({ message }) => {
                    expect(message).to.equal(`user with email ${user.email} already exists`)
                })
        )
        it('should fail on already registered username', () =>
            User.create(user2)
                .then(() => {
                    const { name, surname, email, username, password, _id, order } = user

                    return logic.registerUser(name, surname, email, username, password)
                })
                .catch(({ message }) => {
                    expect(message).to.equal(`user with username ${user.username} already exists`)
                })
        )
        it('should fail on no user name', () =>
            logic.registerUser()
                .catch(({ message }) => expect(message).to.equal('user name is not a string'))
        )

        it('should fail on empty user name', () =>
            logic.registerUser('')
                .catch(({ message }) => expect(message).to.equal('user name is empty or blank'))
        )

        it('should fail on blank user name', () =>
            logic.registerUser('     ')
                .catch(({ message }) => expect(message).to.equal('user name is empty or blank'))
        )

        it('should fail on no user surname', () =>
            logic.registerUser(user.name)
                .catch(({ message }) => expect(message).to.equal('user surname is not a string'))
        )

        it('should fail on empty user surname', () =>
            logic.registerUser(user.name, '')
                .catch(({ message }) => expect(message).to.equal('user surname is empty or blank'))
        )

        it('should fail on blank user surname', () =>
            logic.registerUser(user.name, '     ')
                .catch(({ message }) => expect(message).to.equal('user surname is empty or blank'))
        )

        it('should fail on no user email', () =>
            logic.registerUser(user.name, user.surname)
                .catch(({ message }) => expect(message).to.equal('user email is not a string'))
        )

        it('should fail on empty user email', () =>
            logic.registerUser(user.name, user.surname, '')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on blank user email', () =>
            logic.registerUser(user.name, user.surname, '     ')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on no user username', () =>
            logic.registerUser(user.name, user.surname, user.email)
                .catch(({ message }) => expect(message).to.equal('username is not a string'))
        )

        it('should fail on empty user username', () =>
            logic.registerUser(user.name, user.surname, user.email, '')
                .catch(({ message }) => expect(message).to.equal('username is empty or blank'))
        )

        it('should fail on blank user username', () =>
            logic.registerUser(user.name, user.surname, user.email, '     ')
                .catch(({ message }) => expect(message).to.equal('username is empty or blank'))
        )
        it('should fail on no password', () =>
            logic.registerUser(user.name, user.surname, user.email, user.username)
                .catch(({ message }) => expect(message).to.equal('user password is not a string'))
        )

        it('should fail on empty password', () =>
            logic.registerUser(user.name, user.surname, user.email, user.username, '')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        it('should fail on blank password', () =>
            logic.registerUser(user.name, user.surname, user.email, user.username, '     ')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )
    })

     describe('authenticate user', () => {
        it('should succeed on correct data', () =>
            User.create(user)
                .then(() =>
                    logic.authenticateUser('johndoe@mail.com', '123')
                        .then(id => expect(id).to.exist)
                )
        )

        it('should fail on no user email', () =>
            logic.authenticateUser()
                .catch(({ message }) => expect(message).to.equal('user email is not a string'))
        )

        it('should fail on empty user email', () =>
            logic.authenticateUser('')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on blank user email', () =>
            logic.authenticateUser('     ')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on no user password', () =>
            logic.authenticateUser(user.email)
                .catch(({ message }) => expect(message).to.equal('user password is not a string'))
        )

        it('should fail on empty user password', () =>
            logic.authenticateUser(user.email, '')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        it('should fail on blank user password', () =>
            logic.authenticateUser(user.email, '     ')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )
    })

     describe('retrive user', () => {
        it('it should succed on correct data', () => {
            return User.create(user)
                .then((user) => {
                    return logic.retriveUser(user.id)
                })
                .then(user => {
                    expect(user).to.exist

                    const { name, surname, email, username, password, _id, order } = user

                    expect(name).to.equal('John')
                    expect(surname).to.equal('Doe')
                    expect(email).to.equal('johndoe@mail.com')
                    expect(username).to.equal('JD')

                    expect(_id).to.be.undefined
                    expect(password).to.be.undefined
                    expect(order).to.be.undefined
                })
        })

    })
    
     describe('udpate password', () => {
        it('should succeed on correct data', () =>
            User.create(user)
                .then(({ id }) => {
                    return logic.updatePassword(id, 'jd@mail.com', '123', '456')
                        .then(res => {
                            expect(res).to.be.true

                            return User.findById(id)
                        })
                        .then(user => {
                            expect(user).to.exist

                            expect(user.id).to.equal(id)
                            expect(user.password).to.equal('456')
                        })
                })
        )

        it('should fail on no user id', () =>
            logic.updatePassword()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            logic.updatePassword('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            logic.updatePassword('     ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on no user email', () =>
            logic.updatePassword(dummyUserId)
                .catch(({ message }) => expect(message).to.equal('user email is not a string'))
        )

        it('should fail on empty user email', () =>
            logic.updatePassword(dummyUserId, '')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on blank user email', () =>
            logic.updatePassword(dummyUserId, '     ')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on no user password', () =>
            logic.updatePassword(dummyUserId, user.email)
                .catch(({ message }) => expect(message).to.equal('user password is not a string'))
        )

        it('should fail on empty user password', () =>
            logic.updatePassword(dummyUserId, user.email, '')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        it('should fail on blank user password', () =>
            logic.updatePassword(dummyUserId, user.email, '     ')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )
    })

     describe('unregister user', () => {
        it('should succeed on correct data', () =>
            User.create(user)
                .then(({ id }) => {
                    return logic.unregisterUser(id, 'jd@mail.com', '123')
                        .then(res => {
                            expect(res).to.be.true

                            return User.findById(id)
                        })
                        .then(user => {
                            expect(user).to.be.null
                        })
                })
        )
        it('should fail on no user id', () =>
            logic.unregisterUser()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            logic.unregisterUser('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            logic.unregisterUser('     ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on no user email', () =>
            logic.unregisterUser(dummyUserId)
                .catch(({ message }) => expect(message).to.equal('user email is not a string'))
        )

        it('should fail on empty user email', () =>
            logic.unregisterUser(dummyUserId, '')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on blank user email', () =>
            logic.unregisterUser(dummyUserId, '     ')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on no user password', () =>
            logic.unregisterUser(dummyUserId, user.email)
                .catch(({ message }) => expect(message).to.equal('user password is not a string'))
        )

        it('should fail on empty user password', () =>
            logic.unregisterUser(dummyUserId, user.email, '')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        it('should fail on blank user password', () =>
            logic.unregisterUser(dummyUserId, user.email, '     ')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

    })

     describe('list orders', () => {
        it('should succeed on correct data', () => {
            const user1 = new User(user)
            const order1 = new Order(order)
            const order2 = new Order(orderI)

            user1.orders.push(order1)
            user1.orders.push(orderI)

            return user1.save()
                .then(() =>
                    logic.listOrders(user1.id)
                        .then(orders => {
                            expect(orders).to.exist
                        })
                )

        })
    })

     describe('list items', () => {
        it('should succeed on correct data', () => {
            const user1 = new User(user)
            const order1 = new Order(order)
            const item1 = new Item(item)
            const item2 = new Item(itemI)

            user1.orders.push(order1)
            user1.orders[0].items.push(item1)
            user1.orders[0].items.push(item2)

            return user1.save()
                .then(() =>
                    logic.listOrdersItems(user1.id)
                        .then(items => {
                            expect(items).to.exist
                        })
                )
        })
    })

     describe('show items', () => {
        it('should succeed on correct data', () => {
            const user1 = new User(user).save()
            const order1 = new Order(order).save()
            const order2 = new Order(orderI).save()
            const item1 = new Item(item).save()
            const item2 = new Item(itemI).save()
            const item3 = new Item(itemII).save()

            Promise.all([user1, order1, order2, item1, item2, item3])
                .then(() => {
                    logic.showItems(categories)
                        .then((item) => {
                            expect(item).to.exist
                        })
                })
        })
    })

     describe('list items', () => {
        it('should succeed on correct data', () => {
            const user1 = new User(user)
            const order1 = new Order(order)
            const item1 = new Item(item)
            const item2 = new Item(itemI)

            user1.orders.push(order1)
            user1.orders[0].items.push(item1)
            user1.orders[0].items.push(item2)

            return user1.save()
                .then(() =>
                    logic.listItemsFromOrder(user1.id, user1.orders[0].id)
                        .then(items => {
                            console.log(items)
                            expect(items).to.exist
                        })
                )
        })
    })

     describe('new order', () => {
        it('should succeed on correct data', () => {
            const user1 = new User(user)
            const order1 = new Order(order)
            const item1 = new Item(item)
            const item2 = new Item(itemI)

            user1.orders.push(order1)
            user1.orders[0].items.push(item1)
            user1.orders[0].items.push(item2)

            return user1.save()
                .then(() =>
                    logic.newOrder()
                        .then(items => {
                            expect(items).to.exist
                        })
                )
        })
    })

    after(done => mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done)))
})