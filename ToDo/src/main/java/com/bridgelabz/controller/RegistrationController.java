package com.bridgelabz.controller;

import java.security.Key;
import javax.mail.MessagingException;
import javax.persistence.PersistenceException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bridgelabz.model.User;
import com.bridgelabz.service.EmailService;
import com.bridgelabz.service.RegistrationService;
import com.bridgelabz.service.TokenOperationImplement;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.impl.crypto.MacProvider;

@RestController
public class RegistrationController {

	@Autowired
	private RegistrationService registerService;

	@Autowired
	private EmailService emailService;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private TokenOperationImplement tokenOperation;

	private final Key key=MacProvider.generateKey();
	
	@RequestMapping(value = "/registration", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String Register(@RequestBody User user, HttpServletRequest request) {
		try {
			user.setValidToken(false);
			user.setPassword(passwordEncoder.encode(user.getPassword())); //Encrypting the password
			registerService.register(user);
			
			//Generating JWT token for authentication
			String token=tokenOperation.generateToken(String.valueOf(user.getId()), key); 
	
			//message to send to user with JWT token appended
			String message = "<a href=\"" + request.getRequestURL() + "/activate/" + token + "\" >"
					+ request.getRequestURL() + "</a>";
			
			emailService.sendMail(user.getEmailId(), "Link to actvate your account", message);
			return "registration succesfull";
		} catch (PersistenceException e) {
			e.printStackTrace();
			return "registration Failed";
		} catch (MessagingException e) {
			e.printStackTrace();
			return "Mail sent Failed";
		}
	}

	@RequestMapping(value = "/registration/activate/{token:.+}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String authorizeTheUser(@PathVariable("token") String token) {
			//getting id of user from JWT Token
			Claims claim=tokenOperation.parseTheToken(key, token);
			int id=Integer.parseInt(claim.getSubject());
			
			return registerService.updateTheValidationToken(id) == 1 ? "Account Activated" : "Account Activation Failed";
		}
}
