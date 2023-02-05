package com.codegym.building.controller;

import com.codegym.building.model.plane.Plane;
import com.codegym.building.model.typeClass.PlaneStatus;
import com.codegym.building.service.PlaneServices;
import com.codegym.building.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/plane")
@CrossOrigin("http://localhost:4200/")
public class PlaneControllerApi {
    @Autowired
    private PlaneServices planeServices;
    @GetMapping("")
    public ResponseEntity<List<Plane>> findAllPlane(){
        return new ResponseEntity<>(planeServices.findAll(), HttpStatus.OK);
    }
}
