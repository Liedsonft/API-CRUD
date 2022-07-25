// config inicial

const express = require ('express')
const mongoose  = require ('mongoose')
const app = express()
const Person = require ('./models/Person')

// forma de ler json / middlewares

app.use (
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// rotas da API

app.post('/person', async (req, res) => {

    //req.body
    const {id, name, healthInsuranceCardId, address, createdAt} = req.body

    if (!name) {
        res.status(422).json({error : 'O nome é obrigatório'})
    }

    const person = {
        id,
        name,
        healthInsuranceCardId,
        address,
        createdAt
    }

    try {
        // criando dados
        await Person.create(person)

        res.status(201).json({message: 'Paciente inserido no sistema com sucesso'})


    } catch (error) {
        res.status (500).json({error: error})
    }
})


// rota inicial
app.get ('/', (req, res)=> {

    //mostrar res
    res.json ({message: 'olá mundo!'})
})

//

// entregar uma porta
mongoose.connect ('mongodb+srv://liedson:60680088@cluster0.9gy32jd.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log ('conectamos ao MongoDB')
    app.listen(3000)
})
.catch((err)=> console.log ('err'))

