package com.codegym.building.service;

import com.codegym.building.dto.ContractDTO;
import com.codegym.building.dto.ContractViewDTO;
import com.codegym.building.model.contract.Contract;

import java.util.List;

public interface ContractService <ENTITY extends Contract,DTO extends ContractDTO, DTOView extends ContractViewDTO>{
    DTO save(DTO dto);
    DTO getById(Integer id);
    List<DTOView> list();
    boolean delete(Integer id);
}
