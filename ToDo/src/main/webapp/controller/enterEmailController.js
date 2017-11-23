var ToDo=angular.module('ToDo');
ToDo.controller('enterEmailController',function($scope,emailEnteringService){
	$scope.enterEmail=function(){
		var message=emailEnteringService.enterEmail($scope.user);
		message.then(function(response){
			console.log(response.data.message);
			$scope.message=response.data.message+" to "+$scope.user.emailId;
			localStorage.setItem('token', response.headers('token'));
		});
	}
	
});