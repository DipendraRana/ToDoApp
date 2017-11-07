package com.bridgelabz.service;

import java.util.List;

import com.bridgelabz.model.Note;

public interface NoteService {
	
	public List<Note> getTheNotes(int userId);
	
	public int deleteTheNote(int id);
	
	public void updateTheNote(Note note,int id) throws Exception;
	
	public int saveTheNote(Note note);

}
