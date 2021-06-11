var recordXe= 6;
taidanhsachxe(0,recordXe,"ms-");
function taidanhsachxe(trang,soDong,Ma){
    $(".formdanhsachxe").html('<image class="img-fluid"src="img/loading.gif"></image>');
    var dataSend = {event:'getDSxe',page:trang,record:soDong,ma:Ma};
    querydata_GET_JSON('php/infoCar.php',dataSend,function(res){
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
            '<div class="card col-4 checkthongtin" data-maxe="'+list.maxe+'" data-tenxe="'+list.tenxe+'" data-anhxe="'+list.anhxe+'" data-loaixe="'+list.loai+'"  data-giaban="'+list.giaxe+'" data-chitiet="'+list.chitiet+'">'+
            '<img src="php/uploads/'+list.anhxe+'"width="300" height="150"  class="card-img-top " alt="...">'+
            '<div class="card-body">'+
              '<h5 class="card-title">'+list.tenxe+'</h5>'+
              '<p class="card-text">Giá :'+format_money(parseFloat(list.giaxe),"")+' ₫</p>'+
              '<a href="'+list.chitiet+'" target="_blank" class="btn btn-primary">Chi Tiết</a>'+
              '<span class="thezoomthongtin mr-1 ml-2"><button class="btn btn-danger my-2 my-sm-0 mr-1 btn-muaxe  ml-2" type="button">Mua</+button></span>'+
            '</div>'+
            '</div>';
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
    if(admin){
    var HTMLCheck =  '<button type="button" class="btn btn-secondary btn-checkthongtin">'+
    '<img class="img-fluid" src="img/iconzoom.png" height="25px" width="25px">'+
    '</button>';
    $(".thezoomthongtin").html(HTMLCheck);
    }
}
var xe_current=0;
$(".pagenumberxe").on('click','button',function () {
    xe_current=$(this).val();
    taidanhsachxe($(this).val(),recordXe,"ms-");
    
});
