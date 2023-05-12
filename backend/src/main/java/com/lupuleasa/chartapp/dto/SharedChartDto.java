package com.lupuleasa.chartapp.dto;

import lombok.*;

/**
 * The dto for a shared chart
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SharedChartDto {

    private Integer chartId;
    private String email;
}
