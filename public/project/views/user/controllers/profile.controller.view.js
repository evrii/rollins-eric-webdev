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

        model.userId = currentUser._id;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;
        model.removeCurriculumFromStudent = removeCurriculumFromStudent;
        model.deleteCurriculum = deleteCurriculum;

        function init() {
            renderUser(currentUser);
            curriculumService
                .findAllCurriculumForUser(model.userId)
                .then(renderCurriculumList);
            contentService
                .findAllContentForUser(model.userId)
                .then(renderContentList);

        }
        init();

        function renderUser(response) {
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

    }
})();