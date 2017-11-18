var Sequelize = require('sequelize');

var attributes = {
    num: {
        type: Sequelize.INTEGER
    },
    dept_name: {
        type: Sequelize.INTEGER
    }
};

var options = {
    freezeTableName: true
};

module.exports.attributes = attributes;
module.exports.options = options;
