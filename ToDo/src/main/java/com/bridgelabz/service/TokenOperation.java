package com.bridgelabz.service;

import java.security.Key;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;

public interface TokenOperation {
	
	public String generateToken(String subject,Key key);
	
	public String generateTokenWithExpire(String claim,String claimName,Key key,long milliseconds,int userId);
	
	public Claims parseTheToken(Key key,String token) throws ExpiredJwtException;

}
