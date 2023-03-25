package com.lupuleasa.chartapp.dto;

import com.lupuleasa.chartapp.entity.Chart;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SharedChartDto {

    private Integer chartId;
    private String email;
}
