package com.gable.runma.model;
import java.util.*;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.Data;

/**
 * 
 */
@Data
@Entity
@JsonIdentityInfo(
        scope = Organizer.class,
		  generator = ObjectIdGenerators.PropertyGenerator.class,
		  property = "id")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Organizer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
	private String name;
    private String contact;
    private String website;
    private String facebook;
    @Column(unique = true)
    private String email;


    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {CascadeType.MERGE, CascadeType.REFRESH},
            mappedBy = "organizerList")
    @JsonIgnore
    private List<Event> eventList;

}