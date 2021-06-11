function querydata_POST_JSON(url, dataSend, callback){
    $.ajax({
        type:'POST',
        url:url,
        success: callback,
        dataType:'json',
        data:dataSend,
        async:true
    });
}

function querydata_GET_JSON(url,dataSend,callback){
    $.ajax({
        type:'GET',
        url:url,
        data:dataSend,
        success:callback,
        dataType:'JSON',
        async:true
    })
}
function queryDataPOST_TEXT(url,dataSend,callback){
    $.ajax({
        type: 'POST',
        url: url,
        data: dataSend,
        async: true,
        dataType: 'text',
        success: callback
    });
}
function querydata_GET_TEXT(url,dataSend,callback){
    $.ajax({
        type:'GET',
        url:url,
        data:dataSend,
        success:callback,
        dataType:'text',
        async:true
    })
}
