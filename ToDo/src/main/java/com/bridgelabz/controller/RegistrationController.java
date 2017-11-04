package com.bridgelabz.controller;

import javax.persistence.PersistenceException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bridgelabz.model.User;
import com.bridgelabz.service.RegistrationService;

@RestController
public class RegistrationController {
	
	@Autowired
	private RegistrationService registerService;
	
	@RequestMapping(value="/registration",method=RequestMethod.POST,produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String Register(@RequestBody User user)  {
		try {
			registerService.register(user);
			return "registration succesfull";
		}catch(PersistenceException e) {
			e.printStackTrace();
			return "registration Failed";
		}
	}
}
