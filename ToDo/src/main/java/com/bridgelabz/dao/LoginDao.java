package com.bridgelabz.dao;

import java.io.IOException;

public interface LoginDao {

	public String validateTheUser(String emailId, String password) throws IOException;

}
