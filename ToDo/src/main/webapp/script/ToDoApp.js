var ToDo = angular.module('ToDo', [ 'ui.router','ngResource','ngSanitize']);
ToDo.config([ '$stateProvider', '$urlRouterProvider',

function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('login', {
		url : '/login',
		templateUrl : 'template/login.html',
		controller : 'loginController'
	});
	$stateProvider.state('register', {
		url : '/registration',
		templateUrl : 'template/registration.html',
		controller : 'registrationController'
	});
	$stateProvider.state('home', {
		url : '/home',
		templateUrl : 'template/home.html',
		controller: 'homeController'
	});
	$stateProvider.state('enterEmail', {
		url : '/enterEmail',
		templateUrl : 'template/emailEnter.html',
		controller : 'enterEmailController'
	});
	$stateProvider.state('resetPassword', {
		url : '/resetPassword/',
		templateUrl : 'template/resetPassword.html',
		controller : 'resetPasswordController'
	});
	$urlRouterProvider.otherwise('login');
} ]);