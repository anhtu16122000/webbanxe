
function ThemDuLieu(MaXe,TenXe,LoaiXe,GiaXe,AnhXe,Link){
    var dataSend = {event:'themdulieu',maxe:MaXe,tenxe:TenXe,loaixe:LoaiXe,giaxe:GiaXe,anhxe:AnhXe,link:Link};
    querydata_GET_JSON('php/infoCar.php',dataSend,function(res){
        if(res['themdulieu']==1){
            thongbao("Thêm dữ liệu thành công");
            taidanhsachxe(xe_current,recordXe,"vf-");
        }else{
            thongbao("thêm dữ liệu thất bại");
        }
    });
}
function XoaDuLieu(MaXe){
    dataSend={event:'xoadulieu',maxe:MaXe};
    querydata_GET_JSON('php/infoCar.php',dataSend,function(res){
        if(res.xoadulieu==1){
            thongbao("Xóa dữ liệu thành công ");
            taidanhsachxe(xe_current,recordXe,"vf-");
        }else{
            thongbao("Xóa dữ liệu thất bại");
        }
    });
}
function UpdateDuLieu(MaXe,TenXe,LoaiXe,GiaXe,AnhXe,ChiTiet){
    var dataSend = {event:'updatedulieu',maxe:MaXe,tenxe:TenXe,loaixe:LoaiXe,giaxe:GiaXe,anhxe:AnhXe,link:ChiTiet};
    querydata_GET_JSON('php/infoCar.php',dataSend,function(res){
        if(res.updatedulieu==1){
            thongbao("Cập nhập thông tin xe thành công");
            taidanhsachxe(xe_current,recordXe,"vf-");
        }else{
            thongbao("Cập nhập thông tin xe thất bại");
        }
    });
}
function isNumber(n){
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}
$(".btn-checkthongtin").click(function(){
    console.log("ok");  
});