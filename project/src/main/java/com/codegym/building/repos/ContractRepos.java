package com.codegym.building.repos;

import com.codegym.building.model.contract.Contract;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ContractRepos extends JpaRepository<Contract,Integer> {
    @Query(value = "select * from contract where customer_id in (select customer_id from customer where name like concat('%',:customerName,'%')) and employee_id in (select employee_id from employee where name like concat('%',:employeeName,'%')) and plane_id like concat('%',:planeId,'%') and start_date like concat('%',:startDate,'%')"
            ,nativeQuery = true)
    Page<Contract> getAllCustom(@Param("customerName") String customerName, @Param("employeeName") String employeeName, @Param("planeId") String planeId, @Param("startDate") String startDate, Pageable pageable);
}
