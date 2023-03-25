package com.lupuleasa.chartapp.service;

import com.lupuleasa.chartapp.dto.UserChartDto;
import com.lupuleasa.chartapp.entity.Chart;
import com.lupuleasa.chartapp.entity.JwtUser;
import com.lupuleasa.chartapp.exception.ChartAppGenericException;
import com.lupuleasa.chartapp.repository.ChartDatasetRepository;
import com.lupuleasa.chartapp.repository.ChartRepository;
import com.lupuleasa.chartapp.repository.JwtUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChartService {

    @Autowired
    private JwtUserService jwtUserService;

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
    public void shareChart(Integer chartId, String email) throws ChartAppGenericException {
        JwtUser jwtUser = jwtUserService.getJwtUserByEmail(email);
        List<Chart> sharedCharts = jwtUser.getSharedCharts();
        if(repository.findById(chartId).isPresent() && !sharedCharts.contains(repository.findById(chartId).get())) {
            sharedCharts.add(repository.findById(chartId).get());
        }
        jwtUser.setSharedCharts(sharedCharts);
        jwtUserService.save(jwtUser);
    }

    public void deleteChart(Integer id){
        repository.deleteById(id);
    }

    public List<Chart> getSharedChartsById(long userId) throws ChartAppGenericException {
        JwtUser jwtUser = jwtUserService.getJwtUserById(userId);
        return jwtUser.getSharedCharts();
    }

    public void deleteSharedChart(UserChartDto userChartDto) throws ChartAppGenericException {
        JwtUser jwtUser = jwtUserService.getJwtUserById(userChartDto.getUserId());
        List<Chart> sharedCharts = jwtUser.getSharedCharts();
        if(repository.findById(userChartDto.getChartId()).isPresent()) {
            sharedCharts.remove(repository.findById(userChartDto.getChartId()).get());
        }
        jwtUser.setSharedCharts(sharedCharts);
        jwtUserService.save(jwtUser);
    }
}






