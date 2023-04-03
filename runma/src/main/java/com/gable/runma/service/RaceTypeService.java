package com.gable.runma.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gable.runma.model.Event;
import com.gable.runma.model.RaceType;
import com.gable.runma.repository.EventRepository;
import com.gable.runma.repository.RaceTypeRepository;

@Service
public class RaceTypeService {
	@Autowired
	private RaceTypeRepository repo;
	@Autowired
	private EventRepository eventRepo;
	
	public RaceType saveRaceTypeByEventId(RaceType theRaceType, Integer eventId) {
        Optional<Event> event = eventRepo.findById(eventId);

        if (event.isPresent()) {
            theRaceType.setEvent(event.get());
            return repo.save(theRaceType);
        } else {
            throw new RuntimeException("RaceType not found!");
        }

    }
}
