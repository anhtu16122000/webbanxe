var recordHinh =12;

function taidanhsachanh(trang,soDong){
    $(".formdanhsachanh").html('<image class="img-fluid"src="img/loading.gif"></image>');
    var dataSend = {event:'getDShinh',page:trang,record:soDong};
    querydata_GET_JSON('php/infoCar.php',dataSend,function(res){
        $(".formdanhsachanh").html("");
        buildHTMLAnhData(res);
    });
}
function buildHTMLAnhData(res) {
    if(res.total==0){
         $(".formdanhsachanh").html("Chưa có nội dung");	
    }else{  
     var data = res.items;
    resalltheloai=data;
     var stt=1;
     var currentpage=parseInt(res.page);
     stt=printSTT(recordHinh,currentpage);
     var html     ='';	
     for (item in data) {
         var list=data[item];
         html=html +
            '<div class="card col-3" style="width: 18rem;">'+
            '<img src="php/uploads/'+list.tenanh+'" class="card-img-top" width="150px" height="150px" alt="...">'+
            '<div class="card-body">'+
            '<p class="card-text" align="center">'+list.tenanh+'</p>'+
            '</div>'+
        '</div>';

         stt++;
     
         $(".formdanhsachanh").html(html)
     }
     buildSlidePage($(".pagenumberanh"),5,res.page,res.totalpage);
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
$(".pagenumberanh").on('click','button',function () {
    xe_current=$(this).val();
    taidanhsachanh($(this).val(),recordHinh);
});
taidanhsachanh(0,recordHinh);
if(admin){
}else{
    location.href = "index.html";
}