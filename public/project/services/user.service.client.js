(function () {
    angular
        .module('LEARN')
        .factory('userService', userService)

    function userService($http) {

        var api = {
            register: register,
            createUser: createUser,
            findUserById: findUserById,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser,
            findAllUsers: findAllUsers,
            findAllUserTypes: findAllUserTypes,
            addFriend: addFriend,
            addCourseToUser: addCourseToUser,
            loggedin: loggedin,
            login: login
        }
        return api;

        function register(userObj) {
            var url = "/api/project/register";
            return $http.post(url, userObj)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {
            var url = "/api/project/user";
            return $http
                .post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = '/api/project/user/'+userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function findUserByCredentials(username, password){
            var url = "/api/project/user?username="+username+"&password="+password;
            return $http.get(url)
                .then(function (response) {
                    return response.data
                },function (response) {
                    return null;
                });
        }

        function findUserByUsername(username){
            var url = "/api/project/user?username="+username;
            return $http.get(url)
                .then(function (response) {
                    return response.data
                });
        }

        function updateUser(userId, user){
            var url = "/api/project/user/"+userId;
            return $http.put(url, user)
                .then(function(response){
                    return response.data;
                })
        }

        function deleteUser(userId){
            var url = "/api/project/user/"+userId;
            return $http.delete(url)
                .then(function(){

                })
        }

        function findAllUserTypes(){
            var url = "/api/project/user/types";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllUsers(){
            var url = '/api/project/user';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function addFriend(userId,friendId){
            var url = "/api/project/user/"+userId+"/friend/"+friendId;
            return $http.put(url)
                .then(function(response){
                    return response.data;
                })
        }
        
        function addCourseToUser(userId, courseId) {
            var url = '/api/project/user/'+userId+'/course/'+courseId;
            //Fix this to be a put
            return $http.get(url)
                .then(function(response){
                    return response.data;
                });
        }

        function loggedin() {
            var url = "/api/project/loggedin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var url = "/api/project/login";
            var credentials = {
                username: username,
                password: password
            }
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    var d = 8;
                });
        }

    }
})();