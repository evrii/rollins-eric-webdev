var app = require('../../express');
var userModel = require('../models/projectUser/projectUser.model.server');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

passport.use(new LocalStrategy(localStrategy));
var FacebookStrategy = require('passport-facebook').Strategy;

var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'email', 'name']
};

passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.get('/api/project/user/types', findAllUserTypes);
app.get('/api/project/user/:userId', findUserById);
app.get('/api/project/user', findAllUsers);

app.post('/api/project/user', createUser);
app.put('/api/project/user/:userId', updateUser);
app.delete('/api/project/user/:userId', deleteUser);
app.put('/api/project/user/:userId/curriculum/:curriculumId', addCurriculumToUser);
app.delete('/api/project/user/:userId/curriculum/:curriculumId', removeCurriculumFromStudent);

app.post('/api/project/login', passport.authenticate('local'), login);
app.get('/api/project/loggedin', loggedin);
app.get('/api/project/checkAdmin', checkAdmin);
app.post('/api/project/logout', logout);
app.post('/api/project/register', register);

app.put('/api/project/user/:userId/friend/:friendId', addFriend);
app.get('/api/project/user/:userId/friends',findAllFriendsOfUser);
app.get('/api/project/user/:userId/followers',findAllFollowersOfUser);

app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['publish_actions, email'] }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/project/index.html#!/profile',
        failureRedirect: '/project/index.html#!/login'
    }));

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



function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);

    userModel
        .createUser(user)
        .then(function (user) {
            req
                .login(user, function (status) {
                    res.send(status);
                }, function (res) {
                    var y = 8;
                });
        }, function (res) {
            var error = res;
        });
}

function login(req, res) {
    res.json(req.user);
}

function loggedin(req, res) {
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function isAdmin(req, res, next) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN')>-1) {
        next();
    } else {
        res.sendStatus(401);
    }
}

function checkAdmin(req, res) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN')>-1) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function createUser(req, res){

    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        });
}

function findAllUsers(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];

    if(username && password){
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if(user){
                    res.json(user);
                }
                else{
                    res.sendStatus(404);
                }
            });
    }
    else if(username){
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if(user){
                    res.json(user);
                }
                else{
                    res.sendStatus(404);
                }
            });
    }
    else {
        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            });
    }

}

function findUserById(req, res) {
    var userId = req.params['userId'];

    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user)
        })
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params['userId'];

    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.send(status);
        });
}

function deleteUser(req, res) {
    var userId = req.params['userId'];

    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.send(status);
        });
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newFacebookUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        facebook: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newFacebookUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

function findAllUserTypes(req, res) {
    res.send(['student', 'curator', 'admin']);
}

function addCurriculumToUser(req, res) {
    var userId = req.params['userId'];
    var curriculumId = req.params['curriculumId'];
    userModel
        .findUserById(userId)
        .then(function (user) {
                userModel
                    .addCurriculum(user, curriculumId)
            },
            function (error) {
                res.send(error);
            })
        .then(function (response) {
                res.send({"msg":"Successfully saved"});
            },
            function (response) {
                res.send({"msg":"Unsuccessfully saved"});
            });
}

function removeCurriculumFromStudent(req, res) {
    var userId = req.params['userId'];
    var curriculumId = req.params['curriculumId'];
    userModel
        .findUserById(userId)
        .then(function (user) {
                userModel
                    .removeCurriculum(user, curriculumId)
            },
            function (error) {
                res.send(error);
            })
        .then(function (response) {
                res.send({"msg":"Successfully removed"});
            },
            function (response) {
                res.send({"msg":"Unsuccessfully removed"});
            });
}

function addFriend(req, res) {
    var userId = req.params['userId'];
    var friendId = req.params['friendId'];
    return userModel
        .addFriend(userId, friendId)
        .then(function (response) {
            res.json(response);
        });
}

function findAllFriendsOfUser(req, res) {
    var userId = req.params['userId'];
    userModel
        .findAllFriendsOfUser(userId)
        .then(function (user) {
            res.json(user.friends);
        });
}

function findAllFollowersOfUser(req, res) {
    var userId = req.params['userId'];
    userModel
        .findAllFollowersOfUser(userId)
        .then(function (user) {
            res.json(user.followers);
        });
}