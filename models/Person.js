const mongoose = require ('mongoose')

const Person = mongoose.model ('Person',{

    id: Number,
    name: String,
    healthInsuranceCardId: Number,
    address: String,
    createdAt: String,
})

module.exports = Person