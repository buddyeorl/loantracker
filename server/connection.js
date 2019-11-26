// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Dependencies
var Sequelize = require("sequelize");

// Creates mySQL connection using Sequelize
// var sequelize = new Sequelize("Chirp", "root", "23642134aa", {
//     host: "localhost",
var sequelize = new Sequelize("heroku_9ebd3a2e0bb7c13", "b0cf29109b9a6a", "3b1f3ac9", {
    host: "us-cdbr-iron-east-05.cleardb.net",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

// Exports the connection for other files to use
module.exports = sequelize;