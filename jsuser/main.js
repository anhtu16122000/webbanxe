var taikhoan = localStorage.getItem("tkLocal");
var matkhau  = localStorage.getItem("mkLocal");
var avatar   = localStorage.getItem("avatarLocal");
var admin    =localStorage.getItem("admin");
if(taikhoan=="" || taikhoan==undefined || taikhoan==null){
}else{  
    if(admin){
        setAvatar(avatar,taikhoan);
        setAdmin();
        $(".formloadanh").removeClass("is-hidden");
       
    }else{
        setAvatar(avatar,taikhoan);
    }
}
function setAvatar(avatar,taikhoan){
    var HTMLInfoUser='<img src="img/'+avatar+'"alt="..." class=".img-thumbnail rounded-circle" width="40" height="40">'+
                     '<div class="btn-group" role="group"><button id="btnGroupDrop1" type="button" class="btn btn-light dropdown-toggle rounded-pill" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+taikhoan+'</button>'+
                     '<div class="dropdown-menu formupload list-user" aria-labelledby="btnGroupDrop1"><a class="dropdown-item " target="_blank" href="formsuathongtin.html">Sửa thông tin</a><a class="dropdown-item btn-dangxuat" href="#">Đăng xuất</a></div></div>';
    $(".formdangnhap").html(HTMLInfoUser);      
}
function setAdmin(){
    $(".list-user").html('<a class="dropdown-item " href="formdonhang.html">Xử lý đơn hàng</a><a class="dropdown-item " target="_blank" href="HTMLuploadfile.html">Kho ảnh</a><a class="dropdown-item btn-dangxuat" href="#">Đăng xuất</a>');
    var HTMLAdmin='<form>'+
                    '<div class="row">'+
                    '<div class="col-md-2 "><input type="text" class="form-control edt-maxe" placeholder="Nhập vào mã xe"></div>'+
                    '<div class="col-md-2"><input type="text" class="form-control edt-tenxe" placeholder="Nhập vào tên xe"></div>'+
                    '<div class="col-md-2"><input type="text" class="form-control edt-loaixe" placeholder="Nhập và loại xe"></div>'+
                    '<div class="col-md-3"><input type="text" class="form-control edt-anhxe" placeholder="Nhập vào tên ảnh"></div>'+
                    '<div class="col-md-3"><input type="text" class="form-control edt-giaxe" placeholder="Nhập vào giá bán"></div>'+
                    '<div class="col-md-12 mt-1"><input type="text" class="form-control edt-chitiet" placeholder="Nhập link mô tả"></div>'+
                    '</div></form><div class="row mt-2 justify-content-center"><button type="button" class="btn btn-primary mr-2 btn-themxe">Thêm</button> <button type="button" class="btn btn-secondary mr-2 btn-xoadulieu">Xóa</button><button type="button" class="btn btn-success mr-2 btn-updatedulieu">Sửa</button><button type="button" class="btn btn-danger btn-nhaplai">Nhập lại</button></div>'
    $(".formadmin").html(HTMLAdmin);
}
$(".btn-dangxuat").click(function(){
    localStorage.removeItem('tkLocal');
    localStorage.removeItem('mkLocal');
    localStorage.removeItem('avatarLocal');
    localStorage.removeItem("admin")
    location.reload();
});
function format_money(n, currency) {
    return currency + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  }
  $(".formdanhsachxe").on('click','.btn-muaxe',function(){
    var maxe = ($(this).parents(".checkthongtin").attr("data-maxe"));
    var tenxe = ($(this).parents(".checkthongtin").attr("data-tenxe"));
    var taikhoan = localStorage.getItem('tkLocal');
    bootbox.confirm('Bấm "Ok" để xác nhận',function(result){
        if(result==true){
            dataSend ={event:'muahang',maxe:maxe,taikhoan:taikhoan};
            querydata_GET_JSON('php/login.php',dataSend,function(res){
                if(res['muahang']==1){
                    thongbao("Bạn đã đặt mua "+tenxe+"</br> Chúng tôi sẽ liên hệ với bạn để xác nhận !");
                }else{
                    thongbao("Thao tác thất bại");
                }
            })
        }else{}
    });
   
  });