const Task = require('../models/task');

function updatesCreate(req, res) {
  Task.findById(req.params.id, (err, task) => {
    if (err) console.log(err);

    task.updates.push(req.body.update);

    task.save((err, task) => {
      if (err) return console.log(err);
      return res.redirect(`/tasks/${task._id}`);
    });
  });
}

module.exports = {
  create: updatesCreate
};
