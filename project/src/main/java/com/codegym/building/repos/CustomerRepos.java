package com.codegym.building.repos;

import com.codegym.building.model.person.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepos extends JpaRepository<Customer, String> {
    @Query("update Customer c set c.status = 'off' where c.id = :id")
    Integer updateStatusById(@Param("id") String id);

    @Query("select c from Customer c where c.name like concat('%',:name,'%') and c.id_card like concat('%',:id_card,'%') and c.status = 'on'")
    Page<Customer> findAllByNameAndIdCardAndAddressAndDepartment(@Param("name") String name, @Param("id_card") String id_card, Pageable pageable);

    @Query("update Customer  c set c.status = 'off'")
    Integer updateStatusAll();

    @Query("select c from Customer c where c.id_card = :idCard")
    Optional<Customer> findByIdCard(@Param("idCard") String id_card);

    @Query("select c from Customer c where c.phone = :phone")
    Optional<Customer> findByPhone(@Param("phone")String phone);

    @Query("select c from Customer c where c.email = :email")
    Optional<Customer> findByEmail(@Param("email")String email);
}
