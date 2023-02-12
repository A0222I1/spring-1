package com.codegym.building.repos;

import com.codegym.building.model.plane.Plane;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

public interface PlaneRepos extends JpaRepository<Plane,Integer> {
     @Query(value = "select * from plane where area like concat('%',:area,'%') and  stage_id like concat('%',:stage,'%') and plane_status_id like concat('%',:status,'%') and plane_type_id like concat('%',:type,'%')" , nativeQuery = true)
    Page<Plane> findAllByCondition(@Param("area") String area, @Param("stage") String stage_name, @Param("status")String status,
                                   @Param("type")String type, Pageable pageable);
}
