package com.lupuleasa.chartapp.controller;

import com.lupuleasa.chartapp.entity.Chart;
import com.lupuleasa.chartapp.service.ChartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class ChartController {

    @Autowired
    private ChartService service;

    @GetMapping("/charts")
    public ResponseEntity<List<Chart>> getCharts(){
        return new ResponseEntity<>(service.getCharts(),HttpStatus.OK);
    }

    @PostMapping("/charts/add")
    public void addFriend(@RequestBody Chart chart){
        service.addChart(chart);
    }

    @PutMapping("/charts/edit/{id}")
    public void updateFriend(@PathVariable("id") Integer id, @RequestBody Chart chart){
        service.updateChart(chart);
    }

    @DeleteMapping("/charts/delete/{id}")
    public void deleteChart(@PathVariable("id") Integer id){
        service.deleteChart(id);
    }
}
