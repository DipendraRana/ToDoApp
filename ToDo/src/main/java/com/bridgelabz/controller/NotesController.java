package com.bridgelabz.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bridgelabz.model.Note;
import com.bridgelabz.model.User;
import com.bridgelabz.service.NoteService;

@RestController
public class NotesController {
	
	@Autowired
	private NoteService noteService;
	
	@RequestMapping(value="/getNotes/{userId}",method=RequestMethod.GET,produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody List<Note> gettingAllNotes(@PathVariable("userId") int id,HttpSession session) {
		List<Note> list=noteService.getTheNotes(id);
		return list;
	}
	
	@RequestMapping(value="/saveNote",method=RequestMethod.POST,produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String saveTheNote(@RequestBody Note note,HttpSession session) {
		note.setUser((User)session.getAttribute("user"));
		int id=noteService.saveTheNote(note);
		return id!=0?"Successfully saved":"Failed to save";
	}
	
	@RequestMapping(value="/updateNote/{noteId}",method=RequestMethod.PUT,produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String updateTheNote(@RequestBody Note note,@PathVariable("noteId") int id,HttpSession session) {
		try {
			noteService.updateTheNote(note,id);
			return "update succesfull";
		} catch (Exception e) {
			e.printStackTrace();
			return "update failed";
		}
	}
	
	@RequestMapping(value="/deleteNote/{noteId}",method=RequestMethod.DELETE,produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String deleteTheNote(@PathVariable("noteId") int id,HttpSession session) {
		int noOfRowsaffected=noteService.deleteTheNote(id);
		return noOfRowsaffected!=0?"note deleted":"succesfully deleted";
	}
 	
}
