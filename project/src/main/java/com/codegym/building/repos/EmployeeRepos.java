package com.codegym.building.repos;

import com.codegym.building.model.person.Customer;
import com.codegym.building.model.person.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface EmployeeRepos extends JpaRepository<Employee, String> {
    @Modifying
    @Transactional
    @Query("update Employee e set e.status = 'off' where e.id = :id")
    Integer updateStatusById(@Param("id") String id);

    @Query("select e from Employee e where e.name like concat('%',:name,'%') and e.id_card like concat('%',:id_card,'%') and e.address like concat('%',:address,'%') and e.department.name like concat('%',:department,'%') and e.status = 'on'")
    Page<Employee> findAllByNameAndIdCardAndAddressAndDepartment(String name, String id_card, @Param("address") String address, @Param("department") String department, Pageable pageable);

    @Modifying
    @Transactional
    @Query("update Employee  c set c.status = 'off'")
    Integer updateStatusAll();

    @Modifying
    @Transactional
    @Query(value = "update account_role set role_id = 1 where user_name = :username", nativeQuery = true)
    Employee beGranted(@Param("username") String username);

    @Query("select e from Employee e where e.id_card = :idCard")
    Optional<Employee> findByIdCard(@Param("idCard") String id_card);

    @Query("select e from Employee e where e.phone = :phone")
    Optional<Employee> findByPhone(@Param("phone") String phone);

    @Query("select e from Employee e where e.email = :email")
    Optional<Employee> findByEmail(@Param("email")String email);

//    @Modifying
//    @Transactional
//    @Query(value = "insert into employee(employee_id, address, birthday, email, id_card, name, phone, avatar, salary, account_name, department_id, gender_id, salary_scale_id, status) values " +
//            "(:address,:birthday,:email,:id_card,:name,:phone,:avatar,:salary,:account,:department,:gender,:salaryScale,:status)",
//            nativeQuery = true)
//    Integer saveEmployee(@Param("address") String address,
//                          @Param("birthday") String birthday,
//                          @Param("email") String email,
//                          @Param("id_card") String id_card,
//                          @Param("name") String name,
//                          @Param("phone") String phone,
//                          @Param("avatar") String avatar,
//                          @Param("salary") Double salary,
//                          @Param("account") String account,
//                          @Param("department") String department,
//                          @Param("gender") String gender,
//                          @Param("salaryScale") String salaryScale,
//                          @Param("status") String status
//    );
}
