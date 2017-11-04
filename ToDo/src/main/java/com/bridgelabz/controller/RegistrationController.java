package com.bridgelabz.controller;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.persistence.PersistenceException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.PathVariable;
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
	
	@Autowired
	private JavaMailSender mailSender;
	
	@RequestMapping(value="/registration",method=RequestMethod.POST,produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String Register(@RequestBody User user,HttpServletRequest request)  {
		String message="<a href=\"/activate/"+user.getEmailId()+"\" >"+request.getRequestURL()+"</a>";
		try {
			registerService.register(user);
			MimeMessage mimeMessage=mailSender.createMimeMessage();
			MimeMessageHelper mimeMessageHelper=new MimeMessageHelper(mimeMessage, true);
			mimeMessageHelper.setTo(user.getEmailId());
			mimeMessageHelper.setFrom("ranadipendra47@gmail.com");
			mimeMessageHelper.setSubject("Link to actvate your account");
			mimeMessageHelper.setText(message, true);
			mailSender.send(mimeMessage);
			return "registration succesfull";
		}catch(PersistenceException e) {
			e.printStackTrace();
			return "registration Failed";
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return "Mail sent Failed";
		}
	}
	
	@RequestMapping(value="/activate/{emailId}",method=RequestMethod.PUT,produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String authorizeTheUser(@PathVariable String emailId) {
		return registerService.updateTheValidationToken(emailId)==1 ? "Account Activated":"Account Activation Failed";
	}
}
