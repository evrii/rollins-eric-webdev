(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);
    
    function profileController($location,
                               $routeParams,
                               currentUser,
                               userService) {
        var model = this;

        model.userId = currentUser._id;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        function init() {
            renderUser(currentUser);
        }
        init();

        function renderUser(response) {
            console.log(response);
            model.user = response;
        }

        function userError(error) {
            model.error = "User not found";

        }

        function updateUser(user){
            userService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "User update was succesful";
            });
        }

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/')
                },
                function () {
                    model.error = 'Unable to register you';
                })
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }


    }
})();