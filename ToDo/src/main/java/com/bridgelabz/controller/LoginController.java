package com.bridgelabz.controller;

import java.io.IOException;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bridgelabz.model.User;
import com.bridgelabz.service.LoginService;

@RestController
public class LoginController {
	
	@Autowired
	private LoginService loginService;
	
	@Autowired
	private BCrypt bCrypt;
	
	@SuppressWarnings("static-access")
	@RequestMapping(value="/login",method=RequestMethod.POST,produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String login(@RequestBody User user,HttpSession session) throws IOException {
		String receivedPassword=user.getPassword();
		try {
			user=loginService.validateTheUser(user.getEmailId());
			session.setAttribute("user", user);
			return bCrypt.checkpw(receivedPassword, user.getPassword())? "login succesfull":"login failed"; 
		}
		catch(NullPointerException e) {
			return "Not Activated";
		}
	}
	
	@RequestMapping(value="/logout",method=RequestMethod.GET,produces=MediaType.APPLICATION_JSON_VALUE)
	public String logout(HttpSession session) {
		session.removeAttribute("userId");
		return "succesfully Loged Out";
	}
}
