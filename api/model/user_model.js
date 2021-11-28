const Sequelize = require('sequelize');
const connection = require('../config').Sequelize;

const userTable = connection.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username : Sequelize.STRING,
    password : Sequelize.STRING,
    created_at : Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'user'
});

module.exports = userTable;