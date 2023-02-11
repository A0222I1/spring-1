package com.codegym.building.controller;

import com.codegym.building.dto.PlanDTO;
import com.codegym.building.model.plane.Plane;
import com.codegym.building.service.PlaneServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/plane")
@CrossOrigin("http://localhost:4200/")
public class PlaneControllerApi {
    private static final int MAX_DISPLAY = 5;
    @Autowired
    private PlaneServices planeServices;
    @GetMapping("")
    public ResponseEntity<Page<Plane>> findAllPlane( @PageableDefault(size = MAX_DISPLAY, sort = "id", direction = Sort.Direction.ASC) Pageable pageable){
        return new ResponseEntity<>(planeServices.findAll(pageable),HttpStatus.OK);
    }
    @GetMapping("/dto")
    public ResponseEntity<List<PlanDTO>> getAllWithContractDto() {
        return new ResponseEntity<>(planeServices.getAllPlane(),HttpStatus.OK);
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
