package com.mungeli.to_do.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration  // Tells Spring this is a configuration class
public class CorsConfig {
    @Bean       // Marks this method as one that creates a Spring Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")          // Apply to all paths
                        .allowedOrigins("http://localhost:3000")  // Allow requests from React app
                        .allowedMethods("GET", "POST", "PUT", "DELETE")  // Allow these HTTP methods
                        .allowedHeaders("*");           // Allow all headers
            }
        };
    }
}