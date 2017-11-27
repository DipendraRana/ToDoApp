package com.bridgelabz.service;

import java.util.List;

import com.bridgelabz.model.Note;

public interface NoteService {
	
	public List<Note> getTheNotes(int userId);
	
	public int deleteTheNote(Note note);
	
	public void updateTheNote(Note note);
	
	public int saveTheNote(Note note);

}
