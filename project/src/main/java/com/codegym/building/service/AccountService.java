package com.codegym.building.service;

import com.codegym.building.dto.AccountDTO;
import com.codegym.building.model.account.Account;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface AccountService {

    @Query(value = "SELECT employee_id FROM employee where account_name = :account", nativeQuery = true)
    String findIdEmployeeByAccount(@Param("account") String username);

    boolean findByUserName(String name);

    Account save(AccountDTO accountDTO);

    List<Account> findAll();
}
