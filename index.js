const express = require('express')
const app = express()
const port = process.env.port || 3000

const category = require('./models/category')
const product = require('./models/product')

const categories = require('./controllers/categories')
const products = require('./controllers/products')
const home = require('./controllers/home')

const db = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'postgres',
        database: 'devshop'
    }
})

//debug banco de dados
db.on('query', query => {
    console.log('SQL: ', query.sql)
})

app.set('view engine', 'ejs')
app.use(express.static('public'))

//middleware
app.use( async (req, res, next) => {
    const categories = await category.getCategories(db)()
    res.locals = {
        categories
    }
    next()
})

app.get('/', home.getIndex)
app.get('/categoria/:id/:slug', categories.getCategories(db))
app.get('/produto/:id/:slug', products.getProduct(db))

app.listen(port, (err) => {
    if(err) {
        console.log(err)
    } else {
        console.log('DevShop Server rodando...')
    }
})