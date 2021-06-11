$(".btn-themxe").click(function(){
    var path  = ['.png','.gif','.jpeg','.jpg']; 
    var maxe  = $(".edt-maxe").val();
    var tenxe = $(".edt-tenxe").val();
    var loaixe= $(".edt-loaixe").val();
    var giaxe = $(".edt-giaxe").val();
    var anhxe = $(".edt-anhxe").val();
    var link  = $(".edt-chitiet").val();
    if(maxe=="" ||tenxe=="" || loaixe=="" || giaxe =="" || anhxe=="" || link==""){
        thongbao("Vui lòng nhập hết thông tin");
    }else{
        if(isNumber(giaxe)==false){
            thongbao("Hãy nhập vào đúng số tiền");
        }
        else{
            ThemDuLieu(maxe,tenxe,loaixe,giaxe,anhxe,link);
        }
    }
    
});
$(".btn-xoadulieu").click(function(){
    var maxe = $(".edt-maxe").val();
    var tenxe = $(".edt-tenxe").val();
    if(maxe==""){
        thongbao("Vui lòng điền vào mã xe cần xóa");
    }else{
        bootbox.confirm("Bạn có muốn xóa mã xe "+maxe+" tên: "+tenxe+" không ?",function(result){
            if(result==true){
                XoaDuLieu(maxe);
            }
            else{}
        
        });
    }
});
$(".btn-updatedulieu").click(function(){
    var maxe = $(".edt-maxe").val();
    var tenxe = $(".edt-tenxe").val();
    var loaixe = $(".edt-loaixe").val();
    var giaxe = $(".edt-giaxe").val();
    var anhxe = $(".edt-anhxe").val();
    var link  = $(".edt-chitiet").val();
    if(maxe==""){
        thongbao("Hãy nhập vào mã cần chỉnh sửa");
    }else{
        bootbox.confirm("Bạn có muốn sửa thông tin thành </br>"+
                        "Tên xe :"+tenxe+"</br>"+
                        "Loại xe :"+loaixe+"</br>"+
                        "Giá xe :"+giaxe+"</br>"+
                        "Ảnh xe :"+anhxe+"</br>"+
                        "Chi tiết :"+link,function(result){
            if(result==true){
                UpdateDuLieu(maxe,tenxe,loaixe,giaxe,anhxe,link);
            }else{}
        });

    }
});
$(".btn-nhaplai").click(function(){
    var maxe  = $(".edt-maxe").val("");
    var tenxe = $(".edt-tenxe").val("");
    var loaixe= $(".edt-loaixe").val("");
    var anhxe = $(".edt-anhxe").val("");
    var giaxe = $(".edt-giaxe").val("");
    var link  = $(".edt-chitiet").val("");
    
});
$(".formdanhsachxe").on('click','.btn-checkthongtin',function(){
    var maxe = ($(this).parents(".checkthongtin").attr("data-maxe"));
    var tenxe = ($(this).parents(".checkthongtin").attr("data-tenxe"));
    var anhxe = ($(this).parents(".checkthongtin").attr("data-anhxe"));
    var loaixe = ($(this).parents(".checkthongtin").attr("data-loaixe"));
    var giaban = ($(this).parents(".checkthongtin").attr("data-giaban"));
    var chitiet = ($(this).parents(".checkthongtin").attr("data-chitiet"));
    $(".edt-maxe").val(maxe);
    $(".edt-tenxe").val(tenxe);
    $(".edt-loaixe").val(loaixe);
    $(".edt-giaxe").val(giaban);
    $(".edt-anhxe").val(anhxe);
    $(".edt-chitiet").val(chitiet);
});