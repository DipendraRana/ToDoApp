package com.bridgelabz.service;

import javax.mail.MessagingException;

public interface EmailService {
	
	public void sendActivationMail(String to,String subject,String message) throws MessagingException;

}
