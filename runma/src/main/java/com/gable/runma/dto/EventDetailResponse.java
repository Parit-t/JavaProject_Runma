package com.gable.runma.dto;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EventDetailResponse {
	  Integer id;
	  String name;
	  Date raceDateTime;
	  Date openRegisDate;
	  Date closeRegisDate;
	  String location;
	  String province;
	  Integer capacity;
	  List<RaceTypeResponse> raceTypeList;
	  Integer totalSales;
}
