const mongoose = require('mongoose');

module.exports = mongoose => {
    const Address = mongoose.model(
        "addresses",
        mongoose.Schema({
                addressLine1: String,
                addressLine2: String,
                city: String,
                state: String,
                zip: String,
                people: [Person],
                groups: [String]
            }, 
            { timestamps: true }
        )
    );
            
    return Address;
}
    

    const Person = mongoose.Schema(
        {
            firstName: String,
            lastName: String,
            birthdate: Date,
            email: String,
            phone: String
        }, 
        { timestamps: true }
    );



