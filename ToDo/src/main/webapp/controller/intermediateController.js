var ToDo = angular.module("ToDo");
ToDo.controller('intermediateController', function(intermediateService,$location) {
		var message = intermediateService.getToken();
		message.then(function(response) {
			console.log(response.headers('token'));
				localStorage.setItem('token', response.headers('token'));
				$location.path("home");
		});
});