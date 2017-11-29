<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">

<link rel="stylesheet"
	href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" href="css/scriptpage.css">

<script type="text/javascript"
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript"
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script type="text/javascript"
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.6/angular.js"></script>
<script type="text/javascript"
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.6/angular-sanitize.js"></script>
<script type="text/javascript"
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.6/angular-resource.js"></script>
<script type="text/javascript"
	src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/1.0.3/angular-ui-router.min.js"></script>
<script type="text/javascript"
	src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.0/ui-bootstrap-tpls.js"></script>
<script type="text/javascript"
	src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment-with-locales.js"></script>

<script type="text/javascript" src="script/ToDoApp.js"></script>

<script type="text/javascript" src="controller/loginController.js"></script>
<script type="text/javascript" src="controller/enterEmailController.js"></script>
<script type="text/javascript"
	src="controller/registrationController.js"></script>
<script type="text/javascript"
	src="controller/resetPasswordController.js"></script>
<script type="text/javascript" src="controller/homeController.js"></script>
<script type="text/javascript"
	src="controller/intermediateController.js"></script>

<script type="text/javascript" src="directive/customDirective.js"></script>
<script type="text/javascript" src="script/scripts.js"></script>

<script type="text/javascript" src="service/loginService.js"></script>
<script type="text/javascript" src="service/registrationService.js"></script>
<script type="text/javascript" src="service/enterEmailService.js"></script>
<script type="text/javascript" src="service/resetPassowrdService.js"></script>
<script type="text/javascript" src="service/noteService.js"></script>
<script type="text/javascript" src="service/intermediateService.js"></script>

</head>
<body data-ng-app="ToDo">
	<div data-ui-view style="height: 100%;"></div>
</body>
</html>
