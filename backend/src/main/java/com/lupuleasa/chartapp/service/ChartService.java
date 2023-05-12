package com.lupuleasa.chartapp.service;

import com.lupuleasa.chartapp.dto.UserChartDto;
import com.lupuleasa.chartapp.entity.Chart;
import com.lupuleasa.chartapp.entity.JwtUser;
import com.lupuleasa.chartapp.exception.ChartAppGenericException;
import com.lupuleasa.chartapp.repository.ChartDatasetRepository;
import com.lupuleasa.chartapp.repository.ChartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * The service responsible for all the CRUD operations performed on a chart
 */
@Service
public class ChartService {

    @Autowired
    private JwtUserService jwtUserService;

    @Autowired
    private ChartRepository repository;

    @Autowired
    private ChartDatasetRepository datasetRepository;

    /**
     * This method returns all the charts
     * @return a list of all the charts present in the database
     */
    public List<Chart> getCharts(){
        return repository.findAll();
    }

    /**
     * This method returns all the charts by user id
     * @param userId the userId
     * @return a list of all the charts present in the database that belongs to a user
     */
    public List<Chart> getChartsById(long userId){
        return repository.findAllByUserId(userId);
    }

    /**
     * This method adds a chart to the database
     * @param chart the chart to be added
     */
    public void addChart(Chart chart){
        datasetRepository.saveAll(chart.getChartDatasets());
        repository.save(chart);
    }

    /**
     * The method responsible for sharing a chart
     * @param chartId the id of the chart to be shared
     * @param email the email of the user to which the chart to be shared
     * @throws ChartAppGenericException the generic exception
     */
    public void shareChart(Integer chartId, String email) throws ChartAppGenericException {
        JwtUser jwtUser = jwtUserService.getJwtUserByEmail(email);
        List<Chart> sharedCharts = jwtUser.getSharedCharts();
        if(repository.findById(chartId).isPresent() && !sharedCharts.contains(repository.findById(chartId).get())) {
            sharedCharts.add(repository.findById(chartId).get());
        }
        jwtUser.setSharedCharts(sharedCharts);
        jwtUserService.save(jwtUser);
    }

    /**
     * The method responsible for deleting a chart by the id
     * @param id the id of the chart to be deleted
     */
    public void deleteChart(Integer id){
        repository.deleteById(id);
    }

    /**
     * This method returns all the shared charts by user id
     * @param userId the userId
     * @return a list of shared charts that belongs to a user
     * @throws ChartAppGenericException the generic exception
     */
    public List<Chart> getSharedChartsById(long userId) throws ChartAppGenericException {
        JwtUser jwtUser = jwtUserService.getJwtUserById(userId);
        return jwtUser.getSharedCharts();
    }

    /**
     * This method is responsible for the deletion of a shared chart
     * @param userChartDto the dto that contains the user id and the shared chart id
     * @throws ChartAppGenericException the generic exception
     */
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






