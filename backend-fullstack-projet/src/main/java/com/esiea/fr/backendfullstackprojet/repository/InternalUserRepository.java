package com.esiea.fr.backendfullstackprojet.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.esiea.fr.backendfullstackprojet.model.InternalUser;

@Repository
public interface InternalUserRepository extends CrudRepository<InternalUser, Integer>{

	public InternalUser findByUsername(String username);
	
}