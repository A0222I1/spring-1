package com.codegym.building.controller;

import com.codegym.building.dto.NewsViewDTO;
import com.codegym.building.model.news.News;
import com.codegym.building.service.impl.NewsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/home")
@CrossOrigin("http://localhost:4200/")
public class NewsControllerApi {
    @Autowired
    NewsServiceImpl newsService;

    @GetMapping("")
    public ResponseEntity<List<NewsViewDTO>> getAllNews() {
        return new ResponseEntity<>(newsService.findAll().stream().map(NewsViewDTO::new).collect(Collectors.toList()), HttpStatus.OK);
    }
}
