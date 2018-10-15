var express = require('express');
var router = express.Router();
var UserDao = require('../data_persistence/daos/UserDAO');
var userDao = new UserDao();

/* GET users listing. */
router.get('/', function(req, res, next) {
  userDao.getAllUsers((users) => {
    res.json(users);
  })  
});

/* GET one user */
router.get('/:userid', (req, res, next) => {
  var userId = req.params.userid;
  userDao.getUser(userId, (user) => {
    res.json(user);
  })
});

/* POST add new user */
router.post('/', (req, res, next) => {
  var user = req.body;
  userDao.addUser(user, (result) => {
    res.send("User added:\n" + result);
  })
});

/* PUT update user */
router.put('/', (req, res, next) => {
  var user = req.body;
  userDao.updateUser(user, (result) => {
    res.send("User updated:\n" + result);
  })
});

/* DELETE user */
router.delete('/:userid', (req, res, next) => {
  var userId = req.params.userid;
  userDao.removeUser(userId, (result) =>  {
    res.send("User with id has been deleted");
  })
});

module.exports = router;
