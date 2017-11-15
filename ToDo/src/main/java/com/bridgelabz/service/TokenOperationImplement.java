package com.bridgelabz.service;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class TokenOperationImplement implements TokenOperation {

	@Override
	public String generateToken(String subject, Key key) {
		return Jwts.builder().setSubject(subject).signWith(SignatureAlgorithm.HS512,key).compact();
	}

	@Override
	public String generateTokenWithExpire(String claim,String claimName, Key key, long milliseconds,int userId) {
		return Jwts.builder().setExpiration(new Date(milliseconds)).setSubject(String.valueOf(userId)).claim(claimName, claim).signWith(SignatureAlgorithm.HS512,key).compact();
	}

	@Override
	public Claims parseTheToken(Key key, String token) throws ExpiredJwtException {
		return Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody();
	}

}