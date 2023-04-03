package com.gable.runma.service;

import com.gable.runma.exception.DataIntegrityViolationException;
import com.gable.runma.exception.ResourceNotFoundException;
import com.gable.runma.model.Event;
import com.gable.runma.model.Ticket;
import com.gable.runma.model.User;
import com.gable.runma.repository.OrganizerRepository;
import com.gable.runma.repository.TicketRepository;
import com.gable.runma.repository.UserRepository;

import java.util.List;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	@Autowired
	private UserRepository repo;
	@Autowired
	private TicketRepository ticketRepo;


	//get User by Id
	public User getUser(Integer id) {
		User user = repo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User with id: " + id + " does not exist"));
		//return ResponseEntity.ok(user).getBody();
		return user;
	}

	//create new user
	public User createUser(User user) {
		User existingUser = repo.findByEmail(user.getEmail());
		if (existingUser != null && !existingUser.getId().equals(user.getId())) {
			throw new DataIntegrityViolationException("The email address " + user.getEmail() + " is already taken.");
		}
		return repo.save(user);
	}


	public User updateUser(User newValue) {
		Optional<User> old = repo.findById(newValue.getId());

		if (old.isPresent()) {
			User theOld = old.get();

			// Check if the email already exists in the database
			User existingUser = repo.findByEmail(newValue.getEmail());
			if (existingUser != null && !existingUser.getId().equals(newValue.getId())) {
				throw new DataIntegrityViolationException("The email address " + newValue.getEmail() + " is already taken.");
			} else {
				theOld.setAddress(newValue.getAddress());
				theOld.setBirthDate(newValue.getBirthDate());
				theOld.setCountry(newValue.getCountry());
				theOld.setDistrict(newValue.getDistrict());
				theOld.setEmail(newValue.getEmail());
				theOld.setFName(newValue.getFName());
				theOld.setGender(newValue.getGender());
				theOld.setLName(newValue.getLName());
				theOld.setPhone(newValue.getPhone());
				theOld.setPostalCode(newValue.getPostalCode());
				theOld.setProvince(newValue.getProvince());
				theOld.setSubDistrict(newValue.getSubDistrict());
				theOld.setPassword(newValue.getPassword());

				theOld.getTicket().clear();

				if (newValue != null) {
					theOld.getTicket().clear();
					if (newValue.getTicket() != null) {
						for (Ticket ticket : newValue.getTicket()) {
							Ticket objTicket = ticketRepo.findById(ticket.getId()).orElseThrow();
							theOld.getTicket().add(objTicket);
							if (!objTicket.getUser().equals(theOld)) {
								objTicket.setUser(theOld);
								ticketRepo.save(objTicket);
							}
						}
					}
				}
				return repo.save(theOld);
			}
		} else {
			throw new ResourceNotFoundException("Not found this user");
		}
	}


	public boolean validateUser(String email, String password) {
		User existinguser = repo.findByEmail(email);
		if (existinguser != null && existinguser.getPassword().equals(password)) {
			return true;
		} else
			return false;
	}

	public User findByEmail(String userEmail) {
		return repo.findByEmail(userEmail);
	}
}
