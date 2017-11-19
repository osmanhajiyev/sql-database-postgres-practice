var Sequelize = require('sequelize');

var attributes = {
    employee_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        validate: {
            is: /^[a-z0-9\_\-]+$/i,
        }
    },
    union_id: {
        type: Sequelize.INTEGER
    },
    hourly_rate: {
        type: Sequelize.INTEGER
    },
    occupation: {
        type: Sequelize.STRING
        validate: {
            is: /^[a-z0-9\_\-]+$/i,
        }
    },
    SIN: {
        type: Sequelize.INTEGER
    },
    dept_id: {
        type: Sequelize.INTEGER
    }
};

var options = {
    freezeTableName: true
};

module.exports.attributes = attributes;
module.exports.options = options;
