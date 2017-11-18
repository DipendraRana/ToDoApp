var user = angular.module("ToDo");
user.controller('loginController', function($scope, loginService, $location) {
	$scope.loginUser = function() {
		var message = loginService.loginUser($scope.user, $scope.error);
		message.then(function(response) {
			console.log(response.data.message);
			localStorage.setItem('token', response.headers('token'));
			/*$location.path();*/
		}, function() {
			$scope.error = response.data.message;
		});
	}
});