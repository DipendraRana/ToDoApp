package com.bridgelabz.service;

import java.io.IOException;

public interface LoginService {
	
	public String validationOfEmailId(String emailId);

	public String validationOfPassword(String password);
	
	public String validateTheUser(String emailId,String password) throws IOException;
}
