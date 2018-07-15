'use strict'

require('dotenv').config()

const { mongoose, models: { User, Item, Order } } = require('..')

const { env: { DB_URL } } = process

// WARN run this script from root folder: $ node demos/

mongoose.connect(DB_URL)
    .then(() => mongoose.connection.dropDatabase())
    .then(() => {
//items
        let item = {
            title: 'Mesa Consola extensible',
            image: 'https://www.atrapamuebles.com/726-large_default/mesa-consola-extensible-4-en-1.jpg',
            description: 'Atrapa AL MEJOR PRECIO de internet, esta funcional y elegante mesa consola extensible',
            color: 'Blanco',
            category: 'tables',
            stock: '3',
            price: 129
        }
        let item2 = {
            title:'Mesa comedor extensible',
            image:'https://www.atrapamuebles.com/592-large_default/mesa-de-salon-extensible-140-x-90-cm.jpg',
            description:'Atrapa AL MEJOR PRECIO esta moderna mesa de comedor  a un precio que no volverá a repetirse.',
            color: 'Blanco',
            category: 'tables',
            stock: '2',
            price: 109
        }
        let item3 = {
            title:'Mesa comedor TREND',
            image:'https://www.atrapamuebles.com/6672-large_default/mesa-comedor-extensible-trend-gris.jpg',
            description:'Atrapa AL MEJOR PRECIO esta moderna mesa de comedor  a un precio que no volverá a repetirse.',
            color: 'Gris',
            category: 'tables',
            stock: '5',
            price: 209
        }
        let item4 = {
            title:'Mesa comedor BART',
            image:'https://www.atrapamuebles.com/6710-large_default/mesa-consola-extensible-4-en-1-mango.jpg',
            description:'Atrapa AL MEJOR PRECIO esta moderna mesa de comedor  a un precio que no volverá a repetirse.',
            color: 'Gris',
            category: 'tables',
            stock: '5',
            price: 209
        }
        let item5 = {
            title:'Mesa comedor TREND',
            image:'https://www.atrapamuebles.com/1764-large_default/mesa-comedor-rubis.jpg',
            description:'Atrapa AL MEJOR PRECIO esta moderna mesa de comedor  a un precio que no volverá a repetirse.',
            color: 'Gris',
            category: 'tables',
            stock: '5',
            price: 215
        }
        let item6 = {
            title:'Silla comedor DORT',
            image:'https://www.atrapamuebles.com/5120-large_default/4-sillas-tower-turquesa-diseno.jpg',
            description:'Atrapa AL MEJOR PRECIO esta moderna mesa de comedor  a un precio que no volverá a repetirse.',
            color: 'Gris',
            category: 'chairs',
            stock: '5',
            price: 103
        }
        let item7 = {
            title:'Sofa comedor TREND',
            image:'https://www.atrapamuebles.com/4469-large_default/chaiselongue-izquierda-oscar-marron-claro.jpg',
            description:'Atrapa AL MEJOR PRECIO esta moderna mesa de comedor  a un precio que no volverá a repetirse.',
            color: 'Gris',
            category: 'sofa',
            stock: '5',
            price: 1300
        }
        let item8 = {
            title:'Sofa comedor TREND',
            image:'https://www.atrapamuebles.com/4806-large_default/chaiselongue-derecha-cayenne-plomo.jpg',
            description:'Atrapa AL MEJOR PRECIO esta moderna mesa de comedor  a un precio que no volverá a repetirse.',
            color: 'Gris',
            category: 'sofa',
            stock: '5',
            price: 450
        }

        return Promise.all([
            Item.create(item),
            Item.create(item2),
            Item.create(item3),
            Item.create(item4),
            Item.create(item5),
            Item.create(item6),
            Item.create(item7),
            Item.create(item8),
           
        ])

    })
    .then(() => User.create({ username: 'JD', name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' }))
    .then(() => mongoose.disconnect())
    .then(() => console.log('done'))