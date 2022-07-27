// config inicial

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
mongoose.connect ('mongodb+srv://liedson:60680088@cluster0.9gy32jd.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log ('conectamos ao MongoDB')
    app.listen(3000)
})
.catch((err)=> console.log ('err'))

