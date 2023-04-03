package com.gable.runma.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gable.runma.model.RaceType;
import com.gable.runma.model.Status;
import com.gable.runma.model.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {
	
	@Query("SELECT COUNT(t) FROM Ticket t WHERE t.raceType.event.id = :eventId")
    Integer countTicketsByEventId(@Param("eventId") Integer eventId);

	List<Ticket> findByStatusAndRaceType_EventId(Status unpaid, Integer eventID);
    List<Ticket> findByStatus(Status status);
    List<Ticket> findByStatusAndRaceType(Status status, RaceType r );
}
