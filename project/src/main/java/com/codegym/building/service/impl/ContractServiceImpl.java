package com.codegym.building.service.impl;

import com.codegym.building.dto.ContractDTO;
import com.codegym.building.dto.ContractViewDTO;
import com.codegym.building.model.contract.Contract;
import com.codegym.building.model.plane.Plane;
import com.codegym.building.model.typeClass.PlaneStatus;
import com.codegym.building.repos.ContractRepos;
import com.codegym.building.service.ContractService;
import com.codegym.building.utils.AbstractContractDTOConvert;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

import java.util.stream.Collectors;

@Service


public class ContractServiceImpl implements ContractService<Contract, ContractDTO, ContractViewDTO> {
    static final Integer AVAILABLE_PLANE = 2;
    static final Integer RENTED_PLANE = 3;

    private static final Logger LOG = LoggerFactory.getLogger(ContractServiceImpl.class);

    @Autowired
    ContractRepos contractRepos;
    @Autowired
    AbstractContractDTOConvert<Contract, ContractDTO> converter;
    @Autowired
    PlaneServicesImpl planeServices;

    @Override
    public ContractDTO save(ContractDTO dto) {
        Contract contract = null;
        Plane plane = planeServices.findPlaneById(dto.getPlaneId());
        if(dto.getId() != null) {
            Contract contractOld = findById(dto.getId());
            if(contractOld == null) {
                LOG.error("No contract older contain in database");
            } else  {
                Plane planOLd = planeServices.findPlaneById(contractOld.getPlane().getId());
                if(!planOLd.getId().equals(plane.getId()) ) {
                    planOLd.setPlaneStatus(new PlaneStatus(AVAILABLE_PLANE));
                    planeServices.savePlane(planOLd);
                }

            }

        }
        plane.setPlaneStatus(new PlaneStatus(RENTED_PLANE));
        planeServices.savePlane(plane);
        contract = contractRepos.save(new Contract(dto));


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
        return contractRepos.getAllCustom(customerName, employeeName, planeId, dateStart, pageable);
    }


    @Override
    public boolean delete(Integer id) {
        final Contract contract = findById(id);
        if (contract == null) {
            LOG.error("Failed to delete entity with ID as {} it does not exist",id);
            return false;
        }
        try {
            Plane plane = planeServices.findPlaneById(contract.getPlane().getId());
            PlaneStatus planeStatus = new PlaneStatus(AVAILABLE_PLANE);
            plane.setPlaneStatus(planeStatus);
            planeServices.savePlane(plane);
            contractRepos.delete(contract);
            return true;
        } catch (final Exception e) {
            LOG.error(e.getMessage());
            return false;
        }
    }

    @Override
    public List<ContractViewDTO> listDtoView() {
        return contractRepos.findAll().stream().map(ContractViewDTO::new).collect(Collectors.toList());
    }

    @Override
    public Boolean updateStatusById(Integer id) {
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
            contractRepos.updateStatusById(id);
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
