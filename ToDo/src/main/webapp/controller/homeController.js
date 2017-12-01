var ToDo = angular.module("ToDo");
ToDo.controller('homeController', function($scope, noteService, labelService,
		$location, $uibModal) {
	$scope.notes = [];
	$scope.labels = [];
	$scope.labelName = [];

	$scope.logoutUser = function() {
		logout();
	}

	/*------------------------Navigation Bar Name Change--------------------------------------------------*/
	var navBarNameChange = function() {

		if ($location.path() == "/home") {
			$scope.navBarName = "FunDoNote";
			$scope.navBarColor = "#ff9900";
		} else if ($location.path() == "/trash") {
			$scope.navBarName = "Trash";
			$scope.navBarColor = "#555457";
		} else if ($location.path() == "/archive") {
			$scope.navBarName = "Archive";
			$scope.navBarColor = "#5B9B9D";
		} else {
			$scope.navBarName = $location.path().substr(1);
			$scope.navBarColor = "#4E5C4D";
		}
	}

	/*------------------------Logout User--------------------------------------------------*/
	var logout = function() {
		localStorage.removeItem("token");
		$location.path("login");
	}

	/*------------------------get Labels--------------------------------------------------*/
	var getLabels = function() {
		var token = localStorage.getItem('token');
		if (token != null && token != "") {
			var url = 'getLabels';
			var labels = noteService.service(url, 'GET', token);
			labels.then(function(response) {
				$scope.labels = response.data;
			});
		} else
			$location.path("login");
	}

	/*------------------------get Notes--------------------------------------------------*/
	var getNotes = function() {
		var token = localStorage.getItem('token');
		if (token != null && token != "") {
			var url = 'getNotes';
			var notes = noteService.service(url, 'GET', token);
			notes.then(function(response) {
				if (response.headers('Error') == "Expired")
					logout();
				else {
					getLabels();
					$scope.notes = response.data;
				}
			});
		} else
			$location.path("login");
	}

	/*------------------------Check The Labels--------------------------------------------------*/
	$scope.checked = function(note, label) {
		var checkedLabels = note.labels;
		for (var labelNo = 0; labelNo < checkedLabels.length; labelNo++) {
			if (checkedLabels[labelNo].labelName == label.labelName)
				return true;
		}
		return false;
	}

	/*------------------------Pin Notes--------------------------------------------------*/
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

	/*------------------------UnPin Notes--------------------------------------------------*/
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

	/*------------------------Delete Note Permanently--------------------------------------------------*/
	$scope.deleteNotePermanently = function(note) {
		var token = localStorage.getItem('token');
		if (token != null && token != "") {
			var url = 'deleteNote';
			var notes = noteService.service(url, 'PUT', token, note);
			modalInstance.close();
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

	/*------------------------Delete Note--------------------------------------------------*/
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

	/*------------------------Unarchive Notes--------------------------------------------------*/
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

	/*------------------------Delete Note--------------------------------------------------*/
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

	/*------------------------Restore Notes--------------------------------------------------*/
	$scope.restoreNote = function(note) {
		var token = localStorage.getItem('token');
		if (token != null && token != "") {
			note.trashed = false;
			var url = 'updateNote';
			var notes = noteService.service(url, 'PUT', token, note);
			modalInstance.close();
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

	/*------------------------Create Notes--------------------------------------------------*/
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

	/*------------------------Create Copy Of Note--------------------------------------------------*/
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

	/*------------------------Update Note--------------------------------------------------*/
	$scope.updateNote = function(note) {
		var token = localStorage.getItem('token');
		if (token != null && token != "") {
			var url = 'updateNote';
			var notes = noteService.service(url, 'PUT', token, note);
			notes.then(function(response) {
				modalInstance.close();
				if (response.data.message == "Token Expired")
					$location.path("/login");
				else
					getNotes();
			}, function(response) {
				$scope.error = response.data.message;

			});
		} else
			$location.path("login");
	}

	/*------------------------Update Note with Label--------------------------------------------------*/
	$scope.attachLabelToNote = function(note, label) {
		var token = localStorage.getItem('token');
		if (token != null && token != "") {
			var url = 'updateNote';
			note.labeled = true;
			note.labels.push(label);
			var notes = noteService.service(url, 'PUT', token, note);
			notes.then(function(response) {
				if (response.data.message == "Token Expired")
					$location.path("/login");
				else
					getNotes();
			}, function(response) {
				$scope.error = response.data.message;

			});
		} else
			$location.path("login");
	}

	/*------------------------Remove Label From Notes--------------------------------------------------*/
	$scope.removeLabelFromNotes = function(note, label, $index) {
		var token = localStorage.getItem('token');
		if (token != null && token != "") {
			var url = 'updateNote/';
			note.labels.splice($index, 1);
			if (note.labels.length == 0)
				note.labeled = false;
			var notes = noteService.service(url, 'PUT', token, note);
			notes.then(function(response) {
				if (response.data.message == "Token Expired")
					$location.path("/login");
				else
					getNotes();
			}, function(response) {
				$scope.error = response.data.message;

			});
		} else
			$location.path("login");
	}

	/*------------------------Remove Label--------------------------------------------------*/
	$scope.removeLabel = function(label) {
		var token = localStorage.getItem('token');
		if (token != null && token != "") {
			var url = 'deleteLabel';
			var labels = labelService.service(url, 'PUT', token, label);
			labels.then(function(response) {
				if (response.data.message == "Token Expired")
					$location.path("/login");
				else
					getLabels();
			}, function(response) {
				$scope.error = response.data.message;

			});
		} else
			$location.path("login");
	}

	/*------------------------Update Label--------------------------------------------------*/
	$scope.updateLabel = function(label) {
		var token = localStorage.getItem('token');
		if (token != null && token != "") {
			console.log(label.labelName);
			var url = 'updateLabel';
			var labels = labelService.service(url, 'PUT', token, label);
			labels.then(function(response) {
				if (response.data.message == "Token Expired")
					$location.path("/login");
				else
					getLabels();
			}, function(response) {
				$scope.error = response.data.message;

			});
		} else
			$location.path("login");
	}

	/*------------------------Add Label--------------------------------------------------*/
	$scope.addLabel = function(label) {
		var token = localStorage.getItem('token');
		if (token != null && token != "") {
			var url = 'createLabel';
			var labels = labelService.service(url, 'POST', token, label);
			labels.then(function(response) {
				if (response.data.message == "Token Expired")
					$location.path("/login");
				else
					getLabels();
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

	$scope.showModalLabel = function() {
		modalInstance = $uibModal.open({
			templateUrl : 'template/LabelEdit.html',
			scope : $scope,
			size : 'sm'
		});
	};

	$scope.change = function(active, label, note, $index) {
		if (active) {
			$scope.labelName = label.labelName;
			$scope.attachLabelToNote(note, label);
		} else if (!active) {
			$scope.removeLabelFromNotes(note, label, $index);
		}
	};

	getNotes();

	navBarNameChange();
});