package com.gable.runma.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gable.runma.dto.EventDetailResponse;
import com.gable.runma.model.Event;
import com.gable.runma.model.RaceType;
import com.gable.runma.service.EventService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/event")
public class EventController {

	@Autowired
	private EventService service;

	@GetMapping("/")
	public List<Event> findAll() {
		return service.findAll();
	}

	@GetMapping("/admin/")
	public List<Event> findAllAdmin() {
		return service.getAllEvent();
	}

	@GetMapping("/{id}/raceType")
	public List<RaceType> eventRaceType (@PathVariable Integer id) { return service.findRaceFromEvent(id);}

	@GetMapping("/{id}")
	public Optional<Event> findOne(@PathVariable Integer id) {
		return service.findOne(id);
	}

	@GetMapping("/organizer/{id}")
	public List<Event> getByOrg(@PathVariable Integer id) {
		return service.findByOrg(id);
	}

	//CREATE event
	@PostMapping("/{organizerId}")
	public Event create(@RequestBody Event theEvent, @PathVariable Integer organizerId) {
		service.createEvent(theEvent, organizerId);
		return theEvent;
	}

	@PutMapping("/{id}")
	public Event update(@RequestBody Event event, @PathVariable Integer id) {
		return service.update(event);
	}



//	@DeleteMapping("/{id}")
//	void delete(@PathVariable Integer id) {
//		service.delete(id);
//	}
	
	@GetMapping("/detail/{id}")
	public ResponseEntity<EventDetailResponse> findDTOOne(@PathVariable Integer id) {
		EventDetailResponse res =service.findDTOOne(id);
		return ResponseEntity.ok(res);
	}
}
