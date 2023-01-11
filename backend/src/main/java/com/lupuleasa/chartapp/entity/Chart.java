package com.lupuleasa.chartapp.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="Chart")
public class Chart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chart_id")
    private Long id;

    @Column(name = "chartTitle")
    private String chartTitle;

    @Column(name = "chartType")
    private String chartType;
    @ElementCollection
    @Column(name = "chartLabels")
    private List<String> chartLabels;

    @OneToMany()
    @Column(name = "chartDatasets")
    private List<ChartDataset> chartDatasets;

    @Column(name = "user_id")
    private Long userId;

    public Chart(Long id, String chartTitle, String chartType, List<String> chartLabels, List<ChartDataset> chartDatasets, Long userId) {
        this.id = id;
        this.chartTitle = chartTitle;
        this.chartType = chartType;
        this.chartLabels = chartLabels;
        this.chartDatasets = chartDatasets;
        this.userId = userId;
    }

    public Chart() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<ChartDataset> getChartDatasets() {
        return chartDatasets;
    }
    public void setChartDatasets(List<ChartDataset> chartDatasets) {
        this.chartDatasets = chartDatasets;
    }

    public String getChartTitle() {
        return chartTitle;
    }

    public void setChartTitle(String chartTitle) {
        this.chartTitle = chartTitle;
    }

    public String getChartType() {
        return chartType;
    }

    public void setChartType(String chartType) {
        this.chartType = chartType;
    }

    public List<String> getChartLabels() {
        return chartLabels;
    }

    public void setChartLabels(List<String> chartLabels) {
        this.chartLabels = chartLabels;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
