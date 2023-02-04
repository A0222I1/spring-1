package com.codegym.building.service.impl;

import com.codegym.building.error.NotFoundById;
import com.codegym.building.model.person.Employee;
import com.codegym.building.repos.EmployeeRepos;
import com.codegym.building.service.PersonService;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Optional;


@Service
public class EmployeeServiceImpl implements PersonService<Employee> {

    @Autowired
    EmployeeRepos repos;


    @Override
    public Page<Employee> findAllByNameAndIdCardAndAddressAndDepartment(String name, String id_card, String address, String department, Pageable pageable) {
        return repos.findAllByNameAndIdCardAndAddressAndDepartment(name, id_card, address, department, pageable);
    }

    @Override
    public Employee save(Employee employee) {
        return repos.save(employee);
    }

    @SneakyThrows
    @Override
    public Employee findById(String id) {
        Optional<Employee> employee = repos.findById(id);
        if (employee.isPresent()) {
            return employee.get();
        }
        throw new NotFoundById("Không tìm thấy bất kì nhân viên nào có mã số: " + id);
    }

    @Override
    public Integer updateStatusById(String id) {
        return repos.updateStatusById(id);
    }

    @Override
    public Integer updateStatusAll() {
        return repos.updateStatusAll();
    }

    @Override
    public Boolean findByIdCard(String id_card) {
        return repos.findByIdCard(id_card).isPresent();
    }

    @Override
    public Boolean findByPhone(String phone) {
        return repos.findByPhone(phone).isPresent();
    }

    @Override
    public Boolean findByEmail(String email) {
        return repos.findByEmail(email).isPresent();
    }
}
