// config inicial
require ('dotenv').config ()
const express = require ('express')
const mongoose  = require ('mongoose')
const app = express()

// forma de ler json / middlewares

app.use (
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// rotas da API
const personRoutes = require ('./routes/personRoutes')
app.use('/person',personRoutes)


// entregar uma porta

const DB_USER =  process.env.DB_USER
const DB_PASSWORD = encodeURIComponent (process.env.DB_PASSWORD)

mongoose.connect (`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.9gy32jd.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
    console.log ('conectamos ao MongoDB')
    app.listen(3000)
})
.catch((err)=> console.log ('err'))

