var express = require('express');

var mysql = require('../db/mysql');
var TaskModel = require('../models/TaskModel')(mysql);
var TaskController = require('../controllers/TaskController')(TaskModel);
router = express.Router();

router.get('/', TaskController.getAll.bind(TaskController));
router.get('/:_id', TaskController.getbyId.bind(TaskController));
router.post('/', TaskController.create.bind(TaskController));
router.put('/:_id', TaskController.update.bind(TaskController));
router.delete('/:_id', TaskController.remove.bind(TaskController));

module.exports = router;