package com.bridgelabz.controller;

import java.io.IOException;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
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
	
	@RequestMapping(value="/login",method=RequestMethod.POST,produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String login(@RequestBody User user,HttpSession session) throws IOException {
		user=loginService.validateTheUser(user.getEmailId(), user.getPassword());
		session.setAttribute("user", user);
		return user!=null? "login succesfull":"login failed"; 
	}
	
	@RequestMapping(value="/logout",method=RequestMethod.GET,produces=MediaType.APPLICATION_JSON_VALUE)
	public String logout(HttpSession session) {
		session.removeAttribute("userId");
		return "succesfully Loged Out";
	}
}
