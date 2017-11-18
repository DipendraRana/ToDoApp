var ToDo = angular.module('ToDo', [ 'ui.router' ]);
ToDo.config([ '$stateProvider', '$urlRouterProvider',

function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('login', {
		url : '/login',
		templateUrl : 'template/login.html',
		controller : 'loginController'
	});
	$urlRouterProvider.otherwise('login');
} ]);
