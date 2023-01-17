package com.lupuleasa.chartapp.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="Chart")
public class Chart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chart_id")
    private long id;

    @Column(name = "chartTitle")
    private String chartTitle;

    @Column(name = "chartType")
    private String chartType;

    @Column(name = "chartAnimation")
    private String chartAnimation;

    @ElementCollection
    @Column(name = "chartLabels")
    private List<String> chartLabels;

    @OneToMany()
    @Column(name = "chartDatasets")
    private List<ChartDataset> chartDatasets;

    @Column(name = "user_id")
    private long userId;

    public Chart(long id, String chartTitle, String chartType, String chartAnimation, List<String> chartLabels, List<ChartDataset> chartDatasets, long userId) {
        this.id = id;
        this.chartTitle = chartTitle;
        this.chartType = chartType;
        this.chartAnimation = chartAnimation;
        this.chartLabels = chartLabels;
        this.chartDatasets = chartDatasets;
        this.userId = userId;
    }

    public Chart() {
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

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getChartAnimation() {
        return chartAnimation;
    }

    public void setChartAnimation(String chartAnimation) {
        this.chartAnimation = chartAnimation;
    }
}
