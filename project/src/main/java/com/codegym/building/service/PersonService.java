package com.codegym.building.service;
import com.codegym.building.error.NotFoundById;
import com.codegym.building.dto.CustomerViewDTO;
import com.codegym.building.model.person.Employee;
import com.codegym.building.model.person.Person;
import com.codegym.building.repos.EmployeeRepos;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PersonService<E extends Person> {
    Page<E> findAllByNameAndIdCardAndAddressAndDepartment(String name, String id_card, String address, String department, Pageable pageable);

    E save(E e);

    E findById(String id) throws NotFoundById;

    Integer updateStatusById(String id);

    Integer updateStatusAll();

    default Employee beGranted(EmployeeRepos employeeRepos, String username){
        return employeeRepos.beGranted(username);
    }

    Boolean findByIdCard(String id_card);

    Boolean findByPhone(String phone);

    Boolean findByEmail(String email);

    List<E> getAll();

    E findByUserName(String username);

    E findIdCardForContract(String id_card);
}
