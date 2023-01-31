package com.lupuleasa.chartapp.entity;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="ChartDataset")
public class ChartDataset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "label")
    private String label;

    @Column(name = "type")
    @Nullable
    private String type;

    @ElementCollection
    @Column(name = "backgroundColor")
    private List<String> backgroundColor;

    @ElementCollection
    @Column(name = "borderColor")
    private List<String> borderColor;

    @ElementCollection
    @Column(name = "datasetValues")
    private List<BigDecimal> datasetValues;
}
