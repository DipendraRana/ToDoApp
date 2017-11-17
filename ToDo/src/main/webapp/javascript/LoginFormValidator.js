function validateTheLoginForm(){
	var emailId=document.loginform.emailId.value;
	var password=document.loginform.password.value;
	var regularExpressionForEmailId=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	document.getElementById("emailId-ID").innerHTML="";
	document.getElementById("password-ID").innerHTML="";
	if(!regularExpressionForEmailId.test(emailId)||emailId==""){
		document.getElementById("emailId-ID").innerHTML="Please enter proper Email ID";
		return false
	}
	else if(password.length<5||password==""){
		document.getElementById("password-ID").innerHTML="Password Should be greater than 4";
		return false
	}
}