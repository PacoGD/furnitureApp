const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')
const Item = require('./item')

module.exports = new Schema({
    deliveryAdress: {
        type: String,
    },
    creditCard: {
        type: String
    },
    price:{
        type: Number
    },
    items: [{
        type: ObjectId,
        ref: 'Item'
    }]
})