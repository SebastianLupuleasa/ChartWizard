package com.lupuleasa.chartapp.exception;

import lombok.Getter;
import lombok.Setter;

/**
 * The generic exception for this application
 */
@Getter
@Setter
public class ChartAppGenericException extends Exception {

    /**
     * The message of the exception
     */
    private final String exceptionMessage;

    public ChartAppGenericException(String exceptionMessage) {
        this.exceptionMessage = exceptionMessage;
    }
}
