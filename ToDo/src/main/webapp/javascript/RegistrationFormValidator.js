function validateTheRegistrationForm(){
	var userName=document.registrationform.name.value;
	var userName=userName.replace(/ /g,'');
	var emailId=document.registrationform.emailId.value;
	var password=document.registrationform.password.value;
	var mobileNumber=document.registrationform.mobileNumber.value;
	document.getElementById("name-ID").innerHTML="";
	document.getElementById("emailId-ID").innerHTML="";
	document.getElementById("password-ID").innerHTML="";
	document.getElementById("mobileNumber-ID").innerHTML="";
	var regularExpressionForUserName=/[^A-Za-z]{1,}/;
	var regularExpressionForEmailId=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	if(userName==""||regularExpressionForUserName.test(userName)){
		document.getElementById("name-ID").innerHTML="Invalid User Name";
		return false;
	}
	else if(!regularExpressionForEmailId.test(emailId)||emailId==""){
		document.getElementById("emailId-ID").innerHTML="Invalid Email ID";
		return false;
	}
	else if(password.length<5||password==""){
		document.getElementById("password-ID").innerHTML="Invalid Password";
		return false;
	}
	else if(mobileNumber.length !=10 || isNaN(mobileNumber) || mobileNumber==""){
		document.getElementById("mobileNumber-ID").innerHTML="Invalid Mobile Number";
		return false;
	}
}