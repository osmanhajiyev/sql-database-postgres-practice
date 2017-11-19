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

router.get('/manager/dpSummary', function (req, res, next) {
  console.log("reached manager page")
  const query = 'SELECT count(w.Dept_ID) AS PeopleInDept, d.dept_name FROM Employee w, Department d GROUP BY d.dept_name;'
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

router.get('/manager/:manager_id/myTime', function (req, res, next) {
  const manager_id = req.params.manager_id
  const query = "SELECT w.* FROM employee w, timetable c, m_signs_t m WHERE m.manager_id = 500 AND m.timetable_id = c.timetable_id AND c.employee_id = w.employee_id"
  connection.query(query, 
    { 
      type: connection.QueryTypes.SELECT,
      replacements: {
        manager_id: manager_id
      }
    })
    .then(calls => {
      console.log(calls)
      res.json(calls)
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

router.post('/manager/fire', bodyParser.json(), function (req, res, next) {
  const id = req.body.data.id
  const query = 'DELETE FROM employee WHERE employee_id = '+ id + ';'
  connection.query(query,
    {
      type: connection.QueryTypes.DELETE
    })
    .then(result => {
      // result[1] is the number of rows changed
      res.send('/employee')
    })
})

router.post('/manager/hire', bodyParser.json(), function (req, res, next) {
  const id = req.body.data.id
  const name = req.body.data.name
  const union = req.body.data.union
  const rate = req.body.data.rate
  const occupation = req.body.data.occupation
  const sin = req.body.data.sin
  const dept = req.body.data.dept
  console.log(id + '' + name  + '' + union  + '' + rate  + '' +  occupation  + '' +  sin  + '' + dept)

  const query = 'INSERT INTO employee (employee_id, name, union_id, hourly_rate, occupation, sin, dept_id) VALUES ( ' + id + ', :name, ' + union + ', ' + rate + ', :occupation, ' + sin + ', ' + dept + ') ;'
  connection.query(query,
    {
      type: connection.QueryTypes.INSERT,
      replacements: {
        employee_id: id,
        name: name,
        union_id: union,
        hourly_rate: rate,
        occupation: occupation,
        sin: sin,
        dept_id: dept
      }
    })
    .then(result => {
      // result[1] is the number of rows changed
      res.send('/employee')
    })
})

router.post('/manager/edit', bodyParser.json(), function (req, res, next) {
  const id = req.body.data.id
  const name = req.body.data.name
  const union = req.body.data.union
  const rate = req.body.data.rate
  const occupation = req.body.data.occupation
  const sin = req.body.data.sin
  const dept = req.body.data.dept
  console.log(id + '' + name  + '' + union  + '' + rate  + '' +  occupation  + '' +  sin  + '' + dept)

  /*// verguller bes deyexki name olmadi update basga bir shey oldu onda nece?
  var query = 'UPDATE employee SET ';
  if(name){
    query = query + 'name = ' + name;
  }
  if(union){
    query = query + ', union_id = ' + union;
  }
  if(rate){
    query = query + ', hourly_rate = ' + rate;
  }
  if(occupation){
    query = query + ', occupation = ' + occupation;
  }
  if(sin){
    query = query + ', sin = ' + sin;
  }
  if(dept){
    query = query + ', dept_id = ' + dept;
  }

  query = query + 'WHERE employee_id = ' + id + ';';*/
  const query = 'UPDATE employee SET name = :name, union_id = '+ union + ', hourly_rate = '+rate+', occupation = :occupation, sin = '+sin+', dept_id = '+dept+' WHERE employee_id = '+id+' ;'

  connection.query(query,
    {
      type: connection.QueryTypes.UPDATE,
      replacements: {
        employee_id: id,
        name: name,
        union_id: union,
        hourly_rate: rate,
        occupation: occupation,
        sin: sin,
        dept_id: dept
      }
    })
    .then(result => {
      // result[1] is the number of rows changed
      res.send('/employee')
    })
})

export default router