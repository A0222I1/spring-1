package com.codegym.building.controller;

import com.codegym.building.model.typeClass.Term;
import com.codegym.building.service.impl.typeServiceImpl.TermServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/term")
@CrossOrigin("http://localhost:4200/")
public class TermControlApi {
    @Autowired
    TermServiceImpl termService;

    @GetMapping("")
    public ResponseEntity<List<Term>> getAll() {
        return new ResponseEntity<List<Term>>(termService.findAll(), HttpStatus.OK);
    }

}
