var Sequelize = require('sequelize');

var sequelize = new Sequelize('banco', 'user', 'password', {
    host: 'xxxx',
    port: 000,
    dialect: 'xxx'
});

var tasks = sequelize.define('tasks', {
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    start_date: Sequelize.STRING,
    end_date: Sequelize.STRING,
    img: Sequelize.STRING
});

sequelize.sync().then(function (err) {
    if (err) {
        console.log('An error occur while creating table');
    } else {
        console.log('Item table created successfully');
    }
});

module.exports = { "connection": sequelize, "tasks": tasks };
