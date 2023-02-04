package com.codegym.building.controller;

import com.codegym.building.dto.EmployeeDTO;
import com.codegym.building.dto.EmployeeViewDTO;
import com.codegym.building.model.person.Employee;
import com.codegym.building.repos.EmployeeRepos;
import com.codegym.building.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/employee")
@CrossOrigin("http://localhost:4200/")
public class EmployeeControllerApi {
    private final int MAX_DISPLAY = 5;

    @Autowired
    PersonService<Employee> employeePersonService;

    @GetMapping("")
    public ResponseEntity<Page<EmployeeViewDTO>> findAllByCondition(@RequestParam(name = "name", defaultValue = "") String name,
                                                             @RequestParam(name = "id_card", defaultValue = "") String id_card,
                                                             @RequestParam(name = "address", defaultValue = "") String address,
                                                             @RequestParam(name = "department", defaultValue = "") String department,
                                                             @PageableDefault(size = MAX_DISPLAY, sort = "name", direction = Sort.Direction.ASC) Pageable pageable) {
        return new ResponseEntity<>(employeePersonService.findAllByNameAndIdCardAndAddressAndDepartment(name, id_card, address, department, pageable).map(EmployeeViewDTO::new), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    private ResponseEntity<Employee> findById(@PathVariable String id) {
        return new ResponseEntity<>(employeePersonService.findById(id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<Integer> updateStatusById(@PathVariable String id) {
        return new ResponseEntity<>(employeePersonService.updateStatusById(id), HttpStatus.OK);
    }

    @DeleteMapping("")
    private ResponseEntity<Integer> updateStatusAll() {
        return new ResponseEntity<>(employeePersonService.updateStatusAll(), HttpStatus.OK);
    }

    @PostMapping("")
    private ResponseEntity<Employee> createEmployee(@RequestBody EmployeeDTO employeeDTO) {
        return new ResponseEntity<>(employeePersonService.save(new Employee(employeeDTO)), HttpStatus.OK);
    }

    @PatchMapping("")
    private ResponseEntity<Employee> editEmployee(@RequestBody Employee employee) {
        return new ResponseEntity<>(employeePersonService.save(employee), HttpStatus.OK);
    }

    @PatchMapping("/{username}")
    private ResponseEntity<Employee> beGranted(@PathVariable String username) {
        return new ResponseEntity<>(employeePersonService.beGranted((EmployeeRepos) employeePersonService, username), HttpStatus.OK);
    }

    @GetMapping("/existsIdCard")
    private ResponseEntity<Boolean> isExistsIdCard(@RequestParam("id_card") String id_card) {
        return new ResponseEntity<>(employeePersonService.findByIdCard(id_card), HttpStatus.OK);
    }

    @GetMapping("/existsPhone")
    private ResponseEntity<Boolean> isExistsPhone(@RequestParam("phone") String phone) {
        return new ResponseEntity<>(employeePersonService.findByPhone(phone), HttpStatus.OK);
    }
    @GetMapping("/existsEmail")
    private ResponseEntity<Boolean> isExistsEmail(@RequestParam("email") String email) {
        return new ResponseEntity<>(employeePersonService.findByEmail(email), HttpStatus.OK);
    }
}
