package com.bridgelabz.dao;

import javax.persistence.PersistenceException;

import com.bridgelabz.model.User;

public interface RegistrationDao {
	
	public void register(User user) throws PersistenceException;
	
	public int updateTheValidationToken(String emailId);

}
