package com.lupuleasa.chartapp.security;

import com.lupuleasa.chartapp.exception.ChartAppRuntimeException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.BufferedReader;
import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class JsonObjectAuthenticationFilterTest {

    @InjectMocks
    private JsonObjectAuthenticationFilter jsonObjectAuthenticationFilter;

    @Test
    void attemptAuthentication() throws IOException {
        HttpServletRequest httpServletRequest = mock(HttpServletRequest.class);
        HttpServletResponse httpServletResponse =  mock(HttpServletResponse.class);

        when(httpServletRequest.getReader()).thenReturn(mock(BufferedReader.class));

        assertThrows(
                ChartAppRuntimeException.class,()->
       jsonObjectAuthenticationFilter.attemptAuthentication(httpServletRequest,httpServletResponse),
                "ChartAppRuntimeException is thrown");
    }

    @Test
    void attemptAuthenticationNotNull() throws IOException {
        HttpServletRequest httpServletRequest = mock(HttpServletRequest.class);
        HttpServletResponse httpServletResponse =  mock(HttpServletResponse.class);
        BufferedReader reader = mock(BufferedReader.class);

        when(httpServletRequest.getReader()).thenReturn(reader);
        when(reader.readLine()).thenReturn("myLine").thenReturn(null);

        assertThrows(
                ChartAppRuntimeException.class,()->
                        jsonObjectAuthenticationFilter.attemptAuthentication(httpServletRequest,httpServletResponse),
                "ChartAppRuntimeException is thrown");
    }

}
