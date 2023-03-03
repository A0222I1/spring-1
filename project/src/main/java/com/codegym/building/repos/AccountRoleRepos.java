package com.codegym.building.repos;

import com.codegym.building.model.account.AccountRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface AccountRoleRepos extends JpaRepository<AccountRole, Long> {
    @Modifying
    @Transactional
    @Query(value = "insert into account_role (`username`,`role_id`) values (:name, 3) ", nativeQuery = true)
    void updateRolesByUserName(@Param("name") String username);

    @Query("select r from AccountRole r where r.account.username = :name")
    List<AccountRole> findAllByAccountName(@Param("name") String username);
}
