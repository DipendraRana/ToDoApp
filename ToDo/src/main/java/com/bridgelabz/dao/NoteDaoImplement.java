package com.bridgelabz.dao;

import java.util.Date;
import java.util.List;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.bridgelabz.model.Note;
import com.bridgelabz.model.User;

@Repository
public class NoteDaoImplement implements NoteDao {

	@Autowired
	private SessionFactory sessionFactory;

	private Date date = new Date();

	@SuppressWarnings("unchecked")
	@Override
	public List<Note> getTheNotes(int userId) {
		List<User> list = sessionFactory.getCurrentSession().createQuery("from User where id=:User_Id")
				.setParameter("User_Id", userId).list();
		User user=list.get(0);
		System.out.println(user.getEmailId());
		user.getNotes().size();
		return user.getNotes();
	}

	@Override
	public int deleteTheNote(int id) {
		return sessionFactory.getCurrentSession().createQuery("delete from Note where noteId=:Note_Id")
				.setParameter("Note_Id", id).executeUpdate();
	}

	@Override
	public void updateTheNote(Note note, int id) throws Exception {
		sessionFactory.getCurrentSession()
				.createQuery(
						"update Note set noteTitle=:Note_Title,noteDescription=:Note_Description where noteId=:Note_Id")
				.setParameter("Note_Id", id).setParameter("Note_Title", note.getNoteTitle())
				.setParameter("Note_Description", note.getNoteDescription()).executeUpdate();
	}

	@Override
	public int saveTheNote(Note note) {
		note.setCreationDate(date);
		return (int) sessionFactory.getCurrentSession().save(note);
	}

}
