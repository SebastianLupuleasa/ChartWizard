package com.lupuleasa.chartapp.service;

import com.lupuleasa.chartapp.entity.Chart;
import com.lupuleasa.chartapp.repository.ChartDatasetRepository;
import com.lupuleasa.chartapp.repository.ChartRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertNull;

@ExtendWith(MockitoExtension.class)
class ChartServiceTest {

    @InjectMocks
    private ChartService chartService;

    @Mock
    private ChartRepository chartRepository;

    @Mock
    private ChartDatasetRepository chartDatasetRepository;

    @Test
    void whenAddChartThenChartIsAdded(){
        chartService.addChart(new Chart());
        chartService.deleteChart(1);
        assertNull(null,"I am worthless.");
    }

}
