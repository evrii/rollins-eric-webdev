(function () {
    angular
        .module('WAM')
        .factory('userService', userService)

    function userService($http) {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername
        }
        return api;
        
        function createUser(user) {
            var url = "/api/assignment/user";
            $http
                .post(url, user)
                .then(function (user) {
                    $location.url('/user/' + userId);
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
            var url = "/api/assignment/user?username="+username+"&password="+password;
            $http.get(url)
                .then(function () {
                    return response.data
                });
        }

        function updateUser(userId, user){
            var url = "/api/assignment/user"+userId;
            return $http.put(url, user)
                .then(function(){

                })
        }

        function deleteUser(userId){
            var url = "/api/assignment/user"+userId;
            return $http.delete(url)
                .then(function(){

                })
        }

    }
})();