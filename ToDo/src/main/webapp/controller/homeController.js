var ToDo = angular.module("ToDo");
ToDo.controller('homeController', function($scope, noteService, $location,
		$uibModal) {
	$scope.notes = [];
	
	$scope.logoutUser=function(){
		logout();
	}
	
	var logout = function() {
		localStorage.removeItem("token");
		$location.path("login");
	}
	
	var navBarNameChange=function(){
		if($location.path()=="/home"){
			$scope.navBarName="FunDoNote";
			$scope.navBarColor="#ff9900";
		}
		else if ($location.path()=="/trash"){
			$scope.navBarName="Trash";
			$scope.navBarColor="#555457";
		}
		else if ($location.path()=="/archive"){
			$scope.navBarName="Archive";
			$scope.navBarColor="#5B9B9D";
		}
	}

	var getNotes = function() {
		var token = localStorage.getItem('token');
		if (token != null && token != "") {
			var url = 'getNotes';
			var notes = noteService.service(url, 'GET', token);
			notes.then(function(response) {
				if (response.data == "")
					logout();
				else
					$scope.notes = response.data;
			});
		} else
			$location.path("login");
	}

	$scope.pinNote = function(note) {
		var token = localStorage.getItem('token');
		if (token != null && token != "") {
			note.archived = false;
			note.pinned = true;
			var url = 'updateNote';
			var notes = noteService.service(url, 'PUT', token, note);
			notes.then(function(response) {
				if (response.data.message == "Token Expired")
					$location.path("login");
				else
					getNotes();
			}, function(response) {
				getNotes();
				$scope.error = response.data.message;
			});
		} else
			$location.path("login");
	}

	$scope.unpinNote = function(note) {
		var token = localStorage.getItem('token');
		if (token != null && token != "") {
			note.archived = false;
			note.pinned = false;
			var url = 'updateNote';
			var notes = noteService.service(url, 'PUT', token, note);
			notes.then(function(response) {
				if (response.data.message == "Token Expired")
					$location.path("login");
				else
					getNotes();
			}, function(response) {
				getNotes();
				$scope.error = response.data.message;
			});
		} else
			$location.path("login");
	}

	$scope.deleteNotePermanently = function(note) {
		var token = localStorage.getItem('token');
		if (token != null && token != "") {
			var url = 'deleteNote';
			var notes = noteService.service(url, 'PUT', token, note);
			notes.then(function(response) {
				if (response.data.message == "Token Expired")
					$location.path("login");
				else
					getNotes();
			}, function(response) {
				getNotes();
				$scope.error = response.data.message;
				;
				$stateProvider
			});
		} else
			$location.path("login");
	}

	$scope.archiveNote = function(note) {
		var token = localStorage.getItem('token');
		if (token != null && token != "") {
			note.archived = true;
			note.pinned = false;
			var url = 'updateNote';
			var notes = noteService.service(url, 'PUT', token, note);
			notes.then(function(response) {
				if (response.data.message == "Token Expired")
					$location.path("login");
				else
					getNotes();
			}, function(response) {
				getNotes();
				$scope.error = response.data.message;
			});
			;
			$stateProvider
		} else
			$location.path("login");
	}

	$scope.unarchiveNote = function(note) {
		var token = localStorage.getItem('token');
		if (token != null && token != "") {
			note.archived = false;
			note.pinned = false;
			var url = 'updateNote';
			var notes = noteService.service(url, 'PUT', token, note);
			notes.then(function(response) {
				if (response.data.message == "Token Expired")
					$location.path("login");
				else
					getNotes();
			}, function(response) {
				getNotes();
				$scope.error = response.data.message;
			});
		} else
			$location.path("login");
		;
		$stateProvider
	}

	$scope.deleteNote = function(note) {
		var token = localStorage.getItem('token');
		if (token != null && token != "") {
			note.trashed = true;
			note.archived = false;
			note.pinned = false;
			var url = 'updateNote';
			var notes = noteService.service(url, 'PUT', token, note);
			notes.then(function(response) {
				if (response.data.message == "Token Expired")
					$location.path("login");
				else
					getNotes();
			}, function(response) {
				getNotes();
				$scope.error = response.data.message;
			});
		} else
			$location.path("login");
		;
	}

	$scope.restoreNote = function(note) {
		var token = localStorage.getItem('token');
		if (token != null && token != "") {
			note.trashed = false;
			var url = 'updateNote';
			var notes = noteService.service(url, 'PUT', token, note);
			notes.then(function(response) {
				if (response.data.message == "Token Expired")
					$location.path("login");
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
		var token = localStorage.getItem('token');
		if (token != null && token != "") {
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

	$scope.createCopyOfNote = function(note) {
		var token = localStorage.getItem('token');
		if (token != null && token != "") {
			if (note.noteTitle != '' || note.noteDescription != '') {
				note.archived = false;
				note.pinned = false;
				var url = 'saveNote';
				var notes = noteService.service(url, 'POST', token, note);
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
		var token = localStorage.getItem('token');
		if (token != null && token != "") {
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
	
	navBarNameChange();
});