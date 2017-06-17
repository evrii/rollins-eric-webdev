(function () {
    angular
        .module('WAM')
        .controller('mainController', mainController);

    function mainController(currentUser,
                            userService) {
        var model = this;
        model.currentUser = currentUser;
        model.logout = logout;
    }

    function logout() {
        userService
            .logout()
            .then(function () {
                $location.url('/login');
            });
    }
})();