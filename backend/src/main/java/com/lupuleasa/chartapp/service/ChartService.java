package com.lupuleasa.chartapp.service;

import com.lupuleasa.chartapp.entity.Chart;
import com.lupuleasa.chartapp.repository.ChartDatasetRepository;
import com.lupuleasa.chartapp.repository.ChartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChartService {

    @Autowired
    private ChartRepository repository;

    @Autowired
    private ChartDatasetRepository datasetRepository;

    public List<Chart> getCharts(){
        return repository.findAll();
    }

    public List<Chart> getChartsById(long userId){
        return repository.findAllByUserId(userId);
    }

    public void addChart(Chart chart){
        datasetRepository.saveAll(chart.getChartDatasets());
        repository.save(chart);
    }

    public void updateChart(Chart chart){
        repository.save(chart);
    }

    public void deleteChart(Integer id){
        repository.deleteById(id);
    }


}
