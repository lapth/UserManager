var express = require('express');
var router = express.Router();
var UserDao = require('../data_persistence/daos/UserDAO');
var userDao = new UserDao();

/* GET users listing. */
router.get('/', function(req, res, next) {
  userDao.getAllUsers((err, users) => {
    if (err) {
      throw new Error("Can not get users");
    }
    res.json(users);
  })  
});

/* GET one user */
router.get('/:userid', (req, res, next) => {
  var userId = req.params.userid;
  console.debug("UserId: " + userId);
  userDao.getUser(userId, (err, user) => {
    if (err) {
      throw new Error("Can not get user");
    }
    res.json(user);
  })
});

/* POST add new user */
router.post('/', (req, res, next) => {
  var user = req.body;
  console.debug("User: " + JSON.stringify(user));
  userDao.addUser(user, (err, result) => {
    if (err) {
      throw new Error("Can not add user");
    }
    res.send("User added:\n" + result);
  })
});

/* PUT update user */
router.put('/', (req, res, next) => {
  var user = req.body;
  console.debug("User: " + JSON.stringify(user));
  userDao.updateUser(user, (err, result) => {
    if (err) {
      throw new Error("Can not update user");
    }
    res.send("User updated:\n" + result);
  })
});

/* DELETE user */
router.delete('/:userid', (req, res, next) => {
  var userId = req.params.userid;
  console.debug("UserId: " + userId);
  userDao.removeUser(userId, (err, result) =>  {
    if (err) {
      throw new Error("Can not delete user");
    }
    res.send("User with id has been deleted");
  })
});

module.exports = router;
