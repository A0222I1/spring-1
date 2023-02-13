package com.codegym.building.AOP;

import com.codegym.building.dto.AccountDTO;
import com.codegym.building.dto.EmployeeDTO;
import com.codegym.building.model.account.AccountRole;
import com.codegym.building.repos.AccountRoleRepos;
import com.codegym.building.service.ContractService;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Aspect
@Configuration
public class AspectEmployee {
    @Autowired
    ContractService service;

//    @Before("execution(* com.codegym.building.controller.PlaneControllerApi.deletePlane(..)) && args(id,..)")
//    public void setDefaultRolesOfAccountCreate(String id){

    }
