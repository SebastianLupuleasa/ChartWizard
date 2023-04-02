package com.lupuleasa.chartapp.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="Chart")
public class Chart implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chart_id")
    private long id;

    @Column(name = "chartTitle")
    private String chartTitle;

    @Column(name = "chartType")
    private String chartType;

    @Column(name = "chartAnimation")
    private String chartAnimation = "none";

    @ElementCollection
    @Column(name = "chartLabels")
    @OrderColumn
    private List<String> chartLabels;

    @OneToMany(cascade=CascadeType.REMOVE)
    @Column(name = "chartDatasets")
    private List<ChartDataset> chartDatasets;

    @Column(name = "user_id")
    private long userId;

    @ElementCollection
    @Column(name = "sharedTo")
    private List<Long> userIds;
}
