package com.bridgelabz.controller;

import java.io.IOException;
import java.security.Key;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bridgelabz.model.Response;
import com.bridgelabz.model.User;
import com.bridgelabz.service.LoginService;
import com.bridgelabz.service.TokenOperation;

import io.jsonwebtoken.impl.crypto.MacProvider;

@RestController
public class LoginController {

	@Autowired
	private LoginService loginService;

	@Autowired
	private BCrypt bCrypt;

	@Autowired
	private TokenOperation tokenOperation;

	private Key key = MacProvider.generateKey();

	@SuppressWarnings("static-access")
	@RequestMapping(value = "/login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody Response login(@RequestBody User user, HttpServletResponse response) throws IOException {
		String receivedPassword = user.getPassword();
		Response message = new Response();
		try {
			user = loginService.validateTheUser(user.getEmailId());
			response.addHeader("token",
					tokenOperation.generateTokenWithExpire(user.getEmailId(), "emailId", key, 3600000, user.getId()));
			if (user.getPassword() != null && bCrypt.checkpw(receivedPassword, user.getPassword())) {
				message.setMessage("login succesfull");
				return message;
			} else {
				message.setMessage("login unsuccesfull");
				return message;
			}
		} catch (NullPointerException e) {
			message.setMessage("Not Activated");
			return message;
		}
	}

	@RequestMapping(value = "/logout", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public String logout(HttpServletRequest request) {
		return "succesfully Loged Out";
	}

}
