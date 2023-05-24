package com.lupuleasa.chartapp.handler;

import com.lupuleasa.chartapp.exception.ChartAppRuntimeException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.context.request.WebRequest;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;


@ExtendWith(MockitoExtension.class)
class CustomExceptionHandlerTest {

    @InjectMocks
    private CustomExceptionHandler customExceptionHandler;

    @Test
    void onAuthenticationSuccess() {

        WebRequest webRequest = mock(WebRequest.class);

        assertEquals(HttpStatus.I_AM_A_TEAPOT,customExceptionHandler.handleConflict(new ChartAppRuntimeException("i am an exception"),webRequest).getStatusCode(),"Exception is successfully handled!");

    }

}
