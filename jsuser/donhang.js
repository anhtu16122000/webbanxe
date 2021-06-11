var recordXe= 6;
taidanhsachxe(0,recordXe);
function taidanhsachxe(trang,soDong){
    $(".formdanhsachxe").html('<image class="img-fluid"src="img/loading.gif"></image>');
    var dataSend = {event:'getDSdonhang',page:trang,record:soDong};
    querydata_GET_JSON('php/login.php',dataSend,function(res){
        $(".formdanhsachxe").html("");
        buildHTMLXeData(res);
    });
}
function buildHTMLXeData(res) {
    if(res.total==0){
         $(".formdanhsachxe").html("Chưa có nội dung");	
    }else{  
     var data = res.items;
    resalltheloai=data;
     var stt=1;
     var currentpage=parseInt(res.page);
     stt=printSTT(recordXe,currentpage);
     var html     ='';	
     for (item in data) {
         var list=data[item];
         html=html +
         '<tr class="checkthongtin" data-madh="'+item+'">'+
            '<th scope="row">'+stt+'</th>'+
            '<td>'+list.maxe+'</td>'+
            '<td>'+list.tenxe+'</td>'+
            '<td>'+format_money(parseFloat(list.giaxe),"")+' ₫'+'</td>'+
            '<td>'+list.loai+'</td>'+
            '<td>'+list.taikhoan+'</td>'+
            '<td>'+list.sodienthoai+'</td>'+
            '<td>'+list.gioitinh+'</td>'+
            '<td>'+list.thoigian+'</td>'+
            '<td><button type="button" class="btn btn-info btn-xoa">Xóa</button></td>'+
           
          '</tr>';
          
         stt++;
         
     
         $(".formdanhsachxe").html(html)
     }
     buildSlidePage($(".pagenumberxe"),5,res.page,res.totalpage);
    }
 }

 function printSTT(record,pageCurr){
    if ((pageCurr+1)==1) {
        return 1;
    }else{
        return record*(pageCurr+1)-(record-1);
    }
}

 function buildSlidePage(obj,codan,pageActive,totalPage) {
    var html="";
    pageActive=parseInt(pageActive);
    for(i = 1 ; i <=codan; i++) {
        if(pageActive-i<0) break;
        html='<button type="button" class="btn btn-outline btn-default" value="'+(pageActive-i)+'">'+(pageActive-i+1)+'</button>'+html;
    }
    if(pageActive>codan){
        html='<button type="button" class="btn btn-outline btn-default" value="'+(pageActive-i)+'">...</button>'+html;
    }
    html+='<button type="button" class="btn btn-outline btn-default" style="background-color: #5cb85c" value="'+pageActive+'">'+(pageActive+1)+'</button>';
    for(i = 1 ; i <=codan; i++){
        if(pageActive+i>=totalPage) break;
        html=html+'<button  type="button" class="btn btn-outline btn-default" value="'+(pageActive+i)+'">'+(pageActive+i+1)+'</button>';
    }
    if(totalPage-pageActive>codan+1){
        html=html+'<button type="button" value="'+(pageActive+i)+'" class="btn btn-outline btn-default">...</button>';
    }
    obj.html(html);
}
var xe_current=0;
$(".pagenumberxe").on('click','button',function () {
    xe_current=$(this).val();
    taidanhsachxe($(this).val(),recordXe);
    
});
function format_money(n, currency) {
    return currency + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  }
$(".formdanhsachxe").on('click','.btn-xoa',function(){
    var madh =$(this).parents(".checkthongtin").attr("data-madh");
    bootbox.confirm("Bấm ok để xóa",function(result){
        if(result==true){
            var dataSend = {event:'xoadonhang',madh:madh};
            querydata_GET_JSON('php/login.php',dataSend,function(res){
        if(res['xoadonhang']==1){
            console.log(" xóa thanh công");
            taidanhsachxe(xe_current,recordXe);

        }
        if(res['xoadonhang']==0){
            console.log(" xóa không thành công");
        }
    });
        }else{}
    });
    
});
if(admin){
}else{
    location.href = "index.html";
}
