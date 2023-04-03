package com.gable.runma.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RaceTypeResponse {
	Integer id;
	Integer distance;
	Double price;
	String race_name;
	Integer sales;
}
