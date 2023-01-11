package com.lupuleasa.chartapp.repository;

import com.lupuleasa.chartapp.entity.ChartDataset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChartDatasetRepository extends JpaRepository<ChartDataset, Integer> {
}
