package com.bridgelabz.service;

import java.util.List;

import javax.persistence.PersistenceException;
import javax.persistence.QueryTimeoutException;
import javax.persistence.TransactionRequiredException;

import com.bridgelabz.model.Note;

public interface NoteService {
	
	public List<Note> getTheNotes(int userId);
	
	public int deleteTheNote(int id);
	
	public void updateTheNote(Note note,int id) throws IllegalStateException, TransactionRequiredException, QueryTimeoutException, PersistenceException;
	
	public int saveTheNote(Note note);

}
