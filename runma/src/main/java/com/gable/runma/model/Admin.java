package com.gable.runma.model;

import javax.persistence.Entity;
import javax.persistence.MappedSuperclass;

import lombok.Data;

@Entity
@Data
public class Admin extends User {
}
