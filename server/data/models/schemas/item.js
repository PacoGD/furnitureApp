const { Schema } = require('mongoose')

module.exports = new Schema({
    title: {
        type: String
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    color: {
        type: String
    },
    category: {
        type: String
    },
    stock: {
        type: String
    },
    price: {
        type: Number
    }
})