package com.codegym.building.service;

import com.codegym.building.model.person.Employee;
import com.codegym.building.model.person.Person;
import com.codegym.building.repos.EmployeeRepos;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PersonService<E extends Person> {
    Page<E> findAllByNameAndIdCardAndAddressAndDepartment(String name, String id_card, String address, String department, Pageable pageable);

    E save(E e);

    E findById(String id);

    Integer updateStatusById(String id);

    Integer updateStatusAll();

    default Employee beGranted(EmployeeRepos employeeRepos, String username){
        return employeeRepos.beGranted(username);
    }

    Boolean findByIdCard(String id_card);

    Boolean findByPhone(String phone);

    Boolean findByEmail(String email);
}
