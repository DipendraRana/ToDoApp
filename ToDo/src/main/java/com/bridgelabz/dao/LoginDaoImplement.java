package com.bridgelabz.dao;

import java.io.IOException;

import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.bridgelabz.model.User;

@Repository
public class LoginDaoImplement implements LoginDao {

	@Autowired
	private SessionFactory sessionFactory;

	public String validateTheUser(String emailId, String password) throws IOException {
		String userName = null;
		Query<User> query;
		try {
			query = sessionFactory.getCurrentSession()
					.createQuery("from User where emailId =:Email_Id and password=:Password and validToken=:Valid_Token", User.class);
			query.setParameter("Email_Id", emailId);
			query.setParameter("Password", password);
			query.setParameter("Valid_Token", "V");
			User user = (User) query.uniqueResult();
			userName = user.getUserName();
			return userName;
		} catch (NullPointerException e) {
			return userName;
		}
	}

}
