var ToDo = angular.module('ToDo', [ 'ui.router', 'ngResource', 'ngSanitize',
		'ui.bootstrap' ]);
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
		controller : 'homeController'
	});
	$stateProvider.state('socialtohome', {
		url : '/home/',
		templateUrl : 'template/home.html',
		controller : 'homeController'
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
	$stateProvider.state('intermediate', {
		url : '/intermediate',
		controller : 'intermediateController'
	});
	$stateProvider.state('trash', {
		url : '/trash',
		templateUrl : 'template/trash.html',
		controller : 'homeController'
	});
	$stateProvider.state('archive', {
		url : '/archive',
		templateUrl : 'template/archive.html',
		controller : 'homeController'
	});
	$urlRouterProvider.otherwise('login');
} ]);