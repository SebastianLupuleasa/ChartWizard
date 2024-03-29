package com.lupuleasa.chartapp.controller;

import com.lupuleasa.chartapp.dto.SharedChartDto;
import com.lupuleasa.chartapp.dto.UserChartDto;
import com.lupuleasa.chartapp.entity.Chart;
import com.lupuleasa.chartapp.exception.ChartAppGenericException;
import com.lupuleasa.chartapp.service.ChartService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;

import static org.junit.jupiter.api.Assertions.assertEquals;


@ExtendWith(MockitoExtension.class)
class ChartControllerTest {

    @InjectMocks
    private ChartController chartController;

    @Mock
    private ChartService chartService;

    @Test
    void whenGetChartsThenChartsAreReturned(){
        assertEquals(HttpStatus.OK,chartController.getCharts().getStatusCode(),"Status codes are the same!");
    }

    @Test
    void whenGetUserChartsThenChartsAreReturned(){
        assertEquals(HttpStatus.OK,chartController.getUserCharts(2).getStatusCode(),"Status codes are the same!");
    }

    @Test
    void whenGetSharedChartsThenChartsAreReturned() throws ChartAppGenericException {
        assertEquals(HttpStatus.OK,chartController.getSharedUserCharts(2).getStatusCode(),"Status codes are the same!");
    }


    @Test
    void whenAddChartThenChartIsAdded(){
        assertEquals(HttpStatus.OK,chartController.addChart(new Chart()).getStatusCode(),"Status codes are the same!");
    }

    @Test
    void whenDeleteChartThenChartIsDeleted(){
        assertEquals(HttpStatus.OK,chartController.deleteChart(2).getStatusCode(),"Status codes are the same!");
    }

    @Test
    void whenShareChartThenChartGetsShared() throws ChartAppGenericException {
        assertEquals(HttpStatus.OK,chartController.shareChart(new SharedChartDto()).getStatusCode(),"Status codes are the same!");
    }

    @Test
    void whenEditChartThenChartGetsEdited() {
        assertEquals(HttpStatus.OK,chartController.editChart(new Chart()).getStatusCode(),"Status codes are the same!");
    }

    @Test
    void whenDeletedSharedChartThenChartGetsDeleted() throws ChartAppGenericException {
        assertEquals(HttpStatus.OK,chartController.deleteSharedChart(new UserChartDto()).getStatusCode(),"Status codes are the same!");
    }
}
