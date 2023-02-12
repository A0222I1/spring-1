package com.codegym.building.repos;

import com.codegym.building.model.plane.Plane;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

import org.springframework.data.repository.query.Param;

public interface PlaneRepos extends JpaRepository<Plane, Integer> {
    @Query(value = "select * from plane where area like concat('%',:area,'%') and  stage_id like concat('%',:stage,'%') and plane_status_id like concat('%',:status,'%') and plane_type_id like concat('%',:type,'%')", nativeQuery = true)
    Page<Plane> findAllByCondition(@Param("area") String area, @Param("stage") String stage_name, @Param("status") String status,
                                   @Param("type") String type, Pageable pageable);

    @Query(value = "select p from Plane  p where p.planeStatus = '2'")
    List<Plane> getALlAvailablePlane();

    @Query(value = "select  p from  Plane  p where  p.planeStatus = '3'")
    List<Plane> getAllRentedPlane();

    @Query(value = "select sum(p.area) as total_area from Plane p")
    Integer totalArea();
}
