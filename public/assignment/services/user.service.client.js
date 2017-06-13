(function () {
    angular
        .module('WAM')
        .factory('userService', userService)

    function userService($http) {

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser
        }
        return api;
        
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