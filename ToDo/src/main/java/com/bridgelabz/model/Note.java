package com.bridgelabz.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="notes")
public class Note {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY,generator="nativeGenerator")
	@GenericGenerator(name="nativeGenerator",strategy="native")
	@Column(name="Note_id")
	private int noteId;
	
	@Column(name="Note_Title",nullable=false)
	private String noteTitle;
	
	@Column(name="Note_Description",nullable=false)
	private String noteDescription;
	
	@Column(name="Creation_Date",nullable=false)
	private Date creationDate;
	
	@ManyToOne
	@JoinColumn(nullable=false,name="User_ID")
	private User user;
	
	public Note() {
		noteId=0;
		creationDate=null;
		noteDescription=null;
		noteTitle=null;
		user=null;
	}

	public int getNoteId() {
		return noteId;
	}

	public void setNoteId(int noteId) {
		this.noteId = noteId;
	}

	public String getNoteTitle() {
		return noteTitle;
	}

	public void setNoteTitle(String noteTitle) {
		this.noteTitle = noteTitle;
	}

	public String getNoteDescription() {
		return noteDescription;
	}

	public void setNoteDescription(String noteDescription) {
		this.noteDescription = noteDescription;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
