const { Sequelize } = require('sequelize');
const settings = require('../../setting').mysql;

const sequelize = new Sequelize(settings.dbname, settings.username, settings.password, {
    host: settings.hostname,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialectOptions: { decimalNumbers: true },
    timezone: '+07:00'
});

sequelize.authenticate()
    .then((result) => {
        console.log("Sequelize connected.");
    }).catch((err) => {
        console.log("Didn't connect - Reason || ", err);
    })


module.exports = {
    Sequelize: sequelize
}