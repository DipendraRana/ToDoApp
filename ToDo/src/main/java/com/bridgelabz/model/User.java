package com.bridgelabz.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="login")
public class User {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID")
	private int id;

	@Column(name="User_Name")
	private String userName;
	
	@Column(name="Password")
	private String password;
	
	@Column(name="Mobile_Number",unique=true)
	private long mobileNumber;
	
	@Column(name="Email_Id",unique=true,nullable=false)
	private String emailId;
	
	@Column(name="Enabled")
	private boolean validToken;

	public User() {
		id=0;
		userName=null;
		password=null;
		mobileNumber=0;
		emailId=null;
		validToken=false;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	public boolean getValidToken() {
		return validToken;
	}

	public void setValidToken(boolean validToken) {
		this.validToken = validToken;
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
