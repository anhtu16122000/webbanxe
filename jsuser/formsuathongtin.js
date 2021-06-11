function getThongTin(){
    var tk = localStorage.getItem('tkLocal');
    dataSend ={event:'csthongtinget',taikhoan:tk};
    querydata_GET_JSON('php/infoCar.php',dataSend,function(res){
       var taikhoan  =  res.taikhoan;
       var matkhau   =  res.matkhau;
       var diachi    =  res.diachi;
       var email     =  res.email;
       var sdt       =  res.sdt;
       var gioitinh  =  res.gioitinh;
       $(".edt-dktaikhoan").val(taikhoan);
    //    $(".edt-dkmatkhau").val(matkhau);
    //    $(".edt-xacnhanmatkhau").val(matkhau);
       $(".edt-diachi").val(diachi);
       $(".edt-email").val(email);
       $(".edt-sodienthoai").val(sdt);
       $(".edt-gioitinh").val(gioitinh);
       
    });
}
getThongTin();

$(".btn-chinhsua").click(function(){
    var taikhoan   = $(".edt-dktaikhoan").val(); 
    var matkhau    = $(".edt-dkmatkhau").val();
    var matkhaucu  = $(".edt-dkmatkhaucu").val();
    var ktmatkhau  = $(".edt-xacnhanmatkhau").val();
    var diachi     = $(".edt-diachi").val();
    var email      = $(".edt-email").val();
    var sdt        = $(".edt-sodienthoai").val();
    var gioitinh   = $(".edt-gioitinh").val();
     if(taikhoan=="" || matkhau=="" || ktmatkhau=="" || diachi=="" || email=="" || sdt=="" || matkhaucu==""){
         thongbao("Vui lòng nhập đầy đủ thông tin !");
     }else{
         if(isNumber(sdt)){
             if(validEmail(email)){
                 if(matkhau!=ktmatkhau){
                     thongbao("Xác nhận mật khẩu không trùng");  
                 }else{
                    editThongTin(taikhoan,matkhaucu,matkhau,diachi,email,sdt,gioitinh);
                 }            
             }else{
                 thongbao("Vui lòng nhập đúng email");
             }
         }else{
             thongbao("Vui lòng nhập đúng số điện thoại ");
         }
     }
 });
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
function editThongTin(TaiKhoan,MatKhauCu,MatKhau,DiaChi,Email,SoDienThoai,GioiTinh){
    var dataSend = {event:'csthongtinedit',taikhoan:TaiKhoan,matkhaucu:MatKhauCu,matkhau:MatKhau,diachi:DiaChi,email:Email,sdt:SoDienThoai,gioitinh:GioiTinh};
    querydata_GET_JSON('php/infoCar.php',dataSend,function(res){
        console.log(res);
        if(res["csthongtinedit"]==1){
            thongbao("Chỉnh sửa thành công");
        }else if(res["csthongtinedit"]==2){
            thongbao("Sau mật khẩu cũ");
        }else{
            thongbao("Chỉnh sửa thất bại");
        }
    });
}
if(taikhoan=="" || taikhoan==undefined || taikhoan==null){
    location.href='index.html';
}