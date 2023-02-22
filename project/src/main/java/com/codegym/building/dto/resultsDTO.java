package com.codegym.building.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class resultsDTO {

    private int page;
    private int pageSize;
    private int pageTotal;
    private List<Object[]> listData;
}
