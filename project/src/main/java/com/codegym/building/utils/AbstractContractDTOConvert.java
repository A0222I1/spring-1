package com.codegym.building.utils;

import com.codegym.building.dto.ContractDTO;
import com.codegym.building.model.contract.Contract;
import org.springframework.beans.BeanUtils;
import org.springframework.util.CollectionUtils;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public abstract class AbstractContractDTOConvert<E extends Contract,D extends ContractDTO> {
    public abstract D convertDetail(final E entity);

    public void convert(final E entity, final D dto) {
        // convert same fields
        BeanUtils.copyProperties(entity,dto);
    }
    public List<D> convertList(final List<E> contractList) {
        if(CollectionUtils.isEmpty(contractList)) {
            return Collections.emptyList();
        }
        return contractList.stream().map(this::convertDetail).collect(Collectors.toList());
    }
}
