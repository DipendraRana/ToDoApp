package com.bridgelabz.service;

import javax.persistence.PersistenceException;

import com.bridgelabz.model.User;

public interface RegistrationService {
	
	public void register(User user) throws PersistenceException;
	
	public int updateTheValidationToken(String emailId);

}
