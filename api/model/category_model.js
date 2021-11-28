const Sequelize = require('sequelize');
const connection = require('../config').Sequelize;
const prodModel = require('./product_model');

const categoryTable = connection.define('category', {
    id_category: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category : Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'category'
});

module.exports = categoryTable;