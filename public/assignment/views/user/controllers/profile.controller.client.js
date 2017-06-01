(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);
    
    function profileController($location, $routeParams, userService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        //model.user = userService.findUserById(model.userId);
        userService
            .findUserById(model.userId)
            .then(renderUser);

        function updateUser(){
            userService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "User update was succesful"
            });
        }

        function deleteUser(userId) {
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