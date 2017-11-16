var Sequelize = require('sequelize');

var attributes = {
    sheet_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Manager_id: {
        type: Sequelize.INTEGER
    },
    Employee_id: {
        type: Sequelize.INTEGER
    },
    Time: {
        type: Sequelize.TIMESTAMP
        validate: {
            is: /^[a-z0-9\_\-]+$/i,
        }
    },
    Location: {
        type: Sequelize.STRING
    }
};

var options = {
    freezeTableName: true
};

module.exports.attributes = attributes;
module.exports.options = options;
