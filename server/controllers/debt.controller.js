const { Debt } = require('../models/debt.model');
const { Person } = require('../models/person.model');

module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}

module.exports.getAllDebts = (request, response) => {
    console.log(request)
    Debt.find({personId: request.params.person_id}).sort( { document: +1 } )
        .then(people => response.json(people))
        .catch(err => response.status(400).json(err))
}

module.exports.createDebts = (request, response) => {
    console.log(request)

    
    let debts = ["Enero", "Febrero", "Marzo", "Abril",
        "Mayo", "Junio", "Julio", "Agosto",
        "Septiembre", "Octubre", "Noviembre", "Diciembre"].map((month) => {
            return {
                title: "Cuota " + month,
                amount: 100000,
                member: request.params.person_id
            };
        })
        Debt.create(debts)
            .then(debts => response.json(debts))
            .catch(err => response.status(400).json(err))
}

module.exports.updateDebt = (request, response) => {
    console.log(request.body);
    console.log(request.params.debtId);
    Debt.findOneAndUpdate({_id: request.params.debtId}, request.body, {new:true})
        .then(updatedDebt => {
            Person.findOne({_id: request.params.personId}).sort( { document: +1 } ).populate("debts").then(person => {
                response.json(person)
            })
        })
        .catch(err => response.status(400).json(err));
}
