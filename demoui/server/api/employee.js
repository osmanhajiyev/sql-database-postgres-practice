import { Router } from 'express'
var connection = require('../configs/sequelize')
const bodyParser = require('body-parser')

const router = Router()

/* GET users listing. */
router.get('/employee', function (req, res, next) {
  const query = 'SELECT * FROM employee;'
  connection.query(query, { type: connection.QueryTypes.SELECT })
    .then(employee => {
      console.log(employee)
      res.json(employee)
    })
})

/* GET user by ID. */
router.get('/employee/:employee_id', function (req, res, next) {
  const employee_id = req.params.employee_id
  const query = 'SELECT * FROM employee WHERE employee_id = ' + employee_id + ';'
  connection.query(query, 
    { 
      type: connection.QueryTypes.SELECT,
      replacements: {
        employee_id: employee_id
      }
    })
    .then(employee => {
      if (employee.length === 1 ) {
        console.log(employee[0])
        res.json(employee[0])
      } else {
        res.status(404).json({})
      }
    })
})

router.get('/employee/:employee_id/calls', function (req, res, next) {
  const employee_id = req.params.employee_id
  const query = 'SELECT ee.name as mname, c.*, e.* FROM call_sheet c, employee e,' +
  ' manager m INNER JOIN employee ee on m.employee_id = ee.employee_id WHERE e.employee_id = ' + 
  employee_id + ' and c.employee_id = ' + employee_id + ' and c.manager_id = m.manager_id;'
  connection.query(query, 
    { 
      type: connection.QueryTypes.SELECT,
      replacements: {
        employee_id: employee_id
      }
    })
    .then(calls => {
      console.log(calls)
      res.json(calls)
    })
})

router.get('/employee/:employee_id/timetables', function (req, res, next) {
  const employee_id = req.params.employee_id
  const query = 'SELECT t.* FROM timetable t, employee e WHERE e.employee_id = ' + employee_id +
  ' and t.employee_id = ' + employee_id + ';'
  connection.query(query, 
    { 
      type: connection.QueryTypes.SELECT,
      replacements: {
        employee_id: employee_id
      }
    })
    .then(timetables => {
      console.log(timetables)
      res.json(timetables)
    })
})

router.get('/employee/:employee_id/payments', function (req, res, next) {
  const employee_id = req.params.employee_id
  const query = 'SELECT ee.name as mname, p.* FROM payment p, employee e, manager m INNER JOIN employee ee on' +
  ' m.employee_id = ee.employee_id WHERE e.employee_id = ' + employee_id +
  ' and p.employee_id = ' + employee_id + ';'
  connection.query(query,
    { 
      type: connection.QueryTypes.SELECT,
      replacements: {
        employee_id: employee_id
      }
    })
    .then(timetables => {
      console.log(timetables)
      res.json(timetables)
    })
})


router.post('/users/update', bodyParser.json(), function (req, res, next) {
  const userid = req.body.data.userid
  const username = req.body.data.username
  const password = req.body.data.password

  const query = 'UPDATE Users SET username = :username, password = :password WHERE userid = :userid ;'
  connection.query(query,
    {
      type: connection.QueryTypes.UPDATE,
      replacements: {
        username: username,
        password: password,
        userid: userid
      }
    })
    .then(result => {
      // result[1] is the number of rows changed
      res.send('/users')
    })
})

router.post('/employee/:employee_id/timetables/add', bodyParser.json(), function (req, res, next) {
  const employee_id: self.employee_id,
  const trip_start: self.trip_start,
  const meal_start: self.meal_start,
  const wrap_time: self.wrap_time,
  const trip_end: self.trip_end

  const query = 'INSERT INTO Timetable (employee_id, trip_start, meal_start, wrap_time, trip_end)' + 
  'VALUES (:employee_id, :trip_start, :meal_start, :wrap_time, :trip_end);'
  connection.query(query,
    {
      type: connection.QueryTypes.INSERT,
      replacements: {
        employee_id: employee_id,
        trip_start: trip_start,
        meal_start: meal_start,
        wrap_time: wrap_time,
        trip_end: trip_end
      }
    })
    .then(result => {
      // result[1] is the number of rows changed
      res.send('/employee/:employee_id/timetables')
    })
})

export default router
