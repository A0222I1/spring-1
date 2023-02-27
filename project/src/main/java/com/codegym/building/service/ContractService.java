package com.codegym.building.service;

import com.codegym.building.dto.ContractDTO;
import com.codegym.building.dto.ContractViewDTO;
import com.codegym.building.model.contract.Contract;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ContractService <E extends Contract,D extends ContractDTO, V extends ContractViewDTO>{
    D save(D dto);
    D getById(Integer id);
    Page<E> list(Pageable pageable);
    Page<E> findAll(String customerName,String employeeName, String planeId, String dateStart, Pageable pageable);
    boolean delete(Integer id);
    List<V> listDtoView();
    boolean updateStatusById(Integer id);
}
