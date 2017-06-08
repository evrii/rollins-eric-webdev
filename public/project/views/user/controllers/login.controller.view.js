(function () {
    angular
        .module('LEARN')
        .controller('loginController', loginController);
    
    function loginController($location, userService) {
        var model = this;

        model.login = login;

        function login(username, password) {
            //var found = userService.findUserByCredentials(username, password);
            userService
                .findUserByCredentials(username, password)
                .then(function (found) {
                    if (found !== null) {
                        $location.url('/user/' + found._id)
                    } else {
                        model.message = "Sorry, " + username + ", you do not exist!"
                    }
                });
        }
    }
})();