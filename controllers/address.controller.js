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

    var newGroup = [];
    if (req.body.address.groups !== undefined){
        req.body.address.groups.forEach(g => {
            newGroup.push(g);
        });
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

    address.save(address)
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
exports.findById = (req, res) => {
    const id = req.params.id;

    Address.findById(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Not found Address with id " + id });
            } else {
                res.send(data);  
            } 
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving Address with id=" + id });
        });
};

// Update an Address by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Address.findByIdAndUpdate(id, req.body.address, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Address with id=${id}. Address was not found!`
                });
            } else res.send({ message: "Address was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Address with id=" + id
            });
        });
};

// Delete an Address with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Address.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Address with id=${id}. Maybe Address was not found!`
                });
            } else {
                res.send({
                    message: "Address was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Address with id=" + id
            });
        });
};

// Delete all Addresses from the database.
exports.deleteAll = (req, res) => {
    Address.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Addresss were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while removing all Addresses."
            });
        });
};

// Find distinct groups for Addresses
exports.findAllGroups = (req, res) => {
    Address.distinct("groups")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving Addresses."
            });
        });
};