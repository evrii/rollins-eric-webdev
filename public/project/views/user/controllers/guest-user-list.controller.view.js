(function () {
    angular
        .module('LEARN')
        .controller('guestUserListController', guestUserListController);
    
    function guestUserListController($location,
                                $routeParams,
                                userService) {
        var model = this;

        function init() {
            model.guest = true;
            userService
                .findAllUsers()
                .then(renderUsers);
        }
        init();

        function renderUsers(response) {
            console.log(response);
            model.users = response;
        }
    }
})();