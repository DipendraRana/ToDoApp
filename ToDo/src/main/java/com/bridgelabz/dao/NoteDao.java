package com.bridgelabz.dao;

import java.util.List;

import com.bridgelabz.model.Note;

public interface NoteDao {
	
	public List<Note> getTheNotes(int userId);
	
	public int deleteTheNote(int id);
	
	public void updateTheNote(Note note,int id) throws Exception;
	
	public int saveTheNote(Note note);

}
