const assert = require('assert');
const uuidv1 = require('uuid/v1');
var UserModel = require('../models/User');

class UserDAO {
    // Moogose is not full Promise => wrap moogose's non-Promise function into Promise
    constructor() {
        console.debug('Init UserDAO');
    }
    
    /**
     * Add new user, the password should be encrypted already in service layer.
     * @param {*} user
     */
    async addUser(user) {
        // convert to UserModel
        var userModel = (user instanceof UserModel) ? user : new UserModel(user);
        // Just ensure the id has been generated.
        userModel._id = uuidv1();
        return await userModel.save();
    };

    async updateUser(newUser) {
        // Use findById instead of find function
        var user = await UserModel.findById({_id: newUser._id}).exec();
        
        user.firstName = newUser.firstName;
        user.lastName = newUser.lastName;
        user.group = newUser.group;

        return await user.save();
    }

    async updateUserPassword(id, newPassword) {
        // Use findById instead of find function
        var user = await UserModel.findById({_id: id}).exec();

        // This password is already encrypted.
        user.password = newPassword;

        return await user.save();
    }

    async removeUser(id) {
        return await UserModel.findByIdAndRemove(id).exec();
    }

    async getById(id) {
        return await UserModel.find({_id: id}).exec();
    }

   async getUserById(userId) {
        return await UserModel.find({userId: userId}).exec();
    }

    async getAllUsers() {
        return await UserModel.find({}).exec();
    }
}

// var userDao = new UserDAO();
// var user = {
//     //_id: "4069ce80-e1e0-11e8-a9d9-65fccfbf6c03",
//     firstName: "firstName 1",
//     lastName: "lastName 1",
//     group: "group 1",
//     password: "password 1",
//     userId: "userId 1"
// };
// userDao.addUser(user).then(val => {
//     console.log("User added: " + val);
// });
// userDao.getById("4069ce80-e1e0-11e8-a9d9-65fccfbf6c03").then(users => {
//     console.log("User: " + users);
// });
// userDao.getUserById("userId 1").then(users => {
//     console.log("User: " + users);
// });
// var user1 = {
//     _id: "4069ce80-e1e0-11e8-a9d9-65fccfbf6c03",
//     firstName: "firstName 2",
//     lastName: "lastName 2",
//     group: "group 2",
//     password: "password 2",
//     userId: "userId 2"
// };
// userDao.updateUser(user1).then(users => {
//     console.log("User: " + users);
// });
// userDao.updateUserPassword("4069ce80-e1e0-11e8-a9d9-65fccfbf6c03", "new pass").then(users => {
//     console.log("User: " + users);
// });
// userDao.getAllUsers().then(users => {
//     console.log("Users: " + users);
// });
// userDao.removeUser("4069ce80-e1e0-11e8-a9d9-65fccfbf6c03").then(users => {
//     console.log("Users: " + users);
// });
module.exports = UserDAO;