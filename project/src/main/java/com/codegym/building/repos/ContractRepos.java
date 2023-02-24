package com.codegym.building.repos;

import com.codegym.building.model.contract.Contract;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import javax.transaction.Transactional;



public interface ContractRepos extends JpaRepository<Contract, Integer> {
    @Query(value = "select * from contract where customer_id in (select customer_id from customer where name like concat('%',:customerName,'%')) and employee_id in (select employee_id from employee where name like concat('%',:employeeName,'%')) and plane_id like concat('%',:planeId,'%') and start_date like concat('%',:startDate,'%')  and status = 'on'"
            ,nativeQuery = true)
 Page<Contract> getAllCustom(@Param("customerName") String customerName, @Param("employeeName") String employeeName, @Param("planeId") String planeId, @Param("startDate") String startDate, Pageable pageable);
  
  @Modifying
    @Transactional
    @Query(value = "update contract c set c.status = 'off' where c.id = :id",nativeQuery = true)
    int updateStatusById(Integer id);

   
   @Query(value = "select * from contract where start_date between :start_date and :endDate", nativeQuery = true)
    List<Contract> findAllByDayStart(@Param("start_date") String start_date, @Param("endDate") String end_date);

    @Query(value = "select * from contract where contract.start_date between :start_date and :endDate order by contract.total DESC limit :rowNumber", nativeQuery = true)
    List<Contract> findAllByHigh(@Param("start_date") String start_date, @Param("endDate") String end_date, @Param("rowNumber") Integer rowNumber);

    @Query(value = "select * from contract where contract.start_date between :start_date and :endDate order by contract.total ASC limit :rowNumber", nativeQuery = true)
    List<Contract> findAllByLow(@Param("start_date") String start_date, @Param("endDate") String end_date, @Param("rowNumber") Integer rowNumber);


}
