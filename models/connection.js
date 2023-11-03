const {Sequelize} = require("sequelize");

const sequelize  = new Sequelize("testdb", "root","",{
    host:"localhost",
    dialect:"mysql",
    operatorsAliases:"false",
    logging:false
});

module.exports = sequelize;

