package com.bridgelabz.dao;

import com.bridgelabz.model.User;

public interface UserDao {
	
	public User getUserByEmail(String emailId);
	
	public int updatePasswordOfUser(String password,int id);
	
	public void updateUser(User user);

}
