const db = require('../models');
const Address = db.address;
const Person = db.person;

// Create and Save a new Address
exports.create = (req, res) => {
    if (!req.body.address) {
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    

    var newPeople = [];
    if (req.body.address.people !== undefined){
        req.body.address.people.forEach(p => {
            const person = new Person({
            firstName: p.firstName,
            lastName: p.lastName,
            birthdate: p.birthdate
            });
            newPeople.push(person);
        });
    }

    console.log(`req.address = ${req.body.address.groups}`);
    var newGroup = [];
    if (req.body.address.groups !== undefined){
        req.body.address.groups.forEach(g => {
            newGroup.push(g);
        });
    } else {
        newGroup.push('nothing');
    }

    const address = new Address({
        addressLine1: req.body.address.addressLine1,
        addressLine2: req.body.address.addressLine2,
        city: req.body.address.city,
        state: req.body.address.state,
        zip: req.body.address.zip,
        people: newPeople,
        groups: newGroup
    });

    address
        .save(address)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "some error occurred while creating address"
            });
        });
};

// Retrieve all Addresses from the database.
exports.findAll = (req, res) => {
    const address = req.query.address;
    var condition = address ? { address: { $regex: new RegExp(address), $options: "i" } } : {};

    Address.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Find a single Address with an id
exports.findOne = (req, res) => {
  
};

// Update a Address by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Address with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Addresses from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Addresses
exports.findAllPublished = (req, res) => {
  
};