var ToDo = angular.module('ToDo', [ 'ui.router' ]);
ToDo.config([ '$stateProvider', '$urlRouterProvider',

function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('login', {
		url : '/login',
		templateUrl : 'template/login.html',
		controller : 'loginController'
	});
	$stateProvider.state('register',{
		url:'/registration',
		templateUrl:'template/registration.html',
		controller:'registrationController'
	});
	$stateProvider.state('emailEnter',{
		url:'/forgotPassword',
		templateUrl:'template/emailEnter.html',
		controller:'enterEmailController'
	});
	$urlRouterProvider.otherwise('login');
} ]);
