$(".btn-dangky").click(function(){
   var taikhoan   = $(".edt-dktaikhoan").val(); 
   var matkhau    = $(".edt-dkmatkhau").val(); 
   var ktmatkhau  = $(".edt-xacnhanmatkhau").val();
   var diachi     = $(".edt-diachi").val();
   var email      = $(".edt-email").val();
   var sdt        = $(".edt-sodienthoai").val();
   var gioitinh   = $(".edt-gioitinh").val();
    if(taikhoan=="" || matkhau=="" || ktmatkhau=="" || diachi=="" || email=="" || sdt==""){
        thongbao("Vui lòng nhập đầy đủ thông tin !");
    }else{
        if(isNumber(sdt)){
            if(validEmail(email)){
                if(matkhau!=ktmatkhau){
                    thongbao("Xác nhận mật khẩu không trùng");  
                }else{
                    dangkytaikhoan(taikhoan,matkhau,diachi,email,sdt,gioitinh);
                }            
            }else{
                thongbao("Vui lòng nhập đúng email");
            }
        }else{
            thongbao("Vui lòng nhập đúng số điện thoại ");
        }
    }
});
function dangkytaikhoan(TaiKhoan,MatKhau,DiaChi,Email,Sdt,GioiTinh){
    dataSend = {event:'dktaikhoan',taikhoan:TaiKhoan,matkhau:MatKhau,diachi:DiaChi,email:Email,sdt:Sdt,gioitinh:GioiTinh};
    querydata_GET_JSON('php/infoCar.php',dataSend,function(res){
        if(res['dktaikhoan']==1){
            thongbao("Đăng ký thành công !");
        }else if(res['dktaikhoan']==2){
            thongbao("Tên tài khoản đã tồn tại !");
        }else{
            thongbao("Đăng ký không thành công");
        }
    });
}
function validEmail(email) {
    var atposition = email.indexOf("@");
    var dotposition = email.lastIndexOf(".");
    if (atposition < 1 || dotposition < (atposition + 2)
            || (dotposition + 2) >= email.length) {
        return false;
    }else{
        return true;
    }
}
if(taikhoan=="" || taikhoan==undefined || taikhoan==null){
}else{
    location.href='index.html';
}