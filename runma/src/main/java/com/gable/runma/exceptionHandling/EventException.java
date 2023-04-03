package com.gable.runma.exceptionHandling;

import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class EventException extends RuntimeException{
    public EventException(String string){
        super(string);
    }
}
