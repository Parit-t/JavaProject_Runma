package com.gable.runma.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.gable.runma.model.Event;

public interface EventRepository extends JpaRepository<Event, Integer>{

	@Query("SELECT e.id FROM Event e JOIN e.raceTypeList rt WHERE rt.id = :raceTypeId")
    Integer findEventIdByRaceTypeId(@Param("raceTypeId") Integer raceTypeId);

}
