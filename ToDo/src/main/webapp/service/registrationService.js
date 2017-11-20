var toDo = angular.module('ToDo');
toDo.factory('registrationService', function($http) {
	var details = {};
	details.registerUser = function(user) {
		return $http({
			method : "POST",
			url : 'registration',
			data : user
		})
	}
	return details;
});