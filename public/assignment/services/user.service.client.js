(function () {
    angular
        .module('WAM')
        .factory('userService', userService)

    function userService($http) {

        var api = {
            register: register,
            createUser: createUser,
            findUserById: findUserById,
            findUserByCredentials: findUserByCredentials,
            login: login,
            logout: logout,
            loggedin: loggedin,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser
        }
        return api;

        function register(userObj) {
            var url = "/api/assignment/register";
            return $http.post(url, userObj)
                .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var url = "/api/assignment/login";
            var credentials = {
                username: username,
                password: password
            }
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            var url = "/api/assignment/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function loggedin() {
            var url = "/api/assignment/loggedin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function createUser(user) {
            var url = "/api/assignment/user";
            return $http
                .post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = '/api/assignment/user/'+userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }



        function findUserByCredentials(username, password){
            var url = "/api/assignment/user?username="+username+"&password="+password;
            return $http.get(url)
                .then(function (response) {
                    return response.data
                },function (response) {
                    return null;
                });
        }

        function findUserByUsername(username){
            /*var user = users.find(function (user) {
                return user.username === username;
            });
            if(typeof user === 'undefined') {
                return null;
            }
            return user;*/
            var url = "/api/assignment/user?username="+username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, user){
            var url = "/api/assignment/user/"+userId;
            return $http.put(url, user)
                .then(function(response){
                    return response.data;
                })
        }

        function deleteUser(userId){
            var url = "/api/assignment/user/"+userId;
            return $http.delete(url)
                .then(function(response){
                    return response;
                })
        }

    }
})();