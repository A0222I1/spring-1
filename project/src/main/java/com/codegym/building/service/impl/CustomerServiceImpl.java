package com.codegym.building.service.impl;

import com.codegym.building.dto.CustomerViewDTO;
import com.codegym.building.error.NotFoundById;
import com.codegym.building.model.person.Customer;
import com.codegym.building.repos.CustomerRepos;
import com.codegym.building.service.PersonService;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class CustomerServiceImpl implements PersonService<Customer> {

    @Autowired
    CustomerRepos repos;


    @Override
    public Page<Customer> findAllByNameAndIdCardAndAddressAndDepartment(String name, String id_card, String address, String company, Pageable pageable) {
        return repos.findAllByNameAndIdCardAndAddressAndDepartment(name, id_card,address,company, pageable);
    }
//luu
    @Override
    public Customer save(Customer customer) {
        return repos.save(customer);
    }

    //chong tan cong tu postman, khi khong tim thay id se lôi
    @SneakyThrows
    @Override
    public Customer findById(String id) throws NotFoundById {
        Optional<Customer> customer = repos.findById(id);
        if (customer.isPresent()) {
            return customer.get();
        }
        throw new NotFoundById("Không tìm thấy bất kì khách hàng nào có mã số: " + id);
    }
//xoa
    @Override
    public Integer updateStatusById(String id) {
        return repos.updateStatusById(id);
    }

    //cac chuc nang lien quan trong talk
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

    @Override
    public List<Customer> getAll() {
        return repos.findAll();
    }

    @Override
    public Customer findByUserName(String username) {
        return null;
    }

    @Override
    public Customer findIdCardForContract(String id_card) {
        return repos.findByIdCard(id_card).get();
    }


}
