package com.bridgelabz.dao;

import javax.persistence.PersistenceException;

import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.bridgelabz.model.User;

@Repository("registrationDao")
public class RegistrationDaoImplement implements RegistrationDao {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public void register(User user) throws PersistenceException {
		user.setValidToken("NYV");
		sessionFactory.getCurrentSession().save(user);
	}

	@Override
	public int updateTheValidationToken(String emailId) {
		Query<User> query = sessionFactory.getCurrentSession()
				.createQuery("update User set validToken =: Valid_Token where emailId=:Email_Id",User.class);
		query.setParameter("Valid_Token", "V");
		query.setParameter("Email_Id", emailId);
		return query.executeUpdate();
	}

}
