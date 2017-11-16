package com.bridgelabz.service;

public interface JmsMessageSendingService {
	
	public void sendMessage(String token,StringBuffer stringBuffer,String emailId);

}
