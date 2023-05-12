package com.lupuleasa.chartapp.handler;

import com.lupuleasa.chartapp.exception.ChartAppGenericException;
import com.lupuleasa.chartapp.exception.ChartAppRuntimeException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * The handler that logs and handles all the exceptions
 */
@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

    /**
     * Handles all the thrown exceptions
     * @param ex the exception to be handled
     * @param request the web request
     * @return a response entity with the exception
     */
    @ExceptionHandler(value= { ChartAppRuntimeException.class, ChartAppGenericException.class, Exception.class})
    protected ResponseEntity<Object> handleConflict(
            Exception ex, WebRequest request) {
        Logger logger = Logger.getAnonymousLogger();
        logger.log(Level.SEVERE, "An chart app exception was thrown", ex);

        return handleExceptionInternal(ex, ex.getMessage(),
                new HttpHeaders(), HttpStatus.I_AM_A_TEAPOT, request);
    }

}
