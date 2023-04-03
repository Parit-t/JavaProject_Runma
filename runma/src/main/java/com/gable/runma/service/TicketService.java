package com.gable.runma.service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.gable.runma.dto.TicketRequest;
import com.gable.runma.exception.CapacityReachedException;
import com.gable.runma.exception.EventNotFoundException;
import com.gable.runma.exception.RaceTypeNotFoundException;
import com.gable.runma.exception.ResourceNotFoundException;
import com.gable.runma.exception.UserNotFoundException;
import com.gable.runma.model.RaceType;
import com.gable.runma.model.Status;
import com.gable.runma.model.Ticket;
import com.gable.runma.model.User;
import com.gable.runma.repository.EventRepository;
import com.gable.runma.repository.RaceTypeRepository;
import com.gable.runma.repository.TicketRepository;
import com.gable.runma.repository.UserRepository;
import com.gable.runma.model.Event;

@Service
public class TicketService {
	
	@Autowired
	private RaceTypeRepository raceTypeRepo;
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private TicketRepository ticketRepo;
	@Autowired
	private EventRepository eventRepo;
	
	public Ticket newTicket(TicketRequest req) {
		
		//find
		RaceType rt = raceTypeRepo.findById(req.raceTypeId())
				.orElseThrow(() -> new RaceTypeNotFoundException("The RaceType Not Exist"));
		User user = userRepo.findById(req.userId())
				.orElseThrow(() -> new UserNotFoundException("The User Not Exist"));
		Integer eventId = eventRepo.findEventIdByRaceTypeId(rt.getId());
		Integer eventSale = ticketRepo.countTicketsByEventId(eventId);
		
		Event event = eventRepo.findById(eventId)
				.orElseThrow(() -> new EventNotFoundException("Event Not Exist")); 
		//check
		if(eventSale >= event.getCapacity()) {
			throw new CapacityReachedException("Maximum Ticket Reached");
		}
		
		Ticket ticket = new Ticket();	
		ticket.setCreateDate(req.createDate());
		ticket.setStatus(Status.unpaid);
		ticket.setShirtSize(req.shirtSize());
		ticket.setRaceType(rt);
		ticket.setUser(user);
		
		return ticketRepo.save(ticket);
		
	}
	public Ticket updateTicket(Integer ticketId, TicketRequest req) {

        Ticket ticket = ticketRepo.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket with id [%s] not found".formatted(ticketId)));

        //ticket = ticketDTOMapper.ticketRequest(updateRequest, ticket);
        ticket.setCreateDate(req.createDate());
		ticket.setStatus(Status.unpaid);
		ticket.setShirtSize(req.shirtSize());
		return ticketRepo.save(ticket);
    }
	public List<Ticket> findAll() {
		return ticketRepo.findAll();
	}
    //get ticket by ticketId
    public Ticket findById(Integer id) {
        Ticket ticket = ticketRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket with id: " + id + " does not exist"));
        return ResponseEntity.ok(ticket).getBody();
    }
    
    public void delete(Integer theId) {
        ticketRepo.deleteById(theId);
    }
	public List<Ticket> findByUserId(Integer id){
		User user = userRepo.findById(id).orElseThrow();
		List<Ticket> tic = user.getTicket();
		return tic;
	}
	public List<Ticket> querySaleReport(Integer eventID) {

        Optional<Event> resultEvent = eventRepo.findById(eventID);
        if (!resultEvent.isPresent()) {
            throw new RuntimeException("Event not found with eventId : " + eventID);
        }

        List<Ticket> resultTicket = ticketRepo.findByStatusAndRaceType_EventId(Status.unpaid, eventID);
        if (resultTicket.isEmpty()) {
            throw new RuntimeException("Event has no unpaid tickets");
        }

        return resultTicket;
    }
}
