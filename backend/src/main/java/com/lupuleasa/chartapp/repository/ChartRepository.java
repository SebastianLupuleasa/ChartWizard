package com.lupuleasa.chartapp.repository;

import com.lupuleasa.chartapp.entity.Chart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChartRepository extends JpaRepository<Chart, Integer> {
    List<Chart> findAllById(long userId);
}
