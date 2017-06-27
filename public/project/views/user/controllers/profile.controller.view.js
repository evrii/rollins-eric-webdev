(function () {
    angular
        .module('LEARN')
        .controller('profileController', profileController);
    
    function profileController($location,
                               $routeParams,
                               currentUser,
                               userService,
                               curriculumService,
                               contentService
    ) {
        var model = this;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;
        model.removeCurriculumFromStudent = removeCurriculumFromStudent;
        model.deleteCurriculum = deleteCurriculum;
        model.setCurrentUser = setCurrentUser;
        model.addFriend = addFriend;
        model.deleteFriend = deleteFriend;
        model.addCurriculumToUser = addCurriculumToUser;
        model.createUser = createUser;

        function init() {
            model.userId = currentUser._id;
            model.admin = currentUser.userType === 'admin';

            if(model.admin){
                userService
                    .findAllUsers()
                    .then(renderUsers, userError);
                curriculumService
                    .findAllCurriculum()
                    .then(renderMasterCurriculumList)
                userService
                    .findAllUserTypes()
                    .then(function (userTypes) {
                        model.userTypes = userTypes;
                        model.userType = model.userTypes[0];
                    });
            }
            else{
                renderUser(currentUser);
            }


        }
        init();

        function renderUser(response) {
            if(!model.admin){
                model.user = response;
                renderDetails();
            }
        }

        function renderDetails() {
            if (model.user) {
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
        }

        function renderUsers(response) {
            model.users = response;
            renderDetails();
        }

        function userError(error) {
            model.error = "User not found"

        }

        function setCurrentUser(adminUser) {
            model.userId = adminUser._id;
            model.user = adminUser;
            renderDetails();
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
        
        function removeCurriculumFromStudent(curriculum) {
            userService
                .removeCurriculumFromStudent(curriculum._id, model.userId)
                .then(function (response) {
                    curriculumService
                        .findAllCurriculumForUser(model.userId)
                        .then(renderCurriculumList);
                }, function (response) {
                    var o = 1;
                })
        }

        function deleteCurriculum(curriculum){
            curriculumService
                .deleteCurriculum(curriculum._id)
                .then(function(response){
                    curriculumService
                        .findAllCurriculumForUser(model.userId)
                        .then(renderCurriculumList);
                }, function (response) {
                    var y = 9;
                })
        }

        function renderMasterCurriculumList(response) {
            model.curriculumList = response;
        }

        function addFriend(friendId) {
            userService
                .addFriend(model.user._id, friendId)
                .then(renderDetails);
        }

        function deleteFriend(friendId) {
            userService
                .deleteFriend(model.user._id, friendId)
                .then(renderDetails);
        }

        function addCurriculumToUser(curriculimId){
            userService
                .addCurriculumToUser(curriculimId, model.user._id)
                .then(renderDetails);
        }

        function createUser(newUser){
            userService
                .createUser(newUser)
                .then(renderDetails);
        }

    }
})();