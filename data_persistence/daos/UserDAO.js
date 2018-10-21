const assert = require('assert');
const uuidv1 = require('uuid/v1');
var UserModel = require('../models/User');

class UserDAO {
    constructor() {
        console.debug('Init UserDAO');
    }

    /**
     * Add new user, the password should be encrypted already in service layer.
     * @param {*} user
     * @param {*} callBack 
     */
    addUser(user, callBack) {
        // convert to UserModel
        var userModel = (user instanceof UserModel) ? user : new UserModel(user);
        // Just ensure the id has been generated.
        userModel._id = uuidv1();
        userModel.save((err, result) => {
            if (err) {
                console.error(err);
                callBack(err, null);
                return;
            }
            console.debug('New User has been saved!');
            callBack(null, result);
        });
    };

    updateUser(oldUser, callBack) {
        // Use findById instead of find function
        UserModel.findById({_id: oldUser._id}, (err, user) => {
            if (err) {
                console.error(err);
                callBack(err, null);
                return;
            }

            user.firstName = oldUser.firstName;
            user.lastName = oldUser.lastName;
            user.group = oldUser.group;

            user.save(function(err, result) {
                if (err) {
                    console.error(err);
                    callBack(err, null);
                    return;
                }
                console.debug('User has been updated!');
                callBack(null, result);
            });
        });
    }

    removeUser(id, callBack) {
        UserModel.findByIdAndRemove(id, (err, result) => {
            if (err) {
                console.error(err);
                callBack(err, null);
                return;
            }
            console.debug("User has been removed");
            callBack(null, result);
        })
    }

    getById(id, callBack) {
        UserModel.find({_id: id}, (err, users) => {
            if (err) {
                console.error(err);
                callBack(err, null);
                return;
            }

            if (users.length > 1) {
                console.error("There is something wrong with your DB");
                return null;
            }
            console.debug("One user has been found");
            callBack(null, users);
        });
    }

    getUserId(userId, callBack) {
        UserModel.find({_id: userId}, (err, users) => {
            if (err) {
                console.error(err);
                callBack(err, null);
                return;
            }

            if (users.length > 1) {
                console.error("There is something wrong with your DB");
                return null;
            }
            console.debug("One user has been found");
            callBack(null, users);
        });
    }

    getAllUsers(callBack) {
        UserModel.find({}, (err, users) => {
            if (err) {
                console.error(err);
                callBack(err, null);
                return;
            }
            console.debug("There were %d user(s) found", users.length);
            callBack(null, users);
        })
    }
}

// var userDao = new UserDAO();
// var user = {
//     _id: "89bd9a60-cf5e-11e8-8c8a-b9875e529cc4",
//     hoTen: "User updated",
//     tel: "123456789",
//     quyen: 1
// };
// userDao.addUser(user, (result) => {
//     console.log("User added: " + result);
// });
// userDao.getUser("89bd9a60-cf5e-11e8-8c8a-b9875e529cc4", (users) => {
//     console.log("User: " + users);
// });
// userDao.updateUser(user, (users) => {
//     console.log("User: " + users);
// });
module.exports = UserDAO;