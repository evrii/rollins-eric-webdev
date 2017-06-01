(function () {
    angular
        .module('WAM')
        .controller('registerController', registerController);
    
    function registerController($location, userService) {
        var model = this;

        model.register = register;

        function register (username, password, password2) {
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
                        model.error = "";
                    },
                    function(){
                        var newUser = {
                            username: username,
                            password: password
                        }
                        return userService
                            .createUser(newUser);

                    }
                )
                .then(function (user){
                    $location.url('/user/'+userId)
                });

            if(password === null ||
                typeof password === 'undefined'){
                model.error = "Please enter a value for password"
                return;
            }

            if(password !== password2) {
                model.error = "Sorry, your passwords do not match."
                return;
            }

            if(found !== null){
                model.error = "Sorry, it looks like the username '"+ username +"' is already taken."
            } else {
                var newUser = {
                    username: username,
                    password: password
                };
                newUser = userService.createUser(newUser);
                $location.url('/user/' + newUser._id)
            }
        }

    }
})();