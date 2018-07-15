const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')
const Order = require('./order')

module.exports = new Schema({
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    orders:[Order]
})