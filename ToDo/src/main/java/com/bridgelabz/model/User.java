package com.bridgelabz.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="login")
public class User {
	
	@Column(name="User_Name")
	private String userName;
	
	@Column(name="Mobile_Number")
	private String password;
	
	@Column(name="Password")
	private long mobileNumber;
	
	@Id
	@Column(name="Email_Id")
	private String emailId;
	
	public User() {
		userName=null;
		password=null;
		mobileNumber=0;
		emailId=null;
	}
	
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public long getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(long mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	
}
