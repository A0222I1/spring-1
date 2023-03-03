package com.codegym.building.repos;

import com.codegym.building.model.account.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepos extends JpaRepository<Account,String> {
    @Query("select r from Account r where r.username = :username")
    Account findByUsername(String username);
}
