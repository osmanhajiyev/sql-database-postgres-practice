var Sequelize = require('sequelize');

var attributes = {
    payment_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    Manager_id: {
        type: Sequelize.INTEGER
    },
    Employee_id: {
        type: Sequelize.INTEGER
    },
    Payment_date: {
        type: Sequelize.DATE
    }
};

var options = {
    freezeTableName: true
};

module.exports.attributes = attributes;
module.exports.options = options;
