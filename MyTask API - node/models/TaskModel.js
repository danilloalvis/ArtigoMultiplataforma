var Sequelize = require('sequelize');
var buffer = require('buffer');
var fs = require('fs');

function TaskModel(sequelize) {
    this.sequelize = sequelize.connection;
    this.Tasks = sequelize.tasks;
}

TaskModel.prototype.find = function (callback) {
    this.Tasks.findAll().then(callback);
}

TaskModel.prototype.findOne = function (_id, callback) {
    this.Tasks.findById(parseInt(_id)).then(callback);
};

TaskModel.prototype.create = function (data, callback) {

    if (!data.description)
        data.description = "";

    if (!data.start_date)
        data.start_date = "";

    if (!data.end_date)
        data.end_date = "";

    if (!data.img)
        data.img = "";

    if (data && data.img && data.title) {
        var dir = './public/images/tasks/';
        if (!fs.existsSync(dir))
            fs.mkdirSync(dir);

        var d = new Date();
        var path = d.getTime() + ".jpg";

        fs.writeFile(dir + path, data.img, { encoding: 'base64' }, function (error) {
            if (error) {
            } else {
                data.img = "/images/tasks/" + path;
                this.Tasks.create(data).then(callback);;
            }
        }.bind(this));
    } else {
        if (data && data.title)
            this.Tasks.create(data).then(callback);;
    }
};

TaskModel.prototype.update = function (_id, data, callback) {

    if (!data.title)
        delete data.title;

    if (!data.description)
        delete data.description;

    if (!data.start_date)
        delete data.start_date;

    if (!data.end_date)
        delete data.end_date;

    if (!data.img)
        delete data.img;

    if (data.title || data.description || data.start_date || data.end_date || data.img) {
        if (data.img) {
            var dir = './public/images/tasks/';
            if (!fs.existsSync(dir))
                fs.mkdirSync(dir);

            var d = new Date();
            var path = d.getTime() + ".jpg";
            // var base64Data = data.img.replace(/^data:image\/jpeg;base64,/, "");
            fs.writeFile(dir + path, data.img, { encoding: 'base64' }, function (error) {
                if (error) {
                } else {
                    data.img = "/images/tasks/" + path;
                    this.Tasks.update(data, { where: { id: _id } }).then(callback)
                }
            }.bind(this));
        } else {
            this.Tasks.update(data, { where: { id: _id } }).then(callback)
        }

    } else {
        throw { "message": " requisição vazia " }
    }
};

TaskModel.prototype.delete = function (_id, callback) {
    this.Tasks.destroy({ where: { id: _id } }).then(callback)
};

module.exports = function (mysql) {
    return new TaskModel(mysql);
}


