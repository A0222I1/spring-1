package com.codegym.building.service;

import com.codegym.building.dto.ContractDTO;
import com.codegym.building.dto.ContractViewDTO;
import com.codegym.building.model.contract.Contract;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;

public interface ContractService <ENTITY extends Contract,DTO extends ContractDTO, DTOView extends ContractViewDTO>{
    DTO save(DTO dto);
    DTO getById(Integer id);
    Page<ENTITY> list(Pageable pageable);
    Page<ENTITY> findAll(String customerName,String employeeName, String planeId, String dateStart, Pageable pageable);
    boolean delete(Integer id);
    List<DTOView> listDtoView();
}
