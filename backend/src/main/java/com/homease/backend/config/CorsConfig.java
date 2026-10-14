// package com.homease.backend.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.servlet.config.annotation.CorsRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// @Configuration
// public class CorsConfig {

//     @Bean
//     public WebMvcConfigurer corsConfigurer() {
//         return new WebMvcConfigurer() {
//             @Override
//             public void addCorsMappings(CorsRegistry registry) {
//                 registry.addMapping("/**")
//                         .allowedOrigins("*") // Allow all origins for dev simplicity
//                         .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//                         .allowedHeaders("*");
//             }

//             @Override
//             public void addResourceHandlers(
//                     org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry registry) {
//                 registry.addResourceHandler("/images/**")
//                         .addResourceLocations("file:uploads/", "file:backend/uploads/", "file:./uploads/",
//                                 "file:./backend/uploads/");
//             }
//         };
//     }
// }






package com.homease.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins(
                            "http://localhost:5172",
                            "http://localhost:5173",
                            "http://localhost:5174",
                            // Replace these with your actual Vercel URLs after deploy
                            "https://homease-production-ten.vercel.app",
                            "https://homease-production-qicq.vercel.app",
                            "https://homease-production-ytz4-kappa.vercel.app"
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(false)
                        .maxAge(3600);
            }
        };
    }
}