package com.lupuleasa.chartapp;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * The main class of the application
 */
@SpringBootApplication()
@OpenAPIDefinition(info = @Info(title = "ChartWizard APIs",version = "1.0",description = "An application that displays data using charts."))
public class ChartAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChartAppApplication.class, args);
	}

}
