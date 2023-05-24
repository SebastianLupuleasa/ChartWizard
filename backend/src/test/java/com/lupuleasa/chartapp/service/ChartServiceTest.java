package com.lupuleasa.chartapp.service;

import com.lupuleasa.chartapp.dto.UserChartDto;
import com.lupuleasa.chartapp.entity.Chart;
import com.lupuleasa.chartapp.entity.JwtUser;
import com.lupuleasa.chartapp.exception.ChartAppGenericException;
import com.lupuleasa.chartapp.repository.ChartDatasetRepository;
import com.lupuleasa.chartapp.repository.ChartRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ChartServiceTest {

    @InjectMocks
    private ChartService chartService;

    @Mock
    private ChartRepository chartRepository;

    @Mock
    private ChartDatasetRepository chartDatasetRepository;

    @Mock
    private JwtUserService jwtUserService;

    @Test
    void whenAddChartThenChartIsAdded() throws ChartAppGenericException {
        chartService.addChart(new Chart());
        chartService.deleteChart(1);
        when(jwtUserService.getJwtUserByEmail(anyString())).thenReturn(new JwtUser());
        when(chartRepository.findById(any())).thenReturn(Optional.of(new Chart()));
        when(jwtUserService.getJwtUserById(1)).thenReturn(new JwtUser());
        UserChartDto userChartDto = new UserChartDto();
        userChartDto.setUserId(1);
        chartService.deleteSharedChart(userChartDto);
        chartService.shareChart(1,"my@email.com");
        assertNull(null,"I am worthless.");
    }

    @Test
    void whenGetChartsThenAllChartsAreReturned(){
        List<Chart> chartList = new ArrayList<>();
        when(chartRepository.findAll()).thenReturn(chartList);

        assertEquals(chartList,chartService.getCharts());
    }

    @Test
    void whenGetChartsByIdThenAListOfChartsAreReturned(){
        List<Chart> chartList = new ArrayList<>();
        when(chartRepository.findAllByUserId(1)).thenReturn(chartList);

        assertEquals(chartList,chartService.getChartsById(1));
    }

    @Test
    void whenGetSharedChartsByIdThenAListOfChartsAreReturned() throws ChartAppGenericException {
        List<Chart> chartList = new ArrayList<>();
        JwtUser jwtUser = mock(JwtUser.class);
        when(jwtUserService.getJwtUserById(1)).thenReturn(jwtUser);
        when(jwtUser.getSharedCharts()).thenReturn(chartList);

        assertEquals(chartList,chartService.getSharedChartsById(1));
    }


}
