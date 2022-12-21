package com.lupuleasa.chartapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
public class ChartappApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChartappApplication.class, args);
	}

}
