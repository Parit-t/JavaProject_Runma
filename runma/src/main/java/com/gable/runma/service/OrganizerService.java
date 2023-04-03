package com.gable.runma.service;

import java.util.List;
import java.util.Optional;

import com.gable.runma.exception.DataIntegrityViolationException;
import com.gable.runma.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gable.runma.model.Event;
import com.gable.runma.model.Organizer;
import com.gable.runma.repository.EventRepository;
import com.gable.runma.repository.OrganizerRepository;

@Service
public class OrganizerService {
	@Autowired
	private OrganizerRepository repo;
	@Autowired
	private EventRepository evtRepo;

	public List<Organizer> findAll() {
		return repo.findAll();
	}

	//Create organizer
	public Organizer newOrganizer(Organizer org) {
		Organizer existingOrganizer = repo.findByEmail(org.getEmail());
		if (existingOrganizer != null && !existingOrganizer.getId().equals(org.getId())) {
			throw new DataIntegrityViolationException("The email address " + org.getEmail() + " is already taken.");
		}
		return repo.save(org);
	}

	//Update organizer
	public Organizer updateOrganizer(Organizer newValue) {

		Optional<Organizer> old = repo.findById(newValue.getId());
		if (old.isPresent()) {
			Organizer theOld = old.get();

			// Check if the email already exists in the database
			Organizer existingOrganizer = repo.findByEmail(newValue.getEmail());
			if (existingOrganizer != null && !existingOrganizer.getId().equals(newValue.getId())) {
				throw new DataIntegrityViolationException("The email address " + newValue.getEmail() + " is already taken.");
			} else {
				theOld.setContact(newValue.getContact());
				theOld.setEmail(newValue.getEmail());
				theOld.setFacebook(newValue.getFacebook());
				theOld.setName(newValue.getName());
				theOld.setWebsite(newValue.getWebsite());
				//theOld.setPassword(newValue.getPassword());

				theOld.getEventList().clear();

				if (newValue != null) {
					theOld.getEventList().clear();
					if (newValue.getEventList() != null) {
						for (Event event : newValue.getEventList()) {
							Event objEvent = evtRepo.findById(event.getId()).orElseThrow();
							theOld.getEventList().add(objEvent);
							if (!objEvent.getOrganizerList().contains(theOld)) {
								objEvent.getOrganizerList().add(theOld);
								evtRepo.save(objEvent);
							}
						}
					}
				}
				return repo.save(theOld);
			}
		} else {
			throw new ResourceNotFoundException("Not found this organizer");
		}
	}

	//Get organizer by Id
	public Organizer getOrganizer(Integer id) {
		Organizer organizer = repo.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("Organizer with id: " + id + " does not exist"));
		return organizer;
	}
}
