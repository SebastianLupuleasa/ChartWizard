package com.lupuleasa.chartapp.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name="ChartDataset")
public class ChartDataset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "label")
    private String label;

    @ElementCollection
    @Column(name = "backgroundColor")
    private List<String> backgroundColor;

    @ElementCollection
    @Column(name = "borderColor")
    private List<String> borderColor;

    @ElementCollection
    @Column(name = "datasetValues")
    private List<BigDecimal> datasetValues;

    public ChartDataset(long id, String label, List<String> backgroundColor, List<String> borderColor, List<BigDecimal> datasetValues) {
        this.id = id;
        this.label = label;
        this.backgroundColor = backgroundColor;
        this.borderColor = borderColor;
        this.datasetValues = datasetValues;
    }

    public ChartDataset() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public List<String> getBackgroundColor() {
        return backgroundColor;
    }

    public void setBackgroundColor(List<String> backgroundColor) {
        this.backgroundColor = backgroundColor;
    }

    public List<String> getBorderColor() {
        return borderColor;
    }

    public void setBorderColor(List<String> borderColor) {
        this.borderColor = borderColor;
    }

    public List<BigDecimal> getDatasetValues() {
        return datasetValues;
    }

    public void setDatasetValues(List<BigDecimal> datasetValues) {
        this.datasetValues = datasetValues;
    }

}
