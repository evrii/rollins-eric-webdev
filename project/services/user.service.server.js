var app = require('../../express');
var userModel = require('../models/projectUser/projectUser.model.server');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

passport.use(new LocalStrategy(localStrategy));

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",
        lastName: "Wonder", friends: ["234", "345"], followers: ["234"], userType: "student",
        content: []},
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",
        lastName: "Marley",  friends: ["123", "345"], followers: ["123", "345", "456"], userType: "teacher",
        content: ["659290d45a76d72ea5ed68b0e18cdde2"]},
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly",
        lastName: "Garcia",  friends: ["234", "123"], followers: ["123", "234", "456"], userType: "student",
        content: []},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",
        lastName: "Annunzi", friends: ["234", "345"], followers: [], userType: "teacher",
        content: []}
];

const USER_TYPES = ["teacher", "student", "admin"]
// Fix this to be a put
app.get('/api/project/user/:userId/course/:courseId', addCourse);

app.put('/api/project/user/:userId/friend/:friendId', addFriend);
app.get('/api/project/user/types', findAllUserTypes);
app.get('/api/project/user/:userId', findUserById);
app.get('/api/project/user', findAllUsers);
app.post('/api/project/user', createUser);

app.put('/api/project/user/:userId', updateUser);
app.delete('/api/project/user/:userId', deleteUser);

app.get('/api/project/loggedin', loggedin);
app.post('/api/project/login', passport.authenticate('local'), login);

function createUser(req, res){
    var user = req.body;
    user._id = (new Date()).getTime() + "";
    user.friends = [];
    user.followers = [];
    user.content = [];
    users.push(user);
    res.json(user);
}

function findAllUsers(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];

    if(username && password){
        for(var u in users) {
            var user = users[u];
            if (user.username === username &&
                user.password === password) {
                res.json(user);
                return;
            }
        }
        res.sendStatus(404);
        return;
    }
    else if(username){
        for(var u in users) {
            var user = users[u];
            if (user.username === username) {
                res.json(user);
                return;
            }
        }
        res.sendStatus(404);
        return;
    }
    else {
        res.send(users);
    }

}

function findUserById(req, res) {
    var userId = req.params['userId'];
    for(var u in users) {
        if(users[u]._id === userId){
            res.send(users[u]);
            return;
        }
    }
    res.sendStatus(404);
}

function updateUser(req, res) {
    var user = req.body;

    for(var u in users) {
        if(users[u]._id === req.params['userId']){
            users[u] = user;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteUser(req, res) {
    var userId = req.params['userId'];

    for(var u in users) {
        if(users[u]._id === userId){
            users.splice(u, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(USER_TYPES);
}

function findAllUserTypes(req, res) {
    res.json(USER_TYPES);
    return;
}

function addFriend(req, res) {
    var userId = req.params['userId'];
    var friendId = req.params['friendId'];

    if (userId !== friendId){

        for (var u in users) {
            if (users[u]._id === userId) {
                if(users[u].friends.indexOf(friendId) === -1) {
                    users[u].friends.push(friendId);
                }
                break;
            }
        }
        for (var u in users) {
            if (users[u]._id === friendId) {
                if(users[u].followers.indexOf(userId) === -1) {
                    users[u].followers.push(userId);
                }
                break;
            }
        }
    }

    res.sendStatus(200);
    return;
}

function addCourse(req, res) {
    var userId = req.params['userId'];
    var courseId = req.params['courseId'];

        for (var u in users) {
            if (users[u]._id === userId) {
                if(users[u].content.indexOf(courseId) === -1) {
                    users[u].content.push(courseId);
                }
                break;
            }
        }

    res.sendStatus(200);
    return;
}

function loggedin(req, res) {
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function login(req, res) {
    res.json(req.user);
}

function localStrategy(username, password, done) {

    userModel
        .findUserByUsername(username)
        .then(function (user) {
            if(user && bcrypt.compareSync(password, user.password)){
                done(null, user);
            }
            else{
                done(null, false);
            }
        }, function (error) {
            return done(error, false);
        })
}