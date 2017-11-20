var toDo = angular.module('ToDo');
toDo.factory('loginService', function($http) {
	var details = {};
	details.loginUser = function(user) {
		return $http({
			method : 'POST',
			url : 'login',
			data : user
		})
	}
	return details;
});