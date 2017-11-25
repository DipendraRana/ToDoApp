var ToDo = angular.module("ToDo");
ToDo.controller('homeController', function($scope, noteService, $location,
		$uibModal) {
	$scope.logoutUser = function() {
		localStorage.removeItem("token");
		history.pushState("", document.title, $location.pathname //removes # and its associated value
                + $location.search);
		/*var uri = window.location.toString();
	    if (uri.indexOf("#") > 0) {
	        var clean_uri = uri.substring(0, uri.indexOf("#"));
	        window.history.replaceState({}, document.title, clean_uri);
	    }*/
		$location.path("login");
	}
	
	var tokenGetter=function(){
		var token = localStorage.getItem('token');
		if (token == null || token == "")
			token = $location.hash();
		return token;
	}

	var getNotes = function() {
		var token = tokenGetter();
		if (token != null || token != "") {
			var url = 'getNotes';
			var notes = noteService.service(url, 'GET', token);
			notes.then(function(response) {
				$scope.notes = response.data;
			}, function(response) {
				$scope.error = response.data.message;
			});
			$scope.notes = notes;
		} else
			$location.path("login");
	}

	$scope.deleteNote = function(note) {
		var token = tokenGetter();
		if (token != null || token != "") {
			note.trashed = true;
			var url = 'deleteNote';
			var notes = noteService.service(url, 'POST', token, note);
			notes.then(function(response) {
				if (response.data.message == "Token Expired")
					$location.path("/login");
				else
					getNotes();
			}, function(response) {
				getNotes();
				$scope.error = response.data.message;
			});
		} else
			$location.path("login");
	}

	$scope.createNote = function() {
		var token = tokenGetter();
		if (token != null || token != "") {
			if ($scope.newNote.noteTitle != ''
					|| $scope.newNote.noteDescription != '') {
				var url = 'saveNote';
				var notes = noteService.service(url, 'POST', token,
						$scope.newNote);
				notes.then(function(response) {
					if (response.data.message == "Token Expired")
						$location.path("/login");
					else
						getNotes();
				}, function(response) {
					$scope.error = response.data.message;

				});
			}
		} else
			$location.path("login");

	}

	$scope.updateNote = function(note) {
		var token = tokenGetter();
		if (token != null || token != "") {
			var url = 'updateNote';
			var notes = noteService.service(url, 'PUT', token, note);
			notes.then(function(response) {
				modalInstance.close();
				if (response.data.message == "Token Expired")
					$location.path("/login");
			}, function(response) {
				$scope.error = response.data.message;

			});
		} else
			$location.path("login");
	}

	$scope.showModal = function(note) {
		$scope.note = note;
		modalInstance = $uibModal.open({
			templateUrl : 'template/editNote.html',
			scope : $scope,
			size : 'md'
		});
	};

	getNotes();
});