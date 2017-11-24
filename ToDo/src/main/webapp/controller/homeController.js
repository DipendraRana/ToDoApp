var ToDo = angular.module("ToDo");
ToDo.controller('homeController', function($scope,noteService, $location) {
	$scope.logoutUser = function() {
		localStorage.removeItem("token");
		$location.path("login");
	}
	
	var getNotes = function() {
		var token = localStorage.getItem('token');
		var url = 'getNotes';
		var notes = noteService.service(url,'GET',token);
		console.log(notes);
		notes.then(function(response) {
			console.log('received notes ..,.');
			$scope.notes = response.data;
		}, function(response) {
			console.log('Errr....');
			$scope.error = response.data.message;
		});
		$scope.notes = notes;
	}
	
	$scope.createNote = function() {

		var token = localStorage.getItem('token');
		var noteTitle = angular.element(document
				.querySelector('#note-title'));

		var noteBody = angular.element(document
				.querySelector('#note-body'));

		if ($scope.newNote.noteTitle != '' || $scope.newNote.noteDescription != '') {
			var url = 'saveNote';
			var notes = noteService.service(url, 'POST', token,
					$scope.newNote);

			noteTitle.empty();
			noteBody.empty();
			notes.then(function(response) {
				getNotes();

			}, function(response) {
				$scope.error = response.data.message;

			});
		}
	}
	
	getNotes();
});