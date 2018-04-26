const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config.js');

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

const User = mongoose.model('User', UserSchema);

const addUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            if(err){
                console.log('err');
                callback(err);
            } else {
                const user = new User({
                    name: newUser.name,
                    username: newUser.username,
                    email: newUser.email,
                    password: hash,
                });
                user.save(callback);
            }
        });
    });
}

const getUserById = function(id, callback) {
    User.findById(id, callback);
}

const getUserByUsername = function(username, callback) {
    const query = { username };
    User.findOne(query, callback);
}

const comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, callback);
}

module.exports = {
    addUser,
    getUserById,
    getUserByUsername,
    comparePassword,
};