package com.lupuleasa.chartapp.controller;

import com.lupuleasa.chartapp.dto.SharedChartDto;
import com.lupuleasa.chartapp.entity.Chart;
import com.lupuleasa.chartapp.exception.ChartAppGenericException;
import com.lupuleasa.chartapp.service.ChartService;
import com.lupuleasa.chartapp.service.JwtUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ChartController {

    @Autowired
    private ChartService service;

    @GetMapping("/charts")
    public ResponseEntity<List<Chart>> getCharts(){
        return new ResponseEntity<>(service.getCharts(),HttpStatus.OK);
    }

    @GetMapping("/custom")
    public ResponseEntity<List<Chart>> getUserCharts(@RequestParam long userId){
      return new ResponseEntity<>(service.getChartsById(userId),HttpStatus.OK);
    }

    @GetMapping("/shared")
    public ResponseEntity<List<Chart>> getSharedUserCharts(@RequestParam long userId) throws ChartAppGenericException {
        return new ResponseEntity<>(service.getSharedChartsById(userId),HttpStatus.OK);
    }

    @PostMapping("/charts/add")
    public ResponseEntity<Chart> addChart(@RequestBody Chart chart){
        service.addChart(chart);
        return new ResponseEntity<>(chart,HttpStatus.OK);
    }

    @PostMapping("/charts/share")
    public ResponseEntity<String> shareChart(@RequestBody SharedChartDto sharedChartDto) throws ChartAppGenericException {
       service.shareChart(sharedChartDto.getChartId(),sharedChartDto.getEmail());
       return new ResponseEntity<>("Chart was successfully shared!",HttpStatus.OK);
    }

    @PutMapping("/charts/edit")
    public ResponseEntity<Chart> editChart(@RequestBody Chart chart){
        service.addChart(chart);
        return new ResponseEntity<>(chart,HttpStatus.OK);
    }

    @DeleteMapping("/charts/delete")
    public ResponseEntity<String> deleteChart(@RequestParam Integer chartId){
        service.deleteChart(chartId);
        return new ResponseEntity<>("Chart was successfully deleted!",HttpStatus.OK);
    }

}
