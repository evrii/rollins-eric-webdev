(function () {
    angular
        .module('LEARN')
        .controller('userListController', userListController);
    
    function userListController($location,
                                $routeParams,
                                currentUser,
                                userService) {
        var model = this;

        model.addFriend = addFriend;
        model.deleteFriend = deleteFriend;

        function init() {
            model.userId = currentUser._id;
            userService
                .findAllUsers()
                .then(renderUsers, userError);
            userService
                .findUserById(model.userId)
                .then(renderUser, userError)
        }
        init();

        function renderUser(response) {
            console.log(response);
            model.user = response;
        }

        function renderUsers(response) {
            console.log(response);
            model.users = response;
        }

        function userError(error) {
            model.error = "User not found"

        }

        function addFriend(friendId){
            userService
                .addFriend(model.userId, friendId)
                .then(function () {
                    $location.url('/profile');
                });
        }

        function deleteFriend(user) {
            userService
                .deleteFriend(user._id)
                .then(function () {
                    $location.url('/')
                },
                function () {


                })

        }


    }
})();