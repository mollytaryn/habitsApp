angular
  .module('habitracker')
  .config(habitConfig);

function habitConfig($routeProvider) {
  $routeProvider
    .when('/habit', {
      templateUrl: 'habit.html',
      controller: 'HabitController',
      controllerAs: 'habits'
    })
    .when('/welcome', {
      templateUrl: 'welcome.html',
      controller: 'HabitController',
      controllerAs: 'habit'
    })
    .otherwise({
      redirectTo: '/habit'
    });
}
