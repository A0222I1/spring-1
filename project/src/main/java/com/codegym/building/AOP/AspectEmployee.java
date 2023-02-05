package com.codegym.building.AOP;

import com.codegym.building.dto.AccountDTO;
import com.codegym.building.dto.EmployeeDTO;
import com.codegym.building.model.account.AccountRole;
import com.codegym.building.repos.AccountRoleRepos;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
 import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Aspect
@Configuration
public class AspectEmployee {
    @Autowired
    AccountRoleRepos roleRepose;

//    @After("execution(* com.codegym.building.controller.EmployeeControllerApi.createEmployee(..)) && args(employeeDTO,..)")
//    public void setDefaultRolesOfAccountCreate(EmployeeDTO employeeDTO){
//        roleRepose.save(new AccountRole(new AccountDTO(employeeDTO.getAccount(),employeeDTO.getPassword())));
//    }
}
