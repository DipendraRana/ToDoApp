package com.bridgelabz.controller;

import javax.mail.MessagingException;
import javax.persistence.PersistenceException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bridgelabz.model.User;
import com.bridgelabz.service.EmailService;
import com.bridgelabz.service.RegistrationService;

@RestController
public class RegistrationController {
	
	@Autowired
	private RegistrationService registerService;
	
	@Autowired
	private EmailService emailService;
	
	@RequestMapping(value="/registration",method=RequestMethod.POST,produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String Register(@RequestBody User user,HttpServletRequest request)  {
		try {
			registerService.register(user);
			String message="<a href=\""+request.getRequestURL()+"/activate/"+user.getId()+"\" >"+request.getRequestURL()+"</a>";
			emailService.sendActivationMail(user.getEmailId(), "Link to actvate your account", message);
			return "registration succesfull";
		}catch(PersistenceException e) {
			e.printStackTrace();
			return "registration Failed";
		} catch (MessagingException e) {
			e.printStackTrace();
			return "Mail sent Failed";
		}
	}
	
	@RequestMapping(value="/registration/activate/{id}",method=RequestMethod.GET,produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String authorizeTheUser(@PathVariable("id") int id) {
		return registerService.updateTheValidationToken(id)==1 ? "Account Activated":"Account Activation Failed";
	}
}
