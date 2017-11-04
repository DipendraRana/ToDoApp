package com.bridgelabz.dao;

import javax.persistence.PersistenceException;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.bridgelabz.model.User;

@Repository("registrationDao")
public class RegistrationDaoImplement implements RegistrationDao {
	
	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public void register(User user) throws PersistenceException {
		sessionFactory.getCurrentSession().save(user);
	}
	
}
