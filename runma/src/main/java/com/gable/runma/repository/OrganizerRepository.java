package com.gable.runma.repository;

import com.gable.runma.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import com.gable.runma.model.Organizer;

public interface OrganizerRepository extends JpaRepository<Organizer, Integer> {
    public Organizer findByEmail(String email);
}
