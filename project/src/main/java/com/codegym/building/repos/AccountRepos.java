package com.codegym.building.repos;

import com.codegym.building.model.account.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepos extends JpaRepository<Account,String> {
}
