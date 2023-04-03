package com.gable.runma.model;

import java.time.LocalDate;
import java.util.Date;
import javax.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.Data;
@Data
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Table(name = "users")
@JsonIdentityInfo(scope = User.class,
		  generator = ObjectIdGenerators.PropertyGenerator.class,
		  property = "id")

public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String password;
	private String fName;
	private String lName;

	@Column(unique = true)
	private String email;
	private String phone;

	@Enumerated(EnumType.STRING)
	private Gender gender;

	@Temporal(TemporalType.DATE)
	private Date birthDate;
	private String address;
	private String country;
	private String province;
	private String subDistrict;
	private String district;
	private int postalCode;

	@OneToMany (mappedBy = "user" ,fetch = FetchType.LAZY ,cascade = {CascadeType.REMOVE, CascadeType.PERSIST, CascadeType.MERGE})
	private List<Ticket> ticket;
}
