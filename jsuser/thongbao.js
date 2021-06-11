function thongbao(mes,callback){
    bootbox.alert({
        message:mes,
        callback:callback
    });
}
/*
bootbox.confirm("Bạn có muốn đăng nhập với tài khoản "+a+" không ?",function(result){
    if(result==true){
        thongbao("đã đăng nhập");
    }
    else{}
});
*/