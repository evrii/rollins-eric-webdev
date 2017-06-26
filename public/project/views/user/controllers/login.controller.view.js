(function () {
    angular
        .module('LEARN')
        .controller('loginController', loginController);
    
    function loginController($location, userService) {
        var model = this;

        model.login = login;
        model.guestBrowse = guestBrowse;

        function login(username, password) {
            userService
                .login(username, password)
                .then(function (found) {
                    if (found) {
                        $location.url('/profile');
                    } else {
                        model.message = "Sorry, " + username + ", you do not exist!"
                    }
                }, function (response) {
                    model.message = "Sorry, " + username + ", those credentials are incorrect!"
                });
        }
        
        function guestBrowse() {
            $location.url('/guest');
        }
    }
})();