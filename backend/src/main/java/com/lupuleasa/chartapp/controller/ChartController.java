package com.lupuleasa.chartapp.controller;

import com.lupuleasa.chartapp.dto.SharedChartDto;
import com.lupuleasa.chartapp.dto.UserChartDto;
import com.lupuleasa.chartapp.entity.Chart;
import com.lupuleasa.chartapp.exception.ChartAppGenericException;
import com.lupuleasa.chartapp.service.ChartService;
import com.lupuleasa.chartapp.service.JwtUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * The controller responsible for performing operations on charts
 */
@RestController
public class ChartController {

    @Autowired
    private ChartService service;

    /**
     * Gets all the charts
     * @return a list with all the charts
     */
    @GetMapping("/charts")
    public ResponseEntity<List<Chart>> getCharts(){
        return new ResponseEntity<>(service.getCharts(),HttpStatus.OK);
    }

    /**
     * Gets the charts belonging to a user
     * @param userId the user id
     * @return a list of charts belonging to a user
     */
    @GetMapping("/custom")
    public ResponseEntity<List<Chart>> getUserCharts(@RequestParam long userId){
      return new ResponseEntity<>(service.getChartsById(userId),HttpStatus.OK);
    }

    /**
     * Gets the shared charts belonging to a user
     * @param userId the user id
     * @return a list of shared charts belonging to a user
     * @throws ChartAppGenericException the generic exception
     */
    @GetMapping("/shared")
    public ResponseEntity<List<Chart>> getSharedUserCharts(@RequestParam long userId) throws ChartAppGenericException {
        return new ResponseEntity<>(service.getSharedChartsById(userId),HttpStatus.OK);
    }

    /**
     * Adds a chart to the database
     * @param chart the chart to be added
     * @return the added chart
     */
    @PostMapping("/charts/add")
    public ResponseEntity<Chart> addChart(@RequestBody Chart chart){
        service.addChart(chart);
        return new ResponseEntity<>(chart,HttpStatus.OK);
    }

    /**
     * Shares a chart
     * @param sharedChartDto a dto containing the id of a chart and the email of a user
     * @return a response entity with a success message
     * @throws ChartAppGenericException the generic exception
     */
    @PostMapping("/charts/share")
    public ResponseEntity<String> shareChart(@RequestBody SharedChartDto sharedChartDto) throws ChartAppGenericException {
       service.shareChart(sharedChartDto.getChartId(),sharedChartDto.getEmail());
       return new ResponseEntity<>("Chart was successfully shared!",HttpStatus.OK);
    }

    /**
     * Edits and chart
     * @param chart the chart to be edited
     * @return the edited chart
     */
    @PutMapping("/charts/edit")
    public ResponseEntity<Chart> editChart(@RequestBody Chart chart){
        service.addChart(chart);
        return new ResponseEntity<>(chart,HttpStatus.OK);
    }

    /**
     * Deletes a shared chart
     * @param userChartDto a dto containing the user id and chart id
     * @return a response entity with a success message
     * @throws ChartAppGenericException the generic exception
     */
    @PostMapping("/charts/shared/delete")
    public ResponseEntity<String> deleteSharedChart(@RequestBody UserChartDto userChartDto) throws ChartAppGenericException {
        service.deleteSharedChart(userChartDto);
        return new ResponseEntity<>("Shared chart was successfully deleted!",HttpStatus.OK);
    }

    /**
     * Deletes a chart
     * @param chartId the id of a chart to be deleted
     * @return a response entity with a success message
     */
    @DeleteMapping("/charts/delete")
    public ResponseEntity<String> deleteChart(@RequestParam Integer chartId){
        service.deleteChart(chartId);
        return new ResponseEntity<>("Chart was successfully deleted!",HttpStatus.OK);
    }

}
