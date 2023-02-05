package com.codegym.building.utils;

import com.codegym.building.dto.ContractDTO;
import com.codegym.building.model.contract.Contract;
import org.springframework.stereotype.Component;

@Component
public class ContractDTOConverter extends AbstractContractDTOConvert<Contract, ContractDTO> {


    @Override
    public ContractDTO convertDetail(Contract contract) {
        ContractDTO contractDTO = new ContractDTO();
        super.convert(contract,contractDTO);

        //set another field
        contractDTO.setCustomerId(contract.getCustomer().getId());
        contractDTO.setEmployeeId(contract.getEmployee().getId());
        contractDTO.setPlaneId(contract.getPlane().getId());
        contractDTO.setTermId(contract.getTerm().getId());

        return contractDTO;
    }
}
