const mongoose = require('mongoose')
const { Item } = require('./schemas')

module.exports = mongoose.model('Item', Item)