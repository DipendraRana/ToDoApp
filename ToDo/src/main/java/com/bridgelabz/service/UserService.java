package com.bridgelabz.service;

import com.bridgelabz.model.User;

public interface UserService {
	
	public User getUserByEmail(String emailId);
	
	public int updatePasswordOfUser(String password,int id);
	
	public void updateUser(User user);

}
