package com.codegym.building.service.impl;

import com.codegym.building.error.NotFoundById;
import com.codegym.building.model.person.Customer;
import com.codegym.building.repos.CustomerRepos;
import com.codegym.building.service.PersonService;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class CustomerServiceImpl implements PersonService<Customer> {

    @Autowired
    CustomerRepos repos;


    @Override
    public Page<Customer> findAllByNameAndIdCardAndAddressAndDepartment(String name, String id_card, String address, String department, Pageable pageable) {
        return repos.findAllByNameAndIdCardAndAddressAndDepartment(name, id_card, pageable);
    }

    @Override
    public Customer save(Customer customer) {
        return repos.save(customer);
    }

    @SneakyThrows
    @Override
    public Customer findById(String id) {
        Optional<Customer> customer = repos.findById(id);
        if (customer.isPresent()) {
            return customer.get();
        }
        throw new NotFoundById("Không tìm thấy bất kì khách hàng nào có mã số: " + id);
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
