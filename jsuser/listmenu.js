
function ActiveMenu(tenclass){
    $("."+tenclass).click(function(){
        $(".list_menu_one").removeClass("active");
        $(".list_menu_two").removeClass("active");
        $(".list_menu_three").removeClass("active");
        $(".list_menu_four").removeClass("active");
        $("."+tenclass).addClass("active");
        console.log("Đã click "+tenclass);
        
    });
}


$(".btn-dangnhap").click(function(){
    var taikhoan = $(".formtaikhoan").val();
    var matkhau = $(".formmatkhau").val();
    if(taikhoan=="" || matkhau==""){
        thongbao("Vui lòng nhập tài khoản và mật khẩu");
    }else{
        kiemtradangnhap(taikhoan,matkhau);
    }
    
    
});
ActiveMenu("list_menu_one");
ActiveMenu("list_menu_two");
ActiveMenu("list_menu_three");
ActiveMenu("list_menu_four");


function kiemtradangnhap(taikhoan, matkhau){
   var dataSend = {event:'dangnhaphethong',tk:taikhoan,mk:matkhau};
   querydata_GET_JSON('php/login.php',dataSend,function(res){
        console.log(res);
        if(res.trangthai==1){
            var Avatar      = res.data.avatar;
            var TenDangNhap = res.data.taikhoan;
            var Matkhau     =res.data.matkhau;
            localStorage.setItem("tkLocal",TenDangNhap);
            localStorage.setItem("mkLocal",Matkhau); // lưu trữ cục bộ trên trình duyệt
            localStorage.setItem("avatarLocal",Avatar);
            location.reload();
        }else if(res.trangthai==2){
            var Avatar      = res.data.avatar;
            var TenDangNhap = res.data.taikhoan;
            var Matkhau     =res.data.matkhau;
            localStorage.setItem("tkLocal",TenDangNhap);
            localStorage.setItem("mkLocal",Matkhau); // lưu trữ cục bộ trên trình duyệt
            localStorage.setItem("avatarLocal",Avatar);
            localStorage.setItem("admin",true);
            location.reload();
            
        }
        else{
            thongbao("Sai tài khoản hoặc mật khẩu ");
        }

   });
}
