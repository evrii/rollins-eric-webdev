(function () {
    angular
        .module('LEARN')
        .controller('otherProfileController', otherProfileController);
    
    function otherProfileController($location,
                                    $routeParams,
                                    currentUser,
                                    userService,
                                    curriculumService,
                                    contentService) {
        var model = this;

        function init() {
            model.userId = $routeParams['friendId'];
            model.originalId = currentUser._id;
            userService
                .findUserById(model.userId)
                .then(renderUser, userError);
            curriculumService
                .findAllCurriculumForUser(model.userId)
                .then(renderCurriculumList);
            contentService
                .findAllContentForUser(model.userId)
                .then(renderContentList);
            userService
                .findAllFriendsOfUser(model.userId)
                .then(renderFriendList);
            userService
                .findAllFollowersOfUser(model.userId)
                .then(renderFollowerList);
        }
        init();

        function renderUser(response) {
            console.log(response);
            model.user = response;
        }

        function userError(error) {
            model.error = "User not found"

        }

        function renderCurriculumList(curriculumList) {
            model.user.curriculumList = curriculumList;
        }

        function renderContentList(contentList) {
            model.user.contentList = contentList;
        }

        function renderFriendList(friendList) {
            model.user.friendList = friendList;
        }

        function renderFollowerList(followerList) {
            model.user.followerList = followerList;
        }


    }
})();