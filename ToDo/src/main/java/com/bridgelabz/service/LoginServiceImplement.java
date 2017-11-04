package com.bridgelabz.service;

import java.io.IOException;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bridgelabz.dao.LoginDao;

@Service
@Transactional
public class LoginServiceImplement implements LoginService {

	@Autowired
	private LoginDao loginDao;

	@Override
	@Transactional
	public String validateTheUser(String emailId, String password) throws IOException {
		return loginDao.validateTheUser(emailId, password);
	}
	
	@Override
	public String validationOfEmailId(String emailId) {
		
		return null;
	}

	@Override
	public String validationOfPassword(String password) {

		return null;
	}
}
