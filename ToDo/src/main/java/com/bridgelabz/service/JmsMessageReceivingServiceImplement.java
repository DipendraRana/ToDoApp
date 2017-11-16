package com.bridgelabz.service;

import javax.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Service;

import com.bridgelabz.model.JmsData;

@Service
public class JmsMessageReceivingServiceImplement implements JmsMessageReceivingService {
	
	@Autowired
	private EmailService emailService;

	@Override
	@JmsListener(destination="MessageStorage")
	public void messageReceive(JmsData jmsData) {
		String token=jmsData.getToken();
		StringBuffer url=jmsData.getUrl();
		String emailId=jmsData.getEmailId();
		String message = "<a href=\"" + url + "/activate/" + token + "\" >"
				+ url + "</a>";
		try {
			emailService.sendMail(emailId, "Link to actvate your account", message);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}

}
