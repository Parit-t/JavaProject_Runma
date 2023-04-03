package com.gable.runma.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gable.runma.model.RaceType;
import com.gable.runma.service.RaceTypeService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/raceType")
public class RaceTypeController {
	@Autowired
	private RaceTypeService service;
	
	@PostMapping("/createRaceType/{eventId}")
    public RaceType createRaceTypeByEventId(@RequestBody RaceType theRaceType, @PathVariable Integer eventId) {
        theRaceType.setId(0);
        return service.saveRaceTypeByEventId(theRaceType, eventId);

    }

}
