package com.codegym.building.controller;

import com.codegym.building.model.plane.Plane;
import com.codegym.building.model.typeClass.PlaneStatus;
import com.codegym.building.service.PlaneServices;
import com.codegym.building.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @DeleteMapping("{id}")
    private ResponseEntity deletePlane(@PathVariable String id){
        try{
            this.planeServices.deletePlane(this.planeServices.findPlaneById(Integer.parseInt(id)));
            return new ResponseEntity(HttpStatus.OK);
        }catch (Exception e){
            e.getMessage();
            return  new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }
}
