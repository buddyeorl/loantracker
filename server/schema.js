// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
let Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
let connection = require("./connection.js");

// Creates a "Loan" model that matches up with DB
let Loan = connection.define("loan", {
    contract: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    equipment: {
        type: Sequelize.STRING
    },
    financed: {
        type: Sequelize.STRING
    },
    monthly: {
        type: Sequelize.FLOAT
    },
    interest: {
        type: Sequelize.STRING
    },
    terms: {
        type: Sequelize.INTEGER
    },
    total: {
        type: Sequelize.FLOAT
    },
    balance: {
        type: Sequelize.FLOAT
    },
    start: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
    },
    next: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
    },
    createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
        defaultValue: Sequelize.NOW
    },
}, {
    timestamps: false
});

let History = connection.define('history', {
    // Here are the columns of the table
    type: { type: Sequelize.STRING },
    amountPaid: { type: Sequelize.FLOAT },
    balance: { type: Sequelize.FLOAT },
    date: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
    },
}, {
    timestamps: false
});


Loan.hasMany(History);




connection
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Syncs with DB
Loan.sync();
History.sync();

// Makes the Chirp Model available for other files (will also create a table)
module.exports = { Loan,History };

