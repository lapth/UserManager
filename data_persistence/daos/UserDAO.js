const assert = require('assert');
const uuidv1 = require('uuid/v1');
var UserModel = require('../models/User');

class UserDAO {
    constructor() {
        console.debug('Init UserDAO');
    }

    addUser(user, callBack) {
        // convert to UserModel
        var userModel = (user instanceof UserModel) ? user : new UserModel(user);
        userModel._id = uuidv1();
        userModel.save(function(err, result) {
            if (err) return console.error(err);
            console.debug('New User has been saved!');
            callBack(result);
        });
    };

    updateUser(oldUser, callBack) {
        // Use findById instead of find function
        UserModel.findById({_id: oldUser._id}, (err, user) => {
            if (err) {
                return console.error(err);
            }

            user.hoTen = oldUser.hoTen;
            user.tel = oldUser.tel;
            user.quyen = oldUser.quyen;

            user.save(function(err, result) {
                if (err) return console.error(err);
                console.debug('User has been updated!');
                callBack(result);
            });
        });
    }

    removeUser(userId, callBack) {
        UserModel.findByIdAndRemove(userId, (err, result) => {
            if (err) {
                return console.error(err);
            }
            console.debug("User has been removed");
            callBack(result);
        })
    }

    getUser(userId, callBack) {
        UserModel.find({_id: userId}, (err, users) => {
            if (err) {
                console.error(err);
                return null;
            }

            if (users.length > 1) {
                console.error("There is something wrong with your DB");
                return null;
            }
            callBack(users);
        });
    }

    getAllUsers(callBack) {
        UserModel.find({}, (err, users) => {
            if (err) {
                console.error(err);
                return null;
            }
            callBack(users);
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