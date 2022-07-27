// rotas da API
const router = require ('express').Router()
const Person = require ('../models/Person')

// Create-criação de dados 

router.post('/', async (req, res) => {

    //req.body
    const {id, name, healthInsuranceCardId, address, createdAt} = req.body

    if (!name) {
        res.status(422).json({error : 'O nome é obrigatório'})
        return
    }

    const person = {
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

// Read- leitura de dados

router.get('/', async(req, res) => {

    try {
        const people = await Person.find()
        res.status(200).json(people)


    } catch (error) {
        res.status(500).json({error: error})
    }
})

// Update - atualização de dados

router.patch ('/:id', async (req, res)=> {

    //const id = req.params.id
    const id = req.params.id
    const { name, healthInsuranceCardId, address, createdAt} = req.body

    const person = {
        name,
        healthInsuranceCardId,
        address,
        createdAt,
    }
    try {
        const updatedPerson = await Person.updateOne({_id: id},person)

        if (updatedPerson.matchedCount ===  0) { 
        res.status(422).json({error : 'O usuário não foi encontrado'})
        return
    }

        res.status(200).json({message: 'Atualização dos dados feita com sucesso',person})

 }  catch (error) {
    res.status(500).json({error: error})
}
})

// Delete - deletar dados 
router.delete('/:id',async (req, res) =>{

    const id = req.params.id
    const person  = await Person.findOne ({_id:id})

    if (!person) {
        res.status(422).json({message: 'O usuário não foi encontrado'})
        return
    }

    try{

        await Person.deleteOne({_id:id})
        res.status(200).json({message: 'O usuário foi removido com sucesso'})

    } catch (error){
        res.status(500).json({error:error})
    }

})  
module.exports = router
