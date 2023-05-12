package com.lupuleasa.chartapp.dto;

import lombok.*;


/**
 * The dto that links a chart and a user
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserChartDto {
    private Integer chartId;
    private Integer userId;
}
