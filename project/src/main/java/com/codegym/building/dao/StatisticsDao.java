package com.codegym.building.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Repository
public class StatisticsDao {
    @Autowired
    private EntityManager entity;

    public List<Object[]> getData(String startDateString, String finishDateString, String checkHighLow, Integer rows, Integer page,  Integer pageSize ){
        try {
            List<Object[]> listResult = new ArrayList<>();

            StringBuilder sql = new StringBuilder();
            sql.append(" select total, pl.id as planid ,information from contract contract ");
            sql.append(" inner join plane pl on pl.id = contract.plane_id ");
            sql.append(" where 1=1 ");

            if (null != startDateString && null != finishDateString && !startDateString.isEmpty() && !finishDateString.isEmpty()) {
                sql.append(" and start_date >= " + startDateString);
                sql.append(" and start_date < " + finishDateString);
            }

            if (null != checkHighLow && !"null".equals(checkHighLow) && null != rows) {
                page = 1;
                pageSize = rows;
                /*
                * true high
                * false low
                * */
                if (checkHighLow.equals("true")){
                    sql.append(" order by total desc");

                } else{
                    sql.append(" order by total asc");
                }
            }
            Query query = entity.createNativeQuery(sql.toString());

            query.setFirstResult((page-1) * pageSize);
            query.setMaxResults(pageSize);

            listResult = query.getResultList();
            return listResult;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public BigInteger countDatas(String startDateString, String finishDateString){
        try {

            StringBuilder sql = new StringBuilder();
            sql.append(" select count(*) from contract ");
            sql.append(" inner join plane pl on pl.id = contract.plane_id ");
            sql.append(" where 1=1 ");

            if (null != startDateString && null != finishDateString && !startDateString.isEmpty() && !finishDateString.isEmpty()) {
                sql.append(" and start_date >= " + startDateString);
                sql.append(" and start_date < " + finishDateString);
            }
            Query query = entity.createNativeQuery(sql.toString());

            BigInteger count = (BigInteger) query.getSingleResult();

            return count;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
