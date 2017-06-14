(function () {
    angular
        .module('LEARN')
        .controller('friendProfileController', friendProfileController);
    
    function friendProfileController($location, $routeParams, userService) {
        var model = this;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            model.userId = $routeParams['friendId'];
            model.originalId = $routeParams['userId'];
            userService
                .findUserById(model.userId)
                .then(renderUser, userError);
        }
        init();



        function renderUser(response) {
            console.log(response);
            model.user = response;
        }

        function userError(error) {
            model.error = "User not found"

        }

        function updateUser(user){
            userService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "User update was succesful"
            });
        }

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/')
                },
                function () {


                })

        }


    }
})();