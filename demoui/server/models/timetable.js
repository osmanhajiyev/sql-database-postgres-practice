var Sequelize = require('sequelize');

var attributes = {
    Timetable_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Employee_id: {
        type: Sequelize.INTEGER
    },
    Travel_start: {
        type: Sequelize.TIMESTAMP
    },
    Meal_time: {
        type: Sequelize.TIMESTAMP
    },
    Wrap_time: {
        type: Sequelize.TIMESTAMP
    },
    Travel_start: {
        type: Sequelize.TIMESTAMP
    }
};

var options = {
    freezeTableName: true
};

module.exports.attributes = attributes;
module.exports.options = options;
