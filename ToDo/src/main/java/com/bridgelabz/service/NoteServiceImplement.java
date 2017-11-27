package com.bridgelabz.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bridgelabz.dao.NoteDao;
import com.bridgelabz.model.Note;

@Service
@Transactional
public class NoteServiceImplement implements NoteService {

	@Autowired
	private NoteDao noteDao;

	@Override
	public List<Note> getTheNotes(int userId) {
		return noteDao.getTheNotes(userId);
	}

	@Override
	public int deleteTheNote(Note note) {
		return noteDao.deleteTheNote(note);
	}

	@Override
	public void updateTheNote(Note note) {
		noteDao.updateTheNote(note);
	}

	@Override
	public int saveTheNote(Note note) {
		return noteDao.saveTheNote(note);
	}

}
