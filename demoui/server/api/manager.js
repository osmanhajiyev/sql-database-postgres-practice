import { Router } from 'express'
var connection = require('../configs/sequelize')
const bodyParser = require('body-parser')

const router = Router()

/* GET users listing. */
router.get('/manager', function (req, res, next) {
  console.log("reached manager page")
  const query = 'SELECT * FROM manager;'
  connection.query(query, { type: connection.QueryTypes.SELECT })
    .then(manager => {
      console.log(manager)
      res.json(manager)
    })
})

router.get('/manager/cp', function (req, res, next) {
  console.log("reached manager page")
  const query = 'SELECT * FROM current_payments;'
  connection.query(query, { type: connection.QueryTypes.SELECT })
    .then(manager => {
      console.log(manager)
      res.json(manager)
    })
})

/* GET user by ID. */
router.get('/manager/:manager_id', function (req, res, next) {
  console.log("Reached specific manager page function")
  const manager_id = req.params.manager_id
  const query = 'SELECT * FROM manager WHERE manager_id = ' + manager_id + ';'
  connection.query(query, 
    { 
      type: connection.QueryTypes.SELECT,
      replacements: {
        manager_id: manager_id
      }
    })
    .then(manager => {
      if (manager.length === 1 ) {
        console.log(manager[0])
        res.json(manager[0])
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

router.post('/employee/:employee_id/timetables/add', bodyParser.json(), function (req, res, next) {
  console.log(req);
  const employee_id = req.params.employee_id;
  const travel_start = req.body.data.travel_start;
  const meal_time = req.body.data.meal_time;
  const wrap_time = req.body.data.wrap_time;
  const travel_end = req.body.data.travel_end;

  const query = 'INSERT INTO Timetable (employee_id, travel_start, meal_time, wrap_time, travel_end)' + 
  'VALUES (:employee_id, :travel_start, :meal_time, :wrap_time, :travel_end);'
  connection.query(query,
    {
      type: connection.QueryTypes.INSERT,
      replacements: {
        employee_id: employee_id,
        travel_start: travel_start,
        meal_time: meal_time,
        wrap_time: wrap_time,
        travel_end: travel_end
      }
    })
    .then(result => {
      // result[1] is the number of rows changed
      res.send('/employee/' + employee_id + '/timetables')
    })
})

export default router