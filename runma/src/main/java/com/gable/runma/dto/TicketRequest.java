package com.gable.runma.dto;

import java.util.Date;

import javax.validation.constraints.NotNull;


public record TicketRequest (
		@NotNull(message = "Create Date is required")
		Date createDate,
		@NotNull(message = "User ID is required")
		Integer userId,
		@NotNull(message = "Race Type ID is required")
		Integer raceTypeId,
		@NotNull(message = "Shirt Size in required")
		String shirtSize
		) {}
	

