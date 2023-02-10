package com.lupuleasa.chartapp.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChartAppGenericException extends Exception {

    private final String exceptionMessage;

    public ChartAppGenericException(String exceptionMessage) {
        this.exceptionMessage = exceptionMessage;
    }
}
