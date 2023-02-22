package com.codegym.building.service.impl;

import com.codegym.building.model.contract.Contract;
import com.codegym.building.repos.ContractRepos;
import com.codegym.building.service.StatisticsService;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;

@Service
public class StatisticsImpl implements StatisticsService {

    @Autowired
    public ContractRepos repos;

    @Override
    public List<Contract> findAllByDayStart(String start_date, String end_date) {
        return repos.findAllByDayStart(start_date, end_date);
    }

    @Override
    public List<Contract> findAllByHigh(String start_date, String end_date, Integer rowNumber) {
        return repos.findAllByHigh(start_date, end_date, rowNumber);
    }

    @Override
    public List<Contract> findAllByLow(String start_date, String end_date, Integer rowNumber) {
        return repos.findAllByLow(start_date, end_date, rowNumber);
    }

    @Override
    public XSSFWorkbook XuatBaoCaoTongHop(String start_date, String end_date) throws IOException {
        try {
            List<Contract> listData = repos.findAllByDayStart(start_date, end_date);
            // Load file excel template to a Workbook
            BufferedInputStream inputFile = new BufferedInputStream(
                    new ClassPathResource("temp/MauXuatBaoCao.xlsx").getInputStream());
            XSSFWorkbook wb = new XSSFWorkbook(inputFile);
            XSSFFont defaultFont = wb.createFont();
            defaultFont.setFontName("Times New Roman");
            defaultFont.setBold(false);

            XSSFFont boldFont = wb.createFont();
            boldFont.setFontName("Times New Roman");
            boldFont.setBold(true);

            XSSFFont titleFont = wb.createFont();
            titleFont.setFontName("Times New Roman");
            titleFont.setBold(false);
            titleFont.setFontHeight(22);

            DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");

            XSSFCellStyle styleNormal = wb.createCellStyle();
            this.setStyleForCellNormal(styleNormal, defaultFont);

            XSSFCellStyle styleBold = wb.createCellStyle();
            this.setStyleForCellNormal(styleBold, boldFont);

            XSSFDataFormat cf = wb.createDataFormat();
            XSSFCellStyle styleSalary = wb.createCellStyle();
            this.setStyleForCellNormal(styleSalary, defaultFont);
            styleSalary.setDataFormat(cf.getFormat("#,##0 VNĐ"));


            XSSFCellStyle styleTitle = wb.createCellStyle();
            this.setStyleTitle(styleTitle, titleFont);
            Double totalMoney = null;

            XSSFRow row = null;
            inputFile.close();
            XSSFSheet sheet = wb.getSheet("Báo cáo tổng hợp thu nhập");
            // Update header & title to workbook
            XSSFCell cell2_3 = sheet.getRow(1).getCell(0);
            cell2_3.setCellValue("BÁO CÁO TỔNG HỢP THU NHẬP");
            cell2_3.setCellStyle(styleTitle);

            int startRow;
            XSSFRow startRowHeader = sheet.getRow(5);

            int Ordinalnumber = 0;

            for (startRow = 5; startRow < sheet.getLastRowNum(); startRow++) {
                for (Contract baoCao : listData) {
                    startRow++;
                    sheet.shiftRows(startRow, sheet.getLastRowNum(), 1);
                    row = sheet.createRow(startRow);
                    row = sheet.getRow(startRow);

                    for (int column = 0; column < startRowHeader.getLastCellNum(); column++) {
                        row.createCell(column).setCellStyle(startRowHeader.getCell(column).getCellStyle());
                    }

                    Ordinalnumber++;
                    String matBang = null != baoCao.getPlane() ? baoCao.getPlane().getId().toString() : "";
                    String ngayBatDau = null != baoCao.getStartDate() ? dateFormat.format(baoCao.getStartDate()) : "";
                    Double soTien = null != baoCao.getTotal() ? baoCao.getTotal() : 0;
                    String ghiChu = baoCao.getInformation();
                    totalMoney = null != totalMoney ? totalMoney + soTien : soTien;

                    XSSFCell cellOrdinalnumber = row.getCell(0);
                    cellOrdinalnumber.setCellValue(Ordinalnumber);
                    cellOrdinalnumber.setCellStyle(styleNormal);

                    XSSFCell cellMatBang = row.getCell(1);
                    cellMatBang.setCellValue(matBang);
                    cellMatBang.setCellStyle(styleNormal);

                    XSSFCell cellNgayBatDau = row.getCell(2);
                    cellNgayBatDau.setCellValue(ngayBatDau);
                    cellNgayBatDau.setCellStyle(styleNormal);

                    XSSFCell cellTongThu = row.getCell(3);
                    cellTongThu.setCellValue(soTien);
                    cellTongThu.setCellStyle(styleSalary);

                    XSSFCell cellGhiChu = row.getCell(4);
                    cellGhiChu.setCellValue(ghiChu);
                    cellGhiChu.setCellStyle(styleNormal);

                }
            }
            sheet.shiftRows(startRow, sheet.getLastRowNum(), 1);
            row = sheet.createRow(startRow);
            row = sheet.getRow(startRow);

            for (int column = 0; column < startRowHeader.getLastCellNum(); column++) {
                row.createCell(column);
            }

            XSSFCell celldes = row.getCell(0);
            celldes.setCellValue("Tổng Tiền:");
            celldes.setCellStyle(styleBold);

            XSSFCell cellTotal = row.getCell(1);
            cellTotal.setCellValue(totalMoney);
            cellTotal.setCellStyle(styleSalary);
            return wb;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public XSSFWorkbook XuatBaoCaoCao(String start_date, String end_date, Integer rowNumber) throws IOException {
        try {
            List<Contract> listData = repos.findAllByHigh(start_date, end_date, rowNumber);
            // Load file excel template to a Workbook
            BufferedInputStream inputFile = new BufferedInputStream(
                    new ClassPathResource("temp/MauXuatBaoCao.xlsx").getInputStream());
            XSSFWorkbook wb = new XSSFWorkbook(inputFile);
            XSSFFont defaultFont = wb.createFont();
            defaultFont.setFontName("Times New Roman");
            defaultFont.setBold(false);

            XSSFFont boldFont = wb.createFont();
            boldFont.setFontName("Times New Roman");
            boldFont.setBold(true);

            XSSFFont titleFont = wb.createFont();
            titleFont.setFontName("Times New Roman");
            titleFont.setBold(false);
            titleFont.setFontHeight(22);

            DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");

            XSSFCellStyle styleNormal = wb.createCellStyle();
            this.setStyleForCellNormal(styleNormal, defaultFont);

            XSSFCellStyle styleBold = wb.createCellStyle();
            this.setStyleForCellNormal(styleBold, boldFont);

            XSSFDataFormat cf = wb.createDataFormat();
            XSSFCellStyle styleSalary = wb.createCellStyle();
            this.setStyleForCellNormal(styleSalary, defaultFont);
            styleSalary.setDataFormat(cf.getFormat("#,##0 VNĐ"));


            XSSFCellStyle styleTitle = wb.createCellStyle();
            this.setStyleTitle(styleTitle, titleFont);
            Double totalMoney = null;

            XSSFRow row = null;
            inputFile.close();
            XSSFSheet sheet = wb.getSheet("Báo cáo tổng hợp thu nhập");
            // Update header & title to workbook
            XSSFCell cell2_3 = sheet.getRow(1).getCell(0);
            cell2_3.setCellValue("BÁO CÁO TỔNG HỢP THU NHẬP CAO");
            cell2_3.setCellStyle(styleTitle);
            int startRow;
            XSSFRow startRowHeader = sheet.getRow(5);

            int Ordinalnumber = 0;

            for (startRow = 5; startRow < sheet.getLastRowNum(); startRow++) {
                for (Contract baoCao : listData) {
                    startRow++;
                    sheet.shiftRows(startRow, sheet.getLastRowNum(), 1);
                    row = sheet.createRow(startRow);
                    row = sheet.getRow(startRow);

                    for (int column = 0; column < startRowHeader.getLastCellNum(); column++) {
                        row.createCell(column).setCellStyle(startRowHeader.getCell(column).getCellStyle());
                    }

                    Ordinalnumber++;
                    String matBang = null != baoCao.getPlane() ? baoCao.getPlane().getId().toString() : "";
                    String ngayBatDau = null != baoCao.getStartDate() ? dateFormat.format(baoCao.getStartDate()) : "";
                    Double soTien = null != baoCao.getTotal() ? baoCao.getTotal() : 0;
                    String ghiChu = baoCao.getInformation();
                    totalMoney = null != totalMoney ? totalMoney + soTien : soTien;


                    XSSFCell cellOrdinalnumber = row.getCell(0);
                    cellOrdinalnumber.setCellValue(Ordinalnumber);
                    cellOrdinalnumber.setCellStyle(styleNormal);

                    XSSFCell cellMatBang = row.getCell(1);
                    cellMatBang.setCellValue(matBang);
                    cellMatBang.setCellStyle(styleNormal);

                    XSSFCell cellNgayBatDau = row.getCell(2);
                    cellNgayBatDau.setCellValue(ngayBatDau);
                    cellNgayBatDau.setCellStyle(styleNormal);

                    XSSFCell cellTongThu = row.getCell(3);
                    cellTongThu.setCellValue(soTien);
                    cellTongThu.setCellStyle(styleSalary);

                    XSSFCell cellGhiChu = row.getCell(4);
                    cellGhiChu.setCellValue(ghiChu);
                    cellGhiChu.setCellStyle(styleNormal);

                }
            }
            sheet.shiftRows(startRow, sheet.getLastRowNum(), 1);
            row = sheet.createRow(startRow);
            row = sheet.getRow(startRow);

            for (int column = 0; column < startRowHeader.getLastCellNum(); column++) {
                row.createCell(column);
            }

            XSSFCell celldes = row.getCell(0);
            celldes.setCellValue("Tổng Tiền:");
            celldes.setCellStyle(styleBold);

            XSSFCell cellTotal = row.getCell(1);
            cellTotal.setCellValue(totalMoney);
            cellTotal.setCellStyle(styleSalary);
            return wb;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public XSSFWorkbook XuatBaoCaoThap(String start_date, String end_date, Integer rowNumber) throws IOException {
        try {
            List<Contract> listData = repos.findAllByLow(start_date, end_date, rowNumber);
            // Load file excel template to a Workbook
            BufferedInputStream inputFile = new BufferedInputStream(
                    new ClassPathResource("temp/MauXuatBaoCao.xlsx").getInputStream());
            XSSFWorkbook wb = new XSSFWorkbook(inputFile);
            XSSFFont defaultFont = wb.createFont();
            defaultFont.setFontName("Times New Roman");
            defaultFont.setBold(false);

            XSSFFont boldFont = wb.createFont();
            boldFont.setFontName("Times New Roman");
            boldFont.setBold(true);

            XSSFFont titleFont = wb.createFont();
            titleFont.setFontName("Times New Roman");
            titleFont.setBold(false);
            titleFont.setFontHeight(22);

            DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");

            XSSFCellStyle styleNormal = wb.createCellStyle();
            this.setStyleForCellNormal(styleNormal, defaultFont);

            XSSFCellStyle styleBold = wb.createCellStyle();
            this.setStyleForCellNormal(styleBold, boldFont);

            XSSFDataFormat cf = wb.createDataFormat();
            XSSFCellStyle styleSalary = wb.createCellStyle();
            this.setStyleForCellNormal(styleSalary, defaultFont);
            styleSalary.setDataFormat(cf.getFormat("#,##0 VNĐ"));


            XSSFCellStyle styleTitle = wb.createCellStyle();
            this.setStyleTitle(styleTitle, titleFont);
            Double totalMoney = null;

            XSSFRow row = null;
            inputFile.close();
            XSSFSheet sheet = wb.getSheet("Báo cáo tổng hợp thu nhập");
            // Update header & title to workbook
            XSSFCell cell2_3 = sheet.getRow(1).getCell(0);
            cell2_3.setCellValue("BÁO CÁO TỔNG HỢP THU NHẬP THẤP");
            cell2_3.setCellStyle(styleTitle);

            int startRow;
            XSSFRow startRowHeader = sheet.getRow(5);

            int Ordinalnumber = 0;

            for (startRow = 5; startRow < sheet.getLastRowNum(); startRow++) {
                for (Contract baoCao : listData) {
                    startRow++;
                    sheet.shiftRows(startRow, sheet.getLastRowNum(), 1);
                    row = sheet.createRow(startRow);
                    row = sheet.getRow(startRow);

                    for (int column = 0; column < startRowHeader.getLastCellNum(); column++) {
                        row.createCell(column).setCellStyle(startRowHeader.getCell(column).getCellStyle());
                    }

                    Ordinalnumber++;
                    String matBang = null != baoCao.getPlane() ? baoCao.getPlane().getId().toString() : "";
                    String ngayBatDau = null != baoCao.getStartDate() ? dateFormat.format(baoCao.getStartDate()) : "";
                    Double soTien = null != baoCao.getTotal() ? baoCao.getTotal() : 0;
                    String ghiChu = baoCao.getInformation();
                    totalMoney = null != totalMoney ? totalMoney + soTien : soTien;


                    XSSFCell cellOrdinalnumber = row.getCell(0);
                    cellOrdinalnumber.setCellValue(Ordinalnumber);
                    cellOrdinalnumber.setCellStyle(styleNormal);

                    XSSFCell cellMatBang = row.getCell(1);
                    cellMatBang.setCellValue(matBang);
                    cellMatBang.setCellStyle(styleNormal);

                    XSSFCell cellNgayBatDau = row.getCell(2);
                    cellNgayBatDau.setCellValue(ngayBatDau);
                    cellNgayBatDau.setCellStyle(styleNormal);

                    XSSFCell cellTongThu = row.getCell(3);
                    cellTongThu.setCellValue(soTien);
                    cellTongThu.setCellStyle(styleSalary);

                    XSSFCell cellGhiChu = row.getCell(4);
                    cellGhiChu.setCellValue(ghiChu);
                    cellGhiChu.setCellStyle(styleNormal);

                }
            }
            sheet.shiftRows(startRow, sheet.getLastRowNum(), 1);
            row = sheet.createRow(startRow);
            row = sheet.getRow(startRow);

            for (int column = 0; column < startRowHeader.getLastCellNum(); column++) {
                row.createCell(column);
            }

            XSSFCell celldes = row.getCell(0);
            celldes.setCellValue("Tổng Tiền:");
            celldes.setCellStyle(styleBold);

            XSSFCell cellTotal = row.getCell(1);
            cellTotal.setCellValue(totalMoney);
            cellTotal.setCellStyle(styleSalary);
            return wb;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static void setStyleForCellNormal(XSSFCellStyle style, XSSFFont defaultFont) {
        style.setAlignment(HorizontalAlignment.CENTER);
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        style.setFont(defaultFont);
        style.setBorderBottom(BorderStyle.THIN);
        style.setBorderRight(BorderStyle.THIN);
        style.setBorderLeft(BorderStyle.THIN);
        style.setBorderTop(BorderStyle.THIN);
        style.setWrapText(true);
    }

    public static void setStyleTitle(XSSFCellStyle style, XSSFFont defaultFont) {
        style.setAlignment(HorizontalAlignment.CENTER);
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        style.setFont(defaultFont);
        style.setWrapText(true);
    }
}
