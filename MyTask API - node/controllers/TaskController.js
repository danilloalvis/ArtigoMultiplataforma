
var multiparty = require('multiparty');

function TaskController(TaskModel) {
    this.model = TaskModel;
}

// SELECT ALL
TaskController.prototype.getAll = function (request, response, next) {
    this.model.find((data) => {
        response.setHeader('Cache-Control', 'no-cache');
        response.status(200).json(data);
    }, (err) => {
        return next(err);
    });
};

// SELECT BY ID
TaskController.prototype.getbyId = function (request, response, next) {
    var _id = request.params._id;
    this.model.findOne(_id, (data) => {
        response.setHeader('Cache-Control', 'no-cache');
        response.status(200).json(data);
    }, (err) => {
        return next(err);
    });
};

// CREATE A ITEM
TaskController.prototype.create = function (request, response, next) {
    response.setHeader('Cache-Control', 'no-cache');

    if (request.body) {
        var body = request.body;
        this.model.create(body, (data) => {
            response.setHeader('Cache-Control', 'no-cache');
            response.status(201).json({ "message": "Dados inseridos com sucesso!" });
        }, (err) => {
            response.setHeader('Cache-Control', 'no-cache');
            response.status(400).json({ "message": err });
        });
    } else {
        response.setHeader('Cache-Control', 'no-cache');
        response.status(400).json({ "message": "Error" });
    }
};

// UPDATE A ITEM
TaskController.prototype.update = function (request, response, next) {
    if (request.body) {
        var _id = request.params._id;
        var body = request.body;
        this.model.update(_id, body, (data) => {
            response.setHeader('Cache-Control', 'no-cache');
            response.status(200).json({ "message": "Dados atualizado com sucesso!" });
        }, (err) => {
            return next(err);
        })
    } else {
        response.setHeader('Cache-Control', 'no-cache');
        response.status(400).json({ "message": "Error" });
    }
};

// REMOVE A ITEM
TaskController.prototype.remove = function (request, response, next) {
    var _id = request.params._id;
    this.model.delete(_id, (data) => {
        response.setHeader('Cache-Control', 'no-cache');
        response.status(200).json({ "message": "Dados deletado com sucesso!" });
    }, err => {
        return next(err);
    });
};

module.exports = function (TaskModel) {
    return new TaskController(TaskModel);
}