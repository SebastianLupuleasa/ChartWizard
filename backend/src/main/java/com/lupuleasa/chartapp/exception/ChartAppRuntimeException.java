package com.lupuleasa.chartapp.exception;

import lombok.Getter;
import lombok.Setter;

/**
 * The runtime exception for this application
 */
@Getter
@Setter
public class ChartAppRuntimeException extends RuntimeException{

    /**
     * The message of the exception
     */
    private final String exceptionMessage;

    public ChartAppRuntimeException(String exceptionMessage) {
        this.exceptionMessage = exceptionMessage;
    }
}
