package com.codegym.building.controller;

import com.codegym.building.dto.PlaneDTO;
import com.codegym.building.model.plane.Plane;
import com.codegym.building.service.PlaneServices;
import com.codegym.building.utils.validate.ErrorResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/plane")
@CrossOrigin("http://localhost:4200/")
public class PlaneControllerApi {
    private static final int MAX_DISPLAY = 5;
    @Autowired
    private PlaneServices planeServices;
    @GetMapping("")
    public ResponseEntity<Page<Plane>> findAllPlane(
            @RequestParam(name="area",defaultValue = "") String area,
            @RequestParam(name="stage",defaultValue = "") String stage,
            @RequestParam(name="status",defaultValue = "") String status,
            @RequestParam(name="type",defaultValue = "") String type,
            @PageableDefault(size = MAX_DISPLAY) Pageable pageable){
        return new ResponseEntity<>(planeServices.findAllByCondition(area, stage, status, type, pageable),HttpStatus.OK);
    }
    @GetMapping("/available")
    public ResponseEntity<List<PlaneDTO>> getAllWithContractDto() {
        return new ResponseEntity<>(planeServices.getAllAvailablePlane(),HttpStatus.OK);
    }

    @GetMapping("/rented")
    public ResponseEntity<List<PlaneDTO>> getAllRentedPlane() {
        return new ResponseEntity<>(planeServices.getAllRentedPlane(),HttpStatus.OK);
    }
    @PostMapping("add")
    public ResponseEntity savePlane(@Valid @RequestBody Plane plane, BindingResult bindingResult) {
        try {
            this.planeServices.savePlane(plane);
            return  new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity deletePlane(@PathVariable String id){
        try{
            this.planeServices.deletePlane(this.planeServices.findPlaneById(Integer.parseInt(id)));
            return new ResponseEntity(HttpStatus.OK);
        }catch (Exception e){
            e.getMessage();
            return  new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("totalArea")
    public ResponseEntity<Integer> getTotalArea(){
        return new ResponseEntity<>(this.planeServices.getTotalArea(),HttpStatus.OK);
    }
    
}
