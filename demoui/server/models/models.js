var connection = require('../configs/sequelize.js');

var UserMeta = require('./users');
var Users = connection.define('users', UserMeta.attributes, UserMeta.options);
module.exports.Users = Users;

var EmployeeMeta = require('./employee');
var Employee = connection.define('employee', EmployeeMeta.attributes, EmployeeMeta.options);
module.exports.Employee = Employee;

var ManagerMeta = require('./manager');
var Manager = connection.define('manager', ManagerMeta.attributes, ManagerMeta.options);
module.exports.Manager = Manager;