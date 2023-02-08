package com.codegym.building.repos;

import com.codegym.building.model.account.AccountRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRoleRepos extends JpaRepository<AccountRole, Long> {

    @Query("select r from AccountRole r where r.account.user_name = :name")
    List<AccountRole> findAllByAccountName(@Param("name") String username);
}
