package com.bridgelabz.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.bridgelabz.model.ResetPassword;
import com.bridgelabz.model.Response;
import com.bridgelabz.model.User;
import com.bridgelabz.service.JmsMessageSendingService;
import com.bridgelabz.service.TokenOperation;
import com.bridgelabz.service.UserService;

import io.jsonwebtoken.Claims;

@RestController
public class ForgotPasswordController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private TokenOperation tokenOperation;
	
	@Autowired
	private JmsMessageSendingService jmsMessageSendingService;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	private static final String KEY="!12@3#";
	
	@RequestMapping(value="/forgotPassword",method=RequestMethod.PUT,produces=MediaType.APPLICATION_JSON_VALUE)
	public Response forgotPassword(@RequestBody User user,HttpServletRequest request) {
		user=userService.getUserByEmail(user.getEmailId());
		Response response=new Response();
		if(user==null) {
			response.setMessage("no such email-Id is present");
			return response;
		}	
		else {
			String token=tokenOperation.generateToken(String.valueOf(user.getId()), KEY);
			String message = "<a href=\"" + request.getRequestURL() + "/resetPassword/" + token + "\" >"
					+ request.getRequestURL() + "</a>";
			jmsMessageSendingService.sendMessage(message, user.getEmailId());
			response.setMessage("email-sent");
			return response;
		}	
	}
	
	@RequestMapping(value="/forgotPassword/resetPassword/{token:.+}",method=RequestMethod.PUT,produces=MediaType.APPLICATION_JSON_VALUE)
	public Response resetPassword(@PathVariable String token,@RequestBody ResetPassword resetPassword) {
		Response response=new Response();
		if(resetPassword.getNewPassword().equals(resetPassword.getReEnterNewPassword())) {
			Claims claim=tokenOperation.parseTheToken(KEY, token);
			int id=Integer.parseInt(claim.getSubject());
			String newPassword=passwordEncoder.encode(resetPassword.getNewPassword());
			userService.updatePasswordOfUser(newPassword, id);
			response.setMessage("password is reset");
			return response;
		}
		else {
			response.setMessage("Password not matched");
			return response;
		}
	}

}
