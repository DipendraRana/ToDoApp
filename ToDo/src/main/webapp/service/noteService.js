var ToDo = angular.module('ToDo');
ToDo.factory('noteService', function($http) {
	var notes={};
	notes.service = function(url, method, token, note) {
		return $http({
			method : method,
			url : url,
			data : note,
			headers : {
				'token' : token
			}

		});
	}
	notes.collaboratedUser = function(url, method, token, note, emailId){
		return $http({
			method : method,
			url : url,
			data : note,
			headers : {
				'token' : token,
				'emailId': emailId
			}
		});
	}
	return notes;
});