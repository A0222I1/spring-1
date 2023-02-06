package com.codegym.building.utils;

import com.codegym.building.dto.ContractDTO;
import com.codegym.building.model.contract.Contract;
import org.springframework.beans.BeanUtils;
import org.springframework.util.CollectionUtils;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public abstract class AbstractContractDTOConvert<ENTITY extends Contract,DTO extends ContractDTO> {
    public abstract DTO convertDetail(final ENTITY entity);

    public void convert(final ENTITY entity, final DTO dto) {
        // convert same fields
        BeanUtils.copyProperties(entity,dto);
    }
    public List<DTO> convertList(final List<ENTITY> contractList) {
        if(CollectionUtils.isEmpty(contractList)) {
            return Collections.emptyList();
        }
        return contractList.stream().map(this::convertDetail).collect(Collectors.toList());
    }
}
