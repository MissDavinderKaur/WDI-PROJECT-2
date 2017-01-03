const Task       = require('../models/task');
const User       = require('../models/user');
const dateFormat = require('dateformat');

function tasksNew(req, res) {
  User.find({}, (err, users) => {
    return res.render('tasks/new', { users });
  });
}

function tasksCreate(req, res) {
  const task = new Task(req.body.task);
  task.save((err, task) => {
    if (err) return console.log(err);
    const owner = task.owner;
    User.findById(owner, (err, user) => {
      if (err) return console.log(err);
      user.tasklist.push(task);
      user.save();
      return res.redirect(`/tasks/${task._id}`);
    });  
  });
}

function tasksShow(req, res) {
  Task
  .findById(req.params.id)
  .populate('owner', 'name')
  .populate('assignedTo', 'name')
  .exec((err, task) => {
    if (err) return console.log(err);
    return res.render('tasks/show', { task });
  });
}

function tasksIndex(req, res) {
  Task
  .find()
  .populate('owner', 'name')
  .populate('assignedTo', 'name')
  .exec((err, tasks) => {
    if (err) return console.log(err);
    return res.render('tasks/index', { tasks });
  });
}

function tasksEdit(req, res) {
  Task.findById(req.params.id)
  .populate('owner', 'name')
  .populate('assignedTo', 'name')
  .exec((err, task) => {
    if (err) return console.log(err);
    User.find({}, (err, users) => {
      var tempStartDate = dateFormat(task.startDate, 'yyyy-mm-dd');
      var tempEndDate = dateFormat(task.endDate, 'yyyy-mm-dd');
      return res.render('tasks/edit', { task, users, tempStartDate, tempEndDate });
    });
  });
}

function tasksUpdate(req, res) {
  Task.findByIdAndUpdate(req.params.id, req.body.task, { new: true }, (err, task) => {
    if (err) return console.log(err);
    return res.redirect(`/tasks/${task._id}`);
  });
}

function tasksDelete(req, res) {
  Task.findById((req.params.id), (err, task) => {
    if (err) return console.log(err);
    const user = task.owner;
    task.deleted = true;
    task.save();
    User.findById(user, (err, user) => {
      return res.redirect(`/users/${user._id}`);
    });
  });
}

module.exports = {
  new: tasksNew,
  create: tasksCreate,
  show: tasksShow,
  index: tasksIndex,
  edit: tasksEdit,
  update: tasksUpdate,
  delete: tasksDelete
};
