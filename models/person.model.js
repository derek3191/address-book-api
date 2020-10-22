const mongoose = require('mongoose');

module.exports = mongoose => {
    const Person = mongoose.model(
        "person",
        mongoose.Schema(
            {
                firstName: String,
                lastName: String,
                birthdate: Date
            }, 
            { timestamps: true }
        )
    );

    return Person;
}

