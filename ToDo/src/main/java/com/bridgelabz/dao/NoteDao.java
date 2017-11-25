package com.bridgelabz.dao;

import java.util.List;

import javax.persistence.PersistenceException;
import javax.persistence.QueryTimeoutException;
import javax.persistence.TransactionRequiredException;

import com.bridgelabz.model.Note;

public interface NoteDao {
	
	public List<Note> getTheNotes(int userId);
	
	public int deleteTheNote(Note note);
	
	public int updateTheNote(Note note) throws IllegalStateException, TransactionRequiredException, QueryTimeoutException, PersistenceException;
	
	public int saveTheNote(Note note);

}
