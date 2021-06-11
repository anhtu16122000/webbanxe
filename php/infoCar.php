<?php
require_once('connect.php');
$event=$_GET['event'];
switch ($event){
    case 'themdulieu':{
        $maxe  = $_GET["maxe"];
        $tenxe = $_GET["tenxe"];
        $giaxe = $_GET["giaxe"];
        $loaixe= $_GET["loaixe"];
        $anhxe = $_GET["anhxe"];
        $link  = $_GET["link"];
        $query = "INSERT INTO `infocar`(`maxe`, `tenxe`, `giaxe`, `loai`,`image`,`chitiet`) VALUES ('$maxe','$tenxe','$giaxe','$loaixe','$anhxe','$link')";
        if(mysqli_query($connect,$query)){
            $res[$event] = 1;
        }else{
            $res[$event] = 0;
        }
        echo json_encode($res);
        mysqli_close($connect);
        break;
    }
    case 'getDSxe':{
        $mang=array();
        $record =(int)$_GET['record'];
        $page   =(int)$_GET['page'];
        $ma     =$_GET['ma'];  
        $thutu=$page*$record;
        $locDS =" WHERE maxe LIKE'$ma%' ";
        // $limit='LIMIT'.$thutu.','.$record;
        $query="SELECT `maxe`, `tenxe`, `giaxe`, `loai`,`image`,`chitiet` FROM `infocar` $locDS LIMIT $thutu,$record";
        $result=mysqli_query($connect,$query); 
        while($rows=mysqli_fetch_array($result)){
            $id=$rows['maxe'];
            $usertemp['maxe']=$rows['maxe'];
            $usertemp['tenxe']=$rows['tenxe'];
            $usertemp['giaxe']=$rows['giaxe'];
            $usertemp['loai']=$rows['loai'];
            $usertemp['anhxe']=$rows['image'];
            $usertemp['chitiet']=$rows['chitiet'];
          
            $mang[$id]=$usertemp;
        }
        $tong=mysqli_query($connect,"SELECT COUNT(*) as 'tongsodong' from infocar $locDS");
        $row=mysqli_fetch_array($tong);
        $jsonData['total'] =(int)$row['tongsodong'];
        $jsonData['totalpage'] =ceil($row['tongsodong']/$record);
        $jsonData['page'] =(int)$page;
        $jsonData['items'] =$mang;
        echo json_encode($jsonData);
        mysqli_close($connect);
        break;
    }
    case 'xoadulieu':{
        $maxe = $_GET['maxe'];
        $query = "DELETE FROM `infocar` WHERE maxe='$maxe'";
        mysqli_query($connect,$query);
        if(mysqli_affected_rows($connect)>0){
            $res[$event]=1;
        }else{
            $res[$event]=0;
        }
        echo json_encode($res);
        mysqli_close($connect);
        break;
    }
    case 'updatedulieu':{
        $maxe   = $_GET['maxe'];
        $tenxe  = $_GET['tenxe'];
        $giaxe  = $_GET['giaxe'];
        $loaixe = $_GET['loaixe'];
        $anhxe  = $_GET['anhxe'];
        $chitiet= $_GET['link'];
        $query   = "UPDATE `infocar` SET `maxe`='$maxe',`tenxe`='$tenxe',`giaxe`='$giaxe',`loai`='$loaixe',`image`='$anhxe',`chitiet`='$chitiet' WHERE maxe='$maxe'";
        $result  = mysqli_query($connect,$query);
        if($result){
            $res[$event]=1;
        }else{
            $res[$event]=0;
        }
        echo json_encode($res);
        mysqli_close($connect);
        break;
    }
    case 'getDShinh':{
        $mang=array();
        $record=(int)$_GET['record'];
        $page=(int)$_GET['page'];
        $thutu=$page*$record;
        // $limit='LIMIT'.$thutu.','.$record;
        $query="SELECT * FROM `image` LIMIT $thutu,$record";
        $result=mysqli_query($connect,$query); 
        while($rows=mysqli_fetch_array($result)){
            $id=$rows['tenanh'];
            $usertemp['tenanh']=$rows['tenanh'];
            $mang[$id]=$usertemp;
        }
        $tong=mysqli_query($connect,"SELECT COUNT(*) as 'tongsodong' from image");
        $row=mysqli_fetch_array($tong);
        $jsonData['total'] =(int)$row['tongsodong'];
        $jsonData['totalpage'] =ceil($row['tongsodong']/$record);
        $jsonData['page'] =(int)$page;
        $jsonData['items'] =$mang;
        echo json_encode($jsonData);
        mysqli_close($connect);
        break;
    }
    case 'dktaikhoan':{
        $taikhoan = $_GET['taikhoan'];
        $matkhau  = md5($_GET['matkhau']);
        $diachi   = $_GET['diachi'];
        $email    = $_GET['email'];
        $sdt      = $_GET['sdt'];
        $gioitinh = $_GET['gioitinh'];
        $query = "INSERT INTO `user`(`taikhoan`, `matkhau`, `diachi`, `email`, `sodienthoai`, `gioitinh`) VALUES ('$taikhoan','$matkhau','$diachi','$email','$sdt','$gioitinh')";
        $select= "SELECT * FROM user WHERE  taikhoan='$taikhoan'";
        $result= mysqli_query($connect,$select);
        if($rows=mysqli_fetch_array($result)>0){
            $res[$event]=2;
        }else{
            if(mysqli_query($connect,$query)){
                $res[$event]=1;
            }else{
                $res[$event]=0;
            }  
        }
        echo json_encode($res);
        mysqli_close($connect);
        break;
    }
    case 'csthongtinget':{
        $taikhoan=$_GET['taikhoan'];
        $sql =" SELECT * FROM `user` WHERE taikhoan='$taikhoan' ";
        $resutl = mysqli_query($connect,$sql);
        while($rows=mysqli_fetch_array($resutl)){
            $usertemp['taikhoan']= $rows['taikhoan'];
            $usertemp['matkhau'] = $rows['matkhau'];
            $usertemp['diachi']  = $rows['diachi'];
            $usertemp['email']   = $rows['email'];
            $usertemp['sdt']     = $rows['sodienthoai'];
            $usertemp['gioitinh']= $rows['gioitinh'];
        }
        echo json_encode($usertemp);
        mysqli_close($connect);

        break;
    }
    case 'csthongtinedit':
        $taikhoan = $_GET['taikhoan'];
        $matkhau  = md5($_GET['matkhau']);
        $matkhaucu= md5($_GET['matkhaucu']);
        $diachi   = $_GET['diachi'];
        $email    = $_GET['email'];
        $sdt      = $_GET['sdt'];
        $gioitinh = $_GET['gioitinh'];
        $sql ="SELECT * FROM `user` WHERE taikhoan='$taikhoan' AND matkhau='$matkhaucu'";
        $result = mysqli_query($connect,$sql);
        if($rows=mysqli_fetch_array($result)>0){
            $sql   = "UPDATE `user` SET `taikhoan`='$taikhoan',`matkhau`='$matkhau',`diachi`='$diachi',`email`='$email',`sodienthoai`='$sdt',`gioitinh`='$gioitinh' WHERE taikhoan='$taikhoan'";
            $result  = mysqli_query($connect,$sql);
            if($result){
                $res[$event]=1;
            }else{
                $res[$event]=0;
            }
            echo json_encode($res);
          
        }else{
            $res[$event]=2; 
            echo json_encode($res); 
        }
        mysqli_close($connect);
        break;





    }
    
?>