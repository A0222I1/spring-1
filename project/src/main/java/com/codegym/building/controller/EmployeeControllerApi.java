package com.codegym.building.controller;

import com.codegym.building.dto.EmployeeDTO;
import com.codegym.building.dto.EmployeeViewDTO;
import com.codegym.building.error.NotFoundById;
import com.codegym.building.model.person.Employee;
import com.codegym.building.repos.EmployeeRepos;
import com.codegym.building.service.PersonService;
import com.codegym.building.service.impl.AccountRoleImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/employee")
@CrossOrigin("http://localhost:4200/")
public class EmployeeControllerApi {
    private static final int MAXDISPLAY = 5;

    @Autowired
    PersonService<Employee> employeePersonService;

    @Autowired
    AccountRoleImpl roleRepos;

    @GetMapping("")
    public ResponseEntity<Page<EmployeeViewDTO>> findAllByCondition(@RequestParam(name = "name", defaultValue = "") String name,
                                                                    @RequestParam(name = "id_card", defaultValue = "") String idCard,
                                                                    @RequestParam(name = "address", defaultValue = "") String address,
                                                                    @RequestParam(name = "department", defaultValue = "") String department,
                                                                    @PageableDefault(size = MAXDISPLAY, sort = "name", direction = Sort.Direction.ASC) Pageable pageable) {
        return new ResponseEntity<>(employeePersonService.findAllByNameAndIdCardAndAddressAndDepartment(name, idCard, address, department, pageable).map(EmployeeViewDTO::new), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeViewDTO> findById(@PathVariable String id) throws NotFoundById {
        return new ResponseEntity<>(new EmployeeViewDTO(employeePersonService.findById(id)), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Integer> updateStatusById(@PathVariable String id) {
        return new ResponseEntity<>(employeePersonService.updateStatusById(id), HttpStatus.OK);
    }

    @DeleteMapping("/all")
    public ResponseEntity<Integer> updateStatusAll() {
        return new ResponseEntity<>(employeePersonService.updateStatusAll(), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<EmployeeViewDTO> createEmployee(@Valid @RequestBody EmployeeDTO employeeDTO) {
        EmployeeViewDTO employeeViewDTO = new EmployeeViewDTO(employeePersonService.save(new Employee(employeeDTO)));
        roleRepos.updateDefaultRolesOffAccountRegister(employeeViewDTO.getAccount());
        return new ResponseEntity<>(employeeViewDTO, HttpStatus.OK);
    }

    @PatchMapping("")
    public ResponseEntity<Employee> editEmployee(@Valid @RequestBody EmployeeDTO employeeDTO) {
        return new ResponseEntity<>(employeePersonService.save(new Employee(employeeDTO)), HttpStatus.OK);
    }

    @PatchMapping("/{username}")
    public ResponseEntity<Employee> beGranted(@PathVariable String username) {
        return new ResponseEntity<>(employeePersonService.beGranted((EmployeeRepos) employeePersonService, username), HttpStatus.OK);
    }

    @GetMapping("/existsIdCard")
    public ResponseEntity<Boolean> isExistsIdCard(@RequestParam("id_card") String idCard) {
        return new ResponseEntity<>(employeePersonService.findByIdCard(idCard), HttpStatus.OK);
    }

    @GetMapping("/existsPhone")
    public ResponseEntity<Boolean> isExistsPhone(@RequestParam("phone") String phone) {
        return new ResponseEntity<>(employeePersonService.findByPhone(phone), HttpStatus.OK);
    }

    @GetMapping("/existsEmail")
    public ResponseEntity<Boolean> isExistsEmail(@RequestParam("email") String email) {
        return new ResponseEntity<>(employeePersonService.findByEmail(email), HttpStatus.OK);
    }

    @GetMapping("/accountName/{name}")
    public ResponseEntity<EmployeeViewDTO> getEmployeeFromAccountName(@PathVariable String name) {
        return new ResponseEntity<>(new EmployeeViewDTO(employeePersonService.findByUserName(name)), HttpStatus.OK);
    }
}

