package com.codegym.building.service.impl;

import com.codegym.building.dto.ContractDTO;
import com.codegym.building.dto.ContractViewDTO;
import com.codegym.building.model.contract.Contract;
import com.codegym.building.model.plane.Plane;
import com.codegym.building.model.typeClass.PlaneStatus;
import com.codegym.building.repos.ContractRepos;
import com.codegym.building.service.ContractService;
import com.codegym.building.utils.AbstractContractDTOConvert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service


public class ContractServiceImpl implements ContractService<Contract, ContractDTO, ContractViewDTO> {
    @Autowired
    ContractRepos contractRepos;
    @Autowired
    AbstractContractDTOConvert<Contract,ContractDTO> converter;
    @Autowired
    PlaneServicesImpl planeServices;
    @Override
    public ContractDTO save(ContractDTO dto) {
        Plane plane = planeServices.findPlaneById(dto.getPlaneId());
        PlaneStatus planeStatus = new PlaneStatus(3);
        plane.setPlaneStatus(planeStatus);
        planeServices.savePlane(plane);
        Contract contract = contractRepos.save(new Contract(dto));
        return converter.convertDetail(contract);
    }

    @Override
    public ContractDTO getById(Integer id) {

        return converter.convertDetail(findById(id));
    }

    @Override
    public Page<Contract> list(Pageable pageable) {
        return contractRepos.findAll(pageable);
    }

    @Override
    public Page<Contract> findAll(String customerName, String employeeName, String planeId, String dateStart, Pageable pageable) {
        return contractRepos.getAllCustom(customerName,employeeName,planeId,dateStart,pageable);
    }


    @Override
    public boolean delete(Integer id) {
        final Contract contract = findById(id);
        if(contract == null) {
            System.out.println("Failed to delete entity with ID " + id +  "as it does not exist");
            return false;
        }
        try {
            Plane plane = planeServices.findPlaneById(contract.getPlane().getId());
            PlaneStatus planeStatus = new PlaneStatus(2);
            plane.setPlaneStatus(planeStatus);
            planeServices.savePlane(plane);
            contractRepos.delete(contract);
            return true;
        }catch (final Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public List<ContractViewDTO> listDtoView() {
        return contractRepos.findAll().stream().map(ContractViewDTO::new).collect(Collectors.toList());
    }

    private Contract findById(final Integer id) {
        return contractRepos.findById(id).orElse(null);
    }


}
