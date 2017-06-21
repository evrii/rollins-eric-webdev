(function () {
    angular
        .module('LEARN')
        .controller('registerController', registerController);
    
    function registerController($location, userService) {
        var model = this;

        model.register = register;

        function init() {
            userService
                .findAllUserTypes()
                .then(function (userTypes) {
                    model.userTypes = userTypes;
                });
        }
        init();

        function register (username, password, password2, userType) {
            if(username === null ||
                username === '' ||
                typeof username === 'undefined'){
                model.error = "Please enter a valid username"
                return;
            }

            if(password !== password2){
                model.error = "Passwords must match"
                return;
            }
            userService
                .findUserByUsername(username)
                .then(
                    function(){
                        model.error = "Sorry, that username is taken.";
                    },
                    function(){
                        var newUser = {
                            username: username,
                            password: password
                        }
                        return userService
                            .register(newUser)
                            .then(function (usr){
                                $location.url('/profile');
                            });

                    }
                );

        }

    }
})();