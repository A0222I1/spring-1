package com.codegym.building.repos;

import com.codegym.building.model.contract.Contract;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContractRepos extends JpaRepository<Contract,Integer> {
}
