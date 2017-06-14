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
            userService
                .findUserByUsername(username)
                .then(
                    function(){
                        model.error = "Sorry, that username is taken.";
                    },
                    function(){
                        var newUser = {
                            username: username,
                            password: password,
                            userType: userType
                        }
                        return userService
                            .createUser(newUser)
                            .then(function (user){
                                $location.url('/user/'+user._id)
                            });

                    }
                );

        }

    }
})();