<?php
//  var_dump($_FILES);
//  move_uploaded_file($_FILES['upload_file']['tmp_name'],'uploads/'.$_FILES['upload_file']['name']);
require_once('connect.php');
$folder_path = 'uploads/';
$file_path =$folder_path.$_FILES['upload_file']['name'];
$flag_ok =true;

//check file thử có bị trùng không ?
if(file_exists($file_path)){
    echo "file đã tồn tại";
    $flag_ok = false;  
}

//jpg,png,jpeg,gif;
$ex =array('jpg','png','jpeg','gif');

$file_type = strtolower(pathinfo($file_path,PATHINFO_EXTENSION));
//check xem đuôi file có thuộc trong mang hay không ?
if(!in_array($file_type,$ex)){
    echo "loại file không hợp lệ";
    $flag_ok = false;
}
// check dung lượng upload len 1,646 byte 
if($_FILES['upload_file']['size']>500000){
    echo "dung lượng file quá lớn ";
    $flag_ok = false;
}
if($flag_ok){
    echo "Upload thành công </br>";
    $tenanh = substr($file_path,8);
    echo $tenanh;
    $sql= "INSERT INTO `image`(`tenanh`) VALUES ('$tenanh')";
    mysqli_query($connect,$sql);
    move_uploaded_file($_FILES['upload_file']['tmp_name'],$file_path);
}else{
    echo " không upload được";
}


?>