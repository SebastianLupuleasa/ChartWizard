package com.lupuleasa.chartapp.controller;

import com.lupuleasa.chartapp.entity.Chart;
import com.lupuleasa.chartapp.service.ChartService;
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

    @PostMapping("/charts/add")
    public ResponseEntity<Chart> addChart(@RequestBody Chart chart){
        service.addChart(chart);
        return new ResponseEntity<>(chart,HttpStatus.OK);
    }

    @PutMapping("/charts/edit/{id}")
    public void updateChart(@PathVariable("id") Integer id, @RequestBody Chart chart){
        service.updateChart(chart);
    }

    @DeleteMapping("/charts/delete")
    public void deleteChart(@RequestParam Integer chartId){
        service.deleteChart(chartId);
    }

}
