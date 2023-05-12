package com.lupuleasa.chartapp.entity;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SortNatural;
import org.springframework.boot.context.properties.bind.DefaultValue;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Collection;
import java.util.List;

/**
 * The entity for the dataset of a chart
 */
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="ChartDataset")
public class ChartDataset implements Serializable {

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
    @OrderColumn
    private List<String> backgroundColor;

    @ElementCollection
    @Column(name = "borderColor")
    @OrderColumn
    private List<String> borderColor;

    @ElementCollection
    @Column(name = "datasetValues")
    @OrderColumn
    private List<BigDecimal> datasetValues;
}
