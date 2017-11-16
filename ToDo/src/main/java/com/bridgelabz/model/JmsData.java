package com.bridgelabz.model;

import java.io.Serializable;

public class JmsData implements Serializable {
	
	private static final long serialVersionUID = 1L;

	private StringBuffer url;
	
	private String emailId;
	
	private String token;

	public StringBuffer getUrl() {
		return url;
	}

	public void setUrl(StringBuffer url) {
		this.url = url;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

}
