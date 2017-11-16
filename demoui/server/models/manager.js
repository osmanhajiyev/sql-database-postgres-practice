var Sequelize = require('sequelize');

var attributes = {
    Manager_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    Employee_id: {
        type: Sequelize.INTEGER
    },
    Manager_type: {
        type: Sequelize.STRING
    }
};

var options = {
    freezeTableName: true
};

module.exports.attributes = attributes;
module.exports.options = options;
