const User = require('../models/user');
const Task = require('../models/task');

function usersNew(req, res) {
  return res.render('users/new');
}

function usersCreate(req, res) {
  const user = new User(req.body.user);
  user.save((err, user) => {
    if (err) return console.log(err);
    return res.redirect(`/users/${user._id}`);
  });
}

function usersShow(req, res) {
  User.findById(req.params.id, (err, user) => {
    if (err) return console.log(err);
    Task.find({ deleted: { $eq: false }, owner: { $eq: user }}, (err, tasksO) => {
      Task.find({ deleted: { $eq: false }, owner: { $ne: user }, assignedTo: { $eq: user }}, (err, tasksA) => {
        Task.find({ deleted: { $eq: true }, owner: { $eq: user } }, (err, tasksD) => {
          return res.render('users/show', { user, tasksO, tasksA, tasksD });
        });
      });
    });
  });
}

function usersIndex(req, res) {
  User.find({}, (err, users) => {
    if (err) return console.log(err);
    return res.render('users/index', { users });
  });
}

function usersManage(req, res) {
  User.find({}, (err, users) => {
    if (err) return console.log(err);
    return res.render('users/manage', { users });
  });
}


function usersEdit(req, res) {
  User.findById(req.params.id, (err, user) => {
    if (err) return console.log(err);
    return res.render('users/edit', { user });
  });
}

function usersUpdate(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body.user, { new: true }, (err, user) => {
    if (err) return console.log(err);
    return res.redirect(`/users/manage`);
  });
}

function usersDelete(req, res) {
  User.findById(req.params.id, (err, user) => {
    if (err) return console.log(err);

    Task.find({ owner: { $eq: user }}, (err, tasksR) => {
      tasksR.forEach(task => {
        task.remove();
      });

      user.remove();
      User.find({}, (err, users) => {
        if (err) return console.log(err);
        return res.render('users/manage', { users });
      });
    });
  });
}


module.exports = {
  new: usersNew,
  create: usersCreate,
  show: usersShow,
  index: usersIndex,
  manage: usersManage,
  edit: usersEdit,
  update: usersUpdate,
  delete: usersDelete

};
