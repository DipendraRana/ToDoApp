/*var toDo = angular.module('Note',['ngResource']);
toDo.factory('noteService', function($http,$resource) {
	var details = {};
	var token = localStorage.getItem('token');
	details.noteSave = function(note, token) {
		return $http({
			method : 'POST',
			url : 'saveNote',
			data : note,
			headers : {
				"token" : token
			}
		})
	}
	details.deleteNote = function(note, token) {
		return $http({
			method : 'DELETE',
			url : $resource('/deleteNote/:noteId', {noteId: '@id'}, actions),
			data : note,
			headers : {
				"token" : token
			}
		})
	}
	return details;
});*/