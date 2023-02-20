package com.codegym.building.dto;

import com.codegym.building.utils.validate.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EmployeeDTO {
    @NotBlank(message = "avatar nên nhập không nên để trống!")
    @Length(min = 5, max = 255, message = "độ dài nên lớn hơn 5 kí tự và không quá 255 kí tự!")
    String avatar;

    @Pattern(regexp = "^[A-Za-z ÚÙỤŨỦỊỈÌỈĨÂĂÔĐÊỌÒÓÕỎÁÀẢÃẠÈÉẸẼẺƯỬỮỰỪỨỐỒỔỘỖẾỀỂỄỆẤẦẪẨẬẶẮẲẴẰẠÁÀẢÃúùụũủịỉìỉĩâăôđêọòóõỏáàảãạèéẹẽẻưửữựừứốồổộỗếềểễệấầẫẩậặắẳẵằạáàảã.?!@#$%^&*]+$", message = "tên không được có số!")
    @Size(min = 8, max = 200, message = "độ dài tên từ 8 kí tự đến 200 kí tự!")
    String name;

    @CheckAgeBigger18
    String birthday;

    @Pattern(regexp = "^[1234]$", message = "giới tính không phù hợp!")
    String gender;

    @Pattern(regexp = "^([0-9]{7,})$", message = "lương phải có kiểu số và lớn hơn 1 triệu!")
    String salary;

    @Pattern(regexp = "^([0-9]{12})$", message = "chứng minh nhân dân không đúng định dạng!")
    @ExistsIdCard
    String id_card;

    @NotBlank(message = "địa chỉ nên nhập không nên để trống!")
    @Size(max = 200, message = "địa chỉ không dài quá 200 kí tự!")
    String address;

    @Pattern(regexp = "^([0]|(\\+84))([0-9]{9})$", message = "số điện thoại chưa đúng định dạng!")
    @ExistsPhone
    String phone;

    @Pattern(regexp = "^[\\w\\-.]+@([\\w-]+\\.)+[\\w-]{2,4}$", message = "email chưa đúng định dạng!")
    @ExistsEmail
    String email;

    @Pattern(regexp = "^[1234]$", message = "bậc lương không phù hợp!")
    String salaryScale;

    @Pattern(regexp = "^[123]$", message = "bộ phận làm việc không phù hợp!")
    String department;

    @ExistsAccount
    @NotBlank(message = "tài khoản nên nhập không nên để trống!")
    @Size(min = 8, max = 15, message = "tài khoản chỉ nên từ 8 đến 15 kí tự!")
    String account;

    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,15}$", message = "mật khẩu phải có 1 chữ hoa,1 chữ thường 1 kí tự đặt biệt, 1 số và từ 8 đến 15 kí tự!")
    String password;
}
