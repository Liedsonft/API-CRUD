const mongoose = require ('mongoose')

const Person = mongoose.model ('Person',{

    id: String,
    name: String,
    healthInsuranceCardId: String,
    address: String,
    createdAt: String,
})

module.exports = Person