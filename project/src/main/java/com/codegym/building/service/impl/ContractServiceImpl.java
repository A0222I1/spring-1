package com.codegym.building.service.impl;

import com.codegym.building.dto.ContractDTO;
import com.codegym.building.dto.ContractViewDTO;
import com.codegym.building.model.contract.Contract;
import com.codegym.building.repos.ContractRepos;
import com.codegym.building.service.ContractService;
import com.codegym.building.utils.AbstractContractDTOConvert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class ContractServiceImpl implements ContractService<Contract, ContractDTO, ContractViewDTO> {
    @Autowired
    ContractRepos contractRepos;
    @Autowired
    AbstractContractDTOConvert<Contract,ContractDTO> converter;
    @Override
    public ContractDTO save(ContractDTO dto) {
        Contract contract = contractRepos.save(new Contract(dto));
        return converter.convertDetail(contract);
    }

    @Override
    public ContractDTO getById(Integer id) {
        return converter.convertDetail(findById(id));
    }

    @Override
    public List<ContractViewDTO> list() {
        return contractRepos.findAll().stream().map(ContractViewDTO::new).collect(Collectors.toList());
    }

    @Override
    public boolean delete(Integer id) {
        final Contract contract =findById(id);
        if(contract == null) {
            System.out.println("Failed to delete entity with ID" + id +  "as it does not exist");
            return false;
        }
        try {
            contractRepos.delete(contract);
            return true;
        }catch (final Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    private Contract findById(final Integer id) {
        return contractRepos.findById(id).orElse(null);
    }


}
