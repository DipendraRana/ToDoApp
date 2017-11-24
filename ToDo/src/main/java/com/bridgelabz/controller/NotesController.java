package com.bridgelabz.controller;

import java.util.List;

import javax.persistence.PersistenceException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bridgelabz.model.Note;
import com.bridgelabz.model.Response;
import com.bridgelabz.model.User;
import com.bridgelabz.service.NoteService;
import com.bridgelabz.service.TokenOperation;
import com.bridgelabz.service.UserService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;

@RestController
public class NotesController {

	@Autowired
	private NoteService noteService;

	@Autowired
	private TokenOperation tokenOperation;

	@Autowired
	UserService userService;

	private static final String KEY = "!12@3#abcde";

	@RequestMapping(value = "/getNotes", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody List<Note> gettingAllNotes(HttpServletRequest request, HttpSession session) {
		String token = request.getHeader("token");
		List<Note> list = null;
		try {
			Claims claim = tokenOperation.parseTheToken(KEY, token);
			int id = Integer.parseInt(claim.getSubject());
			list = noteService.getTheNotes(id);
		} catch (ExpiredJwtException e) {
			e.printStackTrace();
		}
		return list;
	}

	@RequestMapping(value = "/saveNote", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody Response saveTheNote(@RequestBody Note note, HttpServletRequest request, HttpSession session) {
		Response response = new Response();
		String token = request.getHeader("token");
		try {
			Claims claim = tokenOperation.parseTheToken(KEY, token);
			String emailId = (String) claim.get("emailId");
			User user = userService.getUserByEmail(emailId);
			note.setUser(user);
			int id = noteService.saveTheNote(note);
			if (id != 0)
				response.setMessage("Successfully saved");
			else
				response.setMessage("Failed to save");
			return response;
		} catch (ExpiredJwtException e) {
			e.printStackTrace();
			response.setMessage("Token Expired");
			return response;
		}
	}

	@RequestMapping(value = "/updateNote", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody Response updateTheNote(@RequestBody Note note, HttpServletRequest request,
			HttpSession session) {
		Response response = new Response();
		String token = request.getHeader("token");
		try {
			Claims claim = tokenOperation.parseTheToken(KEY, token);
			String emailId = (String) claim.get("emailId");
			User user = userService.getUserByEmail(emailId);
			int id = user.getId();
			note.setUser(user);
			noteService.updateTheNote(note, id);
			response.setMessage("update succesfull");
			return response;
		} catch (PersistenceException e) {
			e.printStackTrace();
			response.setMessage("update failed");
			return response;
		} catch (ExpiredJwtException e) {
			e.printStackTrace();
			response.setMessage("Token Expired");
			return response;
		}
	}

	@RequestMapping(value = "/deleteNote", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody Response deleteTheNote(HttpServletRequest request, HttpSession session) {
		Response response = new Response();
		String token = request.getHeader("token");
		try {
			Claims claim = tokenOperation.parseTheToken(KEY, token);
			String emailId=(String) claim.get("emailId");
			User user = userService.getUserByEmail(emailId);
			int id=user.getId();
			int noOfRowsaffected = noteService.deleteTheNote(id);
			if (noOfRowsaffected != 0) {
				response.setMessage("note deleted");
				return response;
			} else {
				response.setMessage("note is not deleted");
				return response;
			}
		} catch (ExpiredJwtException e) {
			e.printStackTrace();
			response.setMessage("Token Expired");
			return response;
		}
	}

}
