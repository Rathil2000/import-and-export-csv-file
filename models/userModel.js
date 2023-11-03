const { DataTypes} =  require('sequelize');
const sequelize =  require('./connection');

const Users = sequelize.define('Users', {
    name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    address:{
        type: DataTypes.STRING
    },
    age:{
        type: DataTypes.STRING
    }
},{underscored:true,timestamps:false});

module.exports = Users;