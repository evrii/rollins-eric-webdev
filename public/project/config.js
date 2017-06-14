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
            .when('/user/:userId', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model'
            })
            .when('/user/:userId/users', {
                templateUrl: 'views/user/templates/user-list.view.client.html',
                controller: 'userListController',
                controllerAs: 'model'
            })
            .when('/user/:userId/friend/:friendId', {
                templateUrl: 'views/user/templates/friend.view.client.html',
                controller: 'friendController',
                controllerAs: 'model'
            })
            .when('/experiment', {
                templateUrl: 'experiment.html',
            })
            .when('/content', {
                templateUrl: 'views/content/templates/course-search.view.client.html',
                controller: 'ContentSearchController',
                controllerAs: 'model'
            })
    }}
)();