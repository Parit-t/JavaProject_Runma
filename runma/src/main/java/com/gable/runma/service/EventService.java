package com.gable.runma.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;


import com.gable.runma.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.gable.runma.model.Organizer;
import com.gable.runma.model.RaceType;
import com.gable.runma.model.Status;
import com.gable.runma.model.Event;
import com.gable.runma.repository.OrganizerRepository;
import com.gable.runma.repository.EventRepository;
import com.gable.runma.repository.RaceTypeRepository;
import com.gable.runma.repository.TicketRepository;
import com.gable.runma.dto.EventDetailResponse;
import com.gable.runma.dto.RaceTypeResponse;
import com.gable.runma.exception.EventNotFoundException;
import com.gable.runma.exceptionHandling.EventException;

@Service
public class EventService {

	@Autowired
	private EventRepository eventRepo;
	@Autowired
	private RaceTypeRepository raceRepo;
	@Autowired
	private OrganizerRepository orgRepo;
	@Autowired
	private TicketRepository ticketRepo;
	
	public List<Event> getAllEvent() {
		return eventRepo.findAll();
	}
	//get raceType from Event
	public List<RaceType> findRaceFromEvent(Integer id) {
		Event event;
		event = eventRepo.findById(id).orElseThrow(
				() -> {throw new EventException("Update Fail : Event Not Found");}
		);
		return event.getRaceTypeList();
	}
	//get org by id
	public List<Event> findByOrg(int Orgid)
	{
		List<Event> allEvents = eventRepo.findAll();
		Organizer Org = orgRepo.findById(Orgid).orElseThrow();
		List<Event> result = new ArrayList<Event>();
		for (Event event : allEvents)
		{
			if(event.getOrganizerList().contains(Org) )
			{
				result.add(event);
			}
		}
		return result;
	}
	//find all event
	public List<Event> findAll() {
		return eventRepo.findAll();
	}
	//find one event
	public Optional<Event> findOne(Integer id) {
		try{
			Optional<Event> event = eventRepo.findById(id);
			if(event.isEmpty()) {
				throw new EventException("Event not found");
			} else {
				return event;
			}
		} catch (EventException e) {
			return Optional.empty();
		}
	}


	//Create new event
	public Event createEvent(Event theEvent, Integer organizerId) {
		Organizer organizer = orgRepo.findById(organizerId).orElse(null);
		if (organizer == null) {
			throw new ResourceNotFoundException("Organizer not found");
		}

		// Initialize OrganizerList if it is null
		if (theEvent.getOrganizerList() == null) {
			theEvent.setOrganizerList(new ArrayList<Organizer>());
		}

		theEvent.getOrganizerList().add(organizer);
		organizer.getEventList().add(theEvent);

		Event resultEvent = eventRepo.save(theEvent);
		if (theEvent.getRaceTypeList() != null) {
			for (RaceType raceType : theEvent.getRaceTypeList()) {
				raceType.setEvent(resultEvent);
				raceRepo.save(raceType);
			}
		}
		return resultEvent;
	}

	public Event update(Event newEvent) {
		Event oldEvent;
		oldEvent = eventRepo.findById(newEvent.getId()).orElseThrow(
				() -> {throw new EventException("Update Fail : Event Not Found");}
		);
		oldEvent.setName(newEvent.getName());
		oldEvent.setRaceDate(newEvent.getRaceDate());
		oldEvent.setOpenRegisDate(newEvent.getOpenRegisDate());
		oldEvent.setCloseRegisDate(newEvent.getCloseRegisDate());
		oldEvent.setOutOfTicketFlag(newEvent.getOutOfTicketFlag());
		oldEvent.setProvince(newEvent.getProvince());
		oldEvent.setLocation(newEvent.getLocation());
		oldEvent.setCapacity(newEvent.getCapacity());

		if(newEvent.getOrganizerList() != null) {
			List <Organizer> pendingOrg = new ArrayList<Organizer>();
			for (Organizer newOrg : newEvent.getOrganizerList()) {
				Organizer findOrg = orgRepo.findById(newOrg.getId()).orElseThrow(() -> {throw new EventException("Update Fail : Event Not Found");});
				pendingOrg.add(findOrg);
				}
			oldEvent.setOrganizerList(pendingOrg);
			} else
		{
			oldEvent.setOrganizerList(null);
		}

		if(newEvent.getRaceTypeList() != null) {
			for(RaceType requestRaceType: newEvent.getRaceTypeList()){
				if(requestRaceType.getId()!=null) {
					RaceType oldRaceType = raceRepo.findById(requestRaceType.getId()).orElseThrow(() -> {
						throw new EventException("Update Fail : Racetype Fail");
					});
					oldRaceType.setName(requestRaceType.getName());
					oldRaceType.setDistance(requestRaceType.getDistance());
					oldRaceType.setPrice(requestRaceType.getPrice());
					oldRaceType.setEvent(oldEvent);
					raceRepo.save(oldRaceType);
				}
				else{
					List<RaceType> existRaceType = raceRepo.findAll();
					RaceType lastRaceType = existRaceType.get(existRaceType.size()-1);
					requestRaceType.setId(lastRaceType.getId()+1);
					requestRaceType.setName(requestRaceType.getName());
					requestRaceType.setDistance(requestRaceType.getDistance());
					requestRaceType.setPrice(requestRaceType.getPrice());
					requestRaceType.setEvent(oldEvent);
					raceRepo.save(requestRaceType);
				}
			}
		}else {
			oldEvent.getRaceTypeList().clear();
		}
		return eventRepo.save(oldEvent);
	}

	public EventDetailResponse findDTOOne(Integer id) {    
		Event e = eventRepo.findById(id).orElseThrow(() -> new EventNotFoundException());      
		List<RaceTypeResponse> rtResList = new ArrayList<>();      Integer totalSales =0;      
		for(RaceType rt : e.getRaceTypeList()) {        
			totalSales += ticketRepo.findByStatusAndRaceType(Status.paid,rt).size();      
			rtResList.add(new RaceTypeResponse(rt.getId(), rt.getDistance(), rt.getPrice(), rt.getName(),ticketRepo.findByStatusAndRaceType(Status.paid,rt).size()));      }
		EventDetailResponse eRes = new EventDetailResponse      (e.getId(), e.getName(), e.getRaceDate(),  
				e.getOpenRegisDate(), e.getCloseRegisDate(), e.getLocation(),     
				e.getProvince(), e.getCapacity(), rtResList,totalSales);      return eRes;   }
	

}
