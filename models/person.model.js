const mongoose = require('mongoose');

module.exports = mongoose => {
    const Person = mongoose.model(
        "person",
        mongoose.Schema(
            {
                firstName: String,
                lastName: String,
                birthdate: Date,
                email: String,
                phone: String
            }, 
            { timestamps: true }
        )
    );

    return Person;
}

