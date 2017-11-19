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

export default router