package com.bridgelabz.controller;

import java.security.Key;

import javax.mail.MessagingException;
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
import com.bridgelabz.model.User;
import com.bridgelabz.service.EmailService;
import com.bridgelabz.service.TokenOperation;
import com.bridgelabz.service.UserService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.impl.crypto.MacProvider;

@RestController
public class ForgotPasswordController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private EmailService email;
	
	@Autowired
	private TokenOperation tokenOperation;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	private final Key key=MacProvider.generateKey();
	
	@RequestMapping(value="/forgotPassword",method=RequestMethod.PUT,produces=MediaType.APPLICATION_JSON_VALUE)
	public String forgotPassword(@RequestBody User user,HttpServletRequest request) {
		user=userService.getUserByEmail(user.getEmailId());
		if(user==null)
			return "no such email-Id is present";
		else {
			String token=tokenOperation.generateToken(String.valueOf(user.getId()), key); 
			String message = "<a href=\"" + request.getRequestURL() + "/resetPassword/" + token + "\" >"
					+ request.getRequestURL() + "</a>";
			try {
				email.sendMail(user.getEmailId(), "click To reset your password", message);
				return "email-Sent";
			} catch (MessagingException e) {
				e.printStackTrace();
				return "email-failed";
			}
		}	
	}
	
	@RequestMapping(value="/forgotPassword/resetPassword/{token:.+}",method=RequestMethod.PUT,produces=MediaType.APPLICATION_JSON_VALUE)
	public String resetPassword(@PathVariable String token,@RequestBody ResetPassword resetPassword) {
		String newPassword=passwordEncoder.encode(resetPassword.getNewPassword());
		String reEnterNewPassword=passwordEncoder.encode(resetPassword.getReEnterNewPassword());
		if(newPassword.equals(reEnterNewPassword)) {
			Claims claim=tokenOperation.parseTheToken(key, token);
			int id=Integer.parseInt(claim.getSubject());
			return userService.updatePasswordOfUser(newPassword, id)==1? "password is reset":"Failed To reset The Password";
		}
		else
			return "Password not matched";
		
	}

}
