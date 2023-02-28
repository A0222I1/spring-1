package com.codegym.building.dao;

import com.codegym.building.dto.ResultsDTO;
import com.codegym.building.model.plane.Plane;
import com.codegym.building.repos.PlaneRepos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

@Repository
public class StaticDao {

    @Autowired
    private EntityManager em;

    @Autowired
    private PlaneRepos res;

    public List<ResultsDTO> getDataResult(String startDay, String finalDay, Boolean isAsc, Integer rowNumber) {
        try {
            StringBuilder sql = new StringBuilder();
            sql.append(" SELECT ");
            sql.append(" contract.plane_id as planId, ");
            sql.append(" MAX(contract.start_date) as startDate, ");
            sql.append(" T.total as total, ");
            sql.append(" MAX(contract.information) as information ");
            sql.append(" FROM contract ");
            sql.append(" INNER JOIN ( ");
            sql.append(" SELECT ct.plane_id, SUM( ");
            sql.append(" CASE ");
            sql.append("     WHEN ct.term_id = 1 THEN ct.price * 3 ");
            sql.append("     WHEN ct.term_id = 2 THEN ct.price * 6 ");
            sql.append("     WHEN ct.term_id = 3 THEN ct.price * 9 ");
            sql.append("     WHEN ct.term_id = 4 THEN ct.price * 12 ");
            sql.append("     ELSE 0 ");
            sql.append(" END) AS total ");
            sql.append(" FROM contract ct ");
            sql.append(" WHERE 1=1 ");
            if (null != startDay && startDay.length() > 0) {
                sql.append(" AND ct.start_date >= '" + startDay + "' ");
            }
            if (null != finalDay && finalDay.length() > 0) {
                sql.append(" AND ct.start_date <= '" + finalDay + "' ");
            }
            sql.append(" GROUP BY ct.plane_id ");
            sql.append(" ) AS t ON T.plane_id = contract.plane_id ");
            sql.append("GROUP BY contract.plane_id");
            if (null != isAsc) {
                if (isAsc) {
                    sql.append(" ORDER BY T.total ASC ");
                } else {
                    sql.append(" ORDER BY T.total DESC ");
                }
            }
            if (null != rowNumber && rowNumber > 0) {
                sql.append(" LIMIT " + rowNumber);
            }

            Query query = em.createNativeQuery(sql.toString(), "dataStaticResult");

            System.out.println(sql.toString());
            List<ResultsDTO> listBefore = query.getResultList();
            List<ResultsDTO> listAfter = new ArrayList<ResultsDTO>();

            if (null != listBefore && listBefore.size() > 0) {
                for (ResultsDTO dataBefore : listBefore) {
                    Plane plan = res.findById(dataBefore.getPlanId()).orElse(null);
                    ResultsDTO dataAfter = new ResultsDTO(dataBefore.getTotal(), dataBefore.getInformation(), dataBefore.getStartDate(), plan);
                    listAfter.add(dataAfter);
                }
            }
            return listAfter;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
