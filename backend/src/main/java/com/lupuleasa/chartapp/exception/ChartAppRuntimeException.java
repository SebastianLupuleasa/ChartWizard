package com.lupuleasa.chartapp.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChartAppRuntimeException extends RuntimeException{

    private final String exceptionMessage;

    public ChartAppRuntimeException(String exceptionMessage) {
        this.exceptionMessage = exceptionMessage;
    }
}
