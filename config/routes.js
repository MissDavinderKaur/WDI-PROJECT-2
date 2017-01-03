const router = require('express').Router();

const users = require('../controllers/users');
const tasks = require('../controllers/tasks');
const updates = require('../controllers/updates');

router.route('/').get((req, res) => res.render('home'));

router.route('/users')
.get(users.index)
.post(users.create);
router.route('/users/new')
.get(users.new);
router.route('/users/manage')
.get(users.manage);
router.route('/users/:id')
.get(users.show)
.put(users.update)
.delete(users.delete);

router.route('/users/:id/edit')
.get(users.edit);

router.route('/tasks')
.get(tasks.index)
.post(tasks.create);
router.route('/tasks/new')
.get(tasks.new);
router.route('/tasks/:id')
.get(tasks.show)
.put(tasks.update)
.delete(tasks.delete);
router.route('/tasks/:id/edit')
.get(tasks.edit);

router.route('/tasks/:id/updates')
  .post(updates.create);

module.exports = router;
