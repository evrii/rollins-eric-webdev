(function () {
    angular
        .module('LEARN')
        .config(configuration);
    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html'
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/profile', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/users', {
                templateUrl: 'views/user/templates/user-list.view.client.html',
                controller: 'userListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/:friendId', {
                templateUrl: 'views/user/templates/other-profile.view.client.html',
                controller: 'otherProfileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/:userId/course/search', {
                templateUrl: 'views/content/templates/course-search.view.client.html',
                controller: 'CourseSearchController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/experiment', {
                templateUrl: 'experiment.html',
            })
            .when('/content', {
                templateUrl: 'views/content/templates/course-search.view.client.html',
                controller: 'ContentSearchController',
                controllerAs: 'model'
            })
            .when('/curriculum/new', {
                templateUrl: 'views/curriculum/templates/curriculum-new.view.client.html',
                controller: 'curriculumNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/curriculum/search', {
                templateUrl: 'views/curriculum/templates/curriculum-search.view.client.html',
                controller: 'curriculumSearchController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/curriculum/:curriculumId/edit', {
                templateUrl: 'views/curriculum/templates/curriculum-edit.view.client.html',
                controller: 'curriculumEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/curriculum/:curriculumId/course/search', {
                templateUrl: 'views/content/templates/course-search.view.client.html',
                controller: 'CourseSearchController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/guestHome', {
                templateUrl: 'views/user/templates/guest-home.view.client.html',
                // controller: 'CourseSearchController',
                // controllerAs: 'model',
                // resolve: {
                //     currentUser: {_id:"Guest"}
                // }
            })


    }

    function testFunction() {
        var t = 7;
        var user = {};
        user.name = "Fred";
        return {};
    }

    function checkLoggedIn(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            }, function (response) {
                var t = 7;
            });

        return deferred.promise;
    }

    function checkCurrentUser() {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

})();