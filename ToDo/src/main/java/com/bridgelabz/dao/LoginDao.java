package com.bridgelabz.dao;

import java.io.IOException;

import com.bridgelabz.model.User;

public interface LoginDao {

	public User validateTheUser(String emailId, String password) throws IOException;

}
