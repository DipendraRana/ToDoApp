package com.bridgelabz.controller;

import java.io.IOException;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bridgelabz.model.User;
import com.bridgelabz.service.GoogleService;
import com.bridgelabz.service.RegistrationService;
import com.bridgelabz.service.UserService;
import com.fasterxml.jackson.databind.JsonNode;

@RestController
public class GoogleController {

	@Autowired
	private GoogleService googleService;

	@Autowired
	private RegistrationService registrationSerivce;

	@Autowired
	private UserService userService;

	@RequestMapping("/googleLogin")
	public void onClickOfGoogleLogin(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String univarsalUniqueID = UUID.randomUUID().toString();
		String googleLoginUrl = googleService.getGoogleLoginUrl(univarsalUniqueID);
		request.getSession().setAttribute("uniqueId", univarsalUniqueID);
		response.sendRedirect(googleLoginUrl);
	}

	@RequestMapping("/connectGoogle")
	public void handlingRedirectURL(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String sessionStoredState = (String) request.getSession().getAttribute("uniqueId");
		String googleUrlStoredState = request.getParameter("state");
		if (sessionStoredState == null || !sessionStoredState.equals(googleUrlStoredState))
			response.sendRedirect("googleLogin");
		String error = request.getParameter("error");
		if (error != null)
			response.sendRedirect("Login");
		String authenticationCode=request.getParameter("code");
		String accessToken=googleService.getAccessToken(authenticationCode);
		JsonNode userProfile=googleService.getUserProfile(accessToken);
		String emailId=userProfile.get("email").asText();
		User user=userService.getUserByEmail(emailId);
		if(user==null) {
			user=new User();
			user.setUserName(userProfile.get("name").asText());
			user.setEmailId(emailId);
			user.setValidToken(true);
			if(userProfile.get("picture").get("data")!=null)
				user.setPicture(userProfile.get("picture").get("data").get("url").asText());
			registrationSerivce.register(user);
			response.sendRedirect("http://localhost:8080/ToDo/#!/login");
		}else {
			response.sendRedirect("http://localhost:8080/ToDo/#!/login");
			System.out.println("User Already Present");
		}
	}

}
