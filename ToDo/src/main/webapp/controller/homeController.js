var ToDo = angular.module("ToDo");
ToDo.controller('homeController',
				function($scope, noteService, labelService, toastr, $location,
						$uibModal, $interval, $filter ,$timeout,fileReader) {
	
					$scope.notes = [];
					$scope.labels = [];
					$scope.labelName = [];
					$scope.colors = [];
					$scope.collaborators=[];
					$scope.users=[];
					$scope.owner;
					
					$scope.logoutUser = function() {
						logout();
					}
					
					$scope.newNotes = function() {
						
					}
					
					$scope.chageToSearch = function() {
						$location.path('search');
					}
					
					$scope.chageToHome = function() {
						$location.path('home');
					}
					
					/*------------------------Hiding the Note Data--------------------------------------------------*/
					var dontShow = function(){
						$('#note-title').hide();
						$('#note_icons').hide();
					}
					
					/*------------------------Check for Duplicate Label--------------------------------------------------*/
					var checkForDuplicateLabel = function(label){
						for(var labelNo=0;labelNo<$scope.labels.length;labelNo++){
							if($scope.labels[labelNo].labelName==label.labelName)
								return true;
							else
								return false;
						}
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
						} else if ($location.path() == "/reminders") {
							$scope.navBarName = "Reminders";
							$scope.navBarColor = "#4E5C4D";
						} else if ($location.path() == "/search") {
							$scope.navBarName = "FunDoNote";
							$scope.navBarColor = "#0734EF";
						} else {
							$scope.navBarName = $location.path().substr(1);
							$scope.navBarColor = "#4E5C4D";
						}
					}

					/*------------------------Constantly Check for reminder time--------------------------------------------------*/
					var intervalFunction = function() {
						$interval(
								function() {
									notes = $scope.notes;
									for (var noteCount = 0; noteCount < notes.length; noteCount++) {
										if (notes[noteCount].reminderDate != 0
												&& notes[noteCount].reminderTime != "") {
											var currentDate = $filter('date')(
													new Date(), 'yyyy-MM-dd');
											var remindedDate = $filter('date')(new Date(notes[noteCount].reminderDate),'yyyy-MM-dd');
											var currentTime = $filter('date')(new Date(), 'h:mm a');
											if (currentDate == remindedDate
													&& currentTime == notes[noteCount].reminderTime) {
												toastr.sucess(notes[noteCount].noteTitle,'Reminder');
												$scope.notes[noteCount].reminder = false;
												$scope.notes[noteCount].reminderDate = null;
												$scope.notes[noteCount].reminderTime = null;
												$scope.updateNote($scope.notes[noteCount]);
											}
										}
									}
								}, 30000);
					}
					
					/*------------------------Color Palette--------------------------------------------------*/
					var colors = [ {
						'color' : '#FFFFFF',
						'tooltip' : 'White',
						'path' : 'images/white.png'
					}, {
						'color' : '#F8BBD0',
						'tooltip' : 'Pink',
						'path' : 'images/pink.png'
					}, {
						'color' : '#DC94F7',
						'tooltip' : 'purple',
						'path' : 'images/purple.png'
					}, {
						'color' : '#82B1FF',
						'tooltip' : 'Dark blue',
						'path' : 'images/darkblue.png'
					}, {
						'color' : '#80D8FF',
						'tooltip' : 'Blue',
						'path' : 'images/blue.png'
					}, {
						'color' : '#CCFF90',
						'tooltip' : 'Green',
						'path' : 'images/green.png'
					}, {
						'color' : '#FF8A80',
						'tooltip' : 'Red',
						'path' : 'images/Red.png'
					}, {
						'color' : '#D5DBDB',
						'tooltip' : 'Grey',
						'path' : 'images/grey.png'
					}, {
						'color' : '#FFD180',
						'tooltip' : 'Orange',
						'path' : 'images/orange.png'
					}, {
						'color' : '#F5F518',
						'tooltip' : 'Yellow',
						'path' : 'images/lightyellow.png'
					}, {
						'color' : '#D7C9C8',
						'tooltip' : 'Brown',
						'path' : 'images/brown.png'
					} ];
					$scope.colors = colors;

					/*------------------------Initially Checks what view to present--------------------------------------------------*/
					var checkForView = function() {
						$scope.icon = localStorage.getItem('icon');
						if ($scope.icon == "glyphicon glyphicon-th-large black") {
							$scope.changeView = "col-md-12 col-sm-12 col-xs-12 col-lg-12";
							$scope.icon = "glyphicon glyphicon-th-large black";
						} else {
							$scope.changeView = "col-md-6 col-sm-6 col-xs-12 col-lg-4";
							$scope.icon = "glyphicon glyphicon-th-list black"
						}
					}

					/*------------------------Logout User--------------------------------------------------*/
					var logout = function() {
						localStorage.removeItem("token");
						localStorage.removeItem("icon");
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
									$scope.changeToDateObject($scope.notes);
								}
							});
						} else
							$location.path("login");
					}
					
					/*------------------------Get The User Profile--------------------------------------------------*/
					var getTheOwner = function() {
						var token = localStorage.getItem('token');
						if (token != null && token != "") {
							var url = 'getOwner';
							var notes = noteService.service(url, 'GET', token);
							notes.then(function(response) {
								if (response.headers('Error') == "Expired")
									logout();
								else {
									getNotes();
									$scope.owner = response.data;
								}
							});
						} else
							$location.path("login");

					}
					
					/*------------------------Get All User Email--------------------------------------------------*/
					$scope.getAllUser = function(){
						var token = localStorage.getItem('token');
						if (token != null && token != "") {
							var url = 'getAllUser';
							var labels = noteService.service(url, 'GET', token);
							labels.then(function(response) {
								$scope.users = response.data;
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

					/*------------------------Delete Note Permanently--------------------------------------------------*/
					$scope.deleteNotePermanently = function(note) {
						var token = localStorage.getItem('token');
						if (token != null && token != "") {
							var url = 'deleteNote';
							var notes = noteService.service(url, 'PUT', token,
									note);
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
									|| $scope.newNote.noteDescription != '' || $scope.newNote.images != '') {
								$scope.newNote.image=null;
								var url = 'saveNote';
								var notes = noteService.service(url, 'POST',
										token, $scope.newNote);
								notes.then(function(response) {
													if (response.data.message == "Token Expired")
														$location
																.path("/login");
													else
														getNotes();
												},
												function(response) {
													$scope.error = response.data.message;

												});
							}
						} else
							$location.path("login");
					}

					/*------------------------Update Note --------------------------------------------------*/
					$scope.updateNote = function(note) {
						var token = localStorage.getItem('token');
						if (token != null && token != "") {
							var url = 'updateNote';
							var notes = noteService.service(url, 'PUT', token,
									note);
							notes.then(function(response) {
								if (response.data.message == "Token Expired")
									$location.path("/login");
								else
									getNotes();
								$scope.getTheCollborators(note);
							}, function(response) {
								$scope.error = response.data.message;

							});
						} else
							$location.path("login");
					}
					
					/*------------------------Update User --------------------------------------------------*/
					$scope.updateUser = function(user) {
						var token = localStorage.getItem('token');
						if (token != null && token != "") {
							var url = 'updateUser';
							var notes = noteService.service(url, 'PUT', token, user);
							notes.then(function(response) {
								if (response.data.message == "Token Expired")
									$location.path("/login");
								else
									getTheOwner();
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
							var labels = labelService.service(url, 'PUT',
									token, label);
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
							var labels = labelService.service(url, 'PUT',
									token, label);
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
						if(!checkForDuplicateLabel(label)){
							var token = localStorage.getItem('token');
							if (token != null && token != "") {
								var url = 'createLabel';
								var labels = labelService.service(url, 'POST',
										token, label);
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
						}else
							document.getElementById("labelmessage").innerHTML = "Label Already Exists";
						
					}

					/*------------------------Changes view to on click--------------------------------------------------*/
					$scope.listView = function() {
						$scope.icon = localStorage.getItem('icon');
						if ($scope.icon == "glyphicon glyphicon-th-list black") {
							$scope.icon = "glyphicon glyphicon-th-large black";
							$scope.changeView = "col-md-12 col-sm-12 col-xs-12 col-lg-12";
							localStorage.setItem('icon', $scope.icon);
						} else {
							$scope.icon = "glyphicon glyphicon-th-list black"
							$scope.changeView = "col-md-6 col-sm-6 col-xs-12 col-lg-4";
							localStorage.setItem('icon', $scope.icon);
						}

					}
					
					/*------------------------Facebook Sharing of Note--------------------------------------------------*/
					$scope.facebookShare = function(note) {
						FB.init({
							appId : '370919266686959',
							status : true,
							cookie : true,
							xfbml : true,
							version : 'v2.4'
						});
						
						FB.ui({
							  method: 'share_open_graph',
							  action_type: 'og.likes',
							  action_properties: JSON.stringify({
							    object:{
							    	'og:title' : note.noteTitle,
									'og:description' : note.noteDescription
							    }
							  })
							}, function(response){
							  console.log(response);
							  	if (response && !response.error_message) {
									toastr.success('Note shared', 'successfully');
							  	} else {
									toastr.success('Note not shared', 'Error');
								}
							});
					}
					
					/*------------------------Getting Collaborators of the Note--------------------------------------------------*/
					$scope.getTheCollborators = function(note , typeOfNote) {
						var token = localStorage.getItem('token');
						if (token != null && token != "") {
							var url = 'getCollaborators';
							var collaborators = noteService.service(url, 'PUT', token , note);
							collaborators.then(function(response) {
								if (response.data.message == "Token Expired")
									$location.path("login");
								else
									$scope.collaborators = response.data;
							}, function(response) {
								$scope.error = response.data.message;
							});
						} else
							$location.path("login");
					}
					
					/*-------------------------Add Collaborators && Get The User Collaborated List---------------------------*/
					$scope.addCollaboraotrs = function(note,emailId) {
						var token = localStorage.getItem('token');
						if (token != null && token != "") {
							modalInstance.close();
							if(emailId!=""&&emailId!=undefined){
								var url = 'addCollaborator';
								var user = noteService.collaboratedUser(url, 'PUT', token, note, emailId);
								user.then(function(response) {
									if (response.headers('Error') == "Expired")
										logout();
									else {
										$scope.collaborators = response.data;
										getNotes();
									}
								});
							}
						} else
							$location.path("login");
					}
					
					/*-------------------------Delete all Notes From Trash---------------------------*/
					$scope.deleteAllNotesFromTrash = function() {
						var token = localStorage.getItem('token');
						if (token != null && token != "") {
							var url = 'emptyTrash';
							var notes = noteService.service(url, 'GET', token);
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
					
					/*-------------------------Remove The User from Collaborated List---------------------------*/
					$scope.removeUserFromCollaboration = function($index,note){
						var token = localStorage.getItem('token');
						if (token != null && token != "") {
							note.collaboratedUser.splice($index,1);
							$scope.updateNote(note);
						}else
							$location.path("login");
					}

					/*------------------------Pin Notes--------------------------------------------------*/
					$scope.pinNote = function(note, $event) {
						$event.stopPropagation();
						note.archived = false;
						note.pinned = true;
						$scope.updateNote(note);
					}

					/*------------------------UnPin Notes--------------------------------------------------*/
					$scope.unpinNote = function(note, $event) {
						$event.stopPropagation();
						note.archived = false;
						note.pinned = false;
						$scope.updateNote(note);
					}

					/*------------------------Archive Note--------------------------------------------------*/
					$scope.archiveNote = function(note) {
						note.archived = true;
						note.pinned = false;
						$scope.updateNote(note);
					}

					/*------------------------Unarchive Notes--------------------------------------------------*/
					$scope.unarchiveNote = function(note) {
						note.archived = false;
						note.pinned = false;
						$scope.updateNote(note);
					}

					/*------------------------Delete Note--------------------------------------------------*/
					$scope.deleteNote = function(note) {
						note.trashed = true;
						note.archived = false;
						note.pinned = false;
						note.reminder = false;
						note.reminderDate = null;
						note.reminderTime = null;
						note.editedDate=new Date();
						$scope.updateNote(note);
					}

					/*------------------------Restore Notes--------------------------------------------------*/
					$scope.restoreNote = function(note) {
						note.trashed = false;
						$scope.updateNote(note);
					}

					/*------------------------Create Copy Of Note--------------------------------------------------*/
					$scope.createCopyOfNote = function(note) {
						note.archived = false;
						note.pinned = false;
						$scope.createNote(note);
					}

					/*------------------------Add reminder To Note--------------------------------------------------*/
					$scope.addReminderToNote = function(note, time) {
						if (note.reminderDate == 0 && note.reminderTime == "") {
							note.reminderDate = null;
							note.reminderTime = null;
						}
						note.reminderTime = time;
						note.reminder = true;
						$scope.updateNote(note);
					}

					/*------------------------remove reminder from Note--------------------------------------------------*/
					$scope.deleteReminderOfNote = function(note) {
						note.reminderDate = null;
						note.reminderTime = null;
						note.reminder = false;
						$scope.updateNote(note);
					}

					/*------------------------Update Note with Label--------------------------------------------------*/
					$scope.attachLabelToNote = function(note, label) {
						note.labeled = true;
						note.labels.push(label);
						$scope.updateNote(note);
					}

					/*------------------------Remove Label From Notes--------------------------------------------------*/
					$scope.removeLabelFromNotes = function(note, label, $index) {
						var url = 'updateNote';
						note.labels.splice($index, 1);
						if (note.labels.length == 0)
							note.labeled = false;
						$scope.updateNote(note);
					}

					/*------------------------Delete Notes from modal--------------------------------------------------*/
					$scope.deleteNotePermanentlyFromModal = function() {
						modalInstance.close();
						$scope.deleteNotePermanently(note);
					}

					/*------------------------change color--------------------------------------------------*/
					$scope.changeColor = function(note, color) {
						note.color = color.color;
						$scope.color = color;
						$scope.updateNote(note);
					}
					
					/*------------------------Trigger the upload UI--------------------------------------------------*/
					$scope.triggerImageUploadUI = function(object,typeOfObject){
						$timeout(function(){
							$scope.type=object;
							$scope.typeOfObject=typeOfObject;
							console.log($scope.type);
							console.log($scope.typeOfObject);
						$('#imageUploadUI').trigger('click');
						},0);
					}
					
					/*------------------------upload photo to database--------------------------------------------------*/
					$scope.imageUpload = function(element){
					    var reader = new FileReader();
					    reader.onload = $scope.imageIsLoaded;
					    reader.readAsDataURL(element.files[0]);
					}
				
					$scope.imageIsLoaded = function(e){
					    $scope.$apply(function() {
					        var imageSrc=e.target.result;
					        if($scope.typeOfObject=='note'){
					        	$scope.type.image=imageSrc;
					        	$scope.updateNote($scope.type);
					        }else if($scope.typeOfObject=='newNote') {
					        	$scope.type.image=imageSrc;
					        } else {
					        	$scope.type.picture=imageSrc;
					        	$scope.updateUser($scope.type);
					        }
					    });
					};
								
					$scope.changeToDateObject = function(notes) {
						for (var noteCount = 0; noteCount < notes.length; noteCount++) {
							notes[noteCount].reminderDate = new Date(notes[noteCount].reminderDate);
						}
					}

					$scope.showModal = function(note) {
						$scope.note = note;
						modalInstance = $uibModal.open({
							templateUrl : 'template/editNote.html',
							scope : $scope,
							size : 'md',
						});
					};

					$scope.showModalLabel = function() {
						modalInstance = $uibModal.open({
							templateUrl : 'template/LabelEdit.html',
							scope : $scope,
							size : 'sm',
						});
					};
					
					$scope.showModalCollaborator = function(note) {
						$scope.note = note;
						modalInstance = $uibModal.open({
							templateUrl : 'template/Collaborate.html',
							scope : $scope,
							size : 'md'
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
					
					$scope.matchingTheNotes = function(note,noteSearched) {
						var title = note.noteTitle.toLowerCase();
						var descrition = note.noteDescription.toLowerCase();
						if(noteSearched!=''&& noteSearched!=undefined){
							if(title.includes(noteSearched)|| descrition.includes(noteSearched))
								return true;
						}
						return false;
					}
					
					getTheOwner();

					navBarNameChange();

					intervalFunction();

					checkForView();
					
					dontShow();

				});