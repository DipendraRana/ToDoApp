var user=angular.module("ToDo");
user.config('enterEmailController',function($scope,emailEnteringService,$location){
	$scope.enterEmail=function(){
		var message=emailEnteringServic.enterEmail($scope.email);
		message.then(function(response){
			console.log(response.data.message);
			$location.path();
		});
	}
	
});