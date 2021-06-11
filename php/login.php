<?php
require_once('connect.php');
$event=$_GET['event'];
switch($event){
    case 'dangnhaphethong':{
        $taikhoan =$_GET['tk'];
        $matkhau =md5($_GET['mk']);
        $check ='';
        $query = "SELECT * FROM `user` WHERE taikhoan='$taikhoan' and matkhau='$matkhau'";
        $sql=mysqli_query($connect,$query);
        while($rows=mysqli_fetch_array($sql)){
            $jsonresponse['taikhoan'] = $rows['taikhoan'];
            $jsonresponse['matkhau'] = $rows['matkhau'];
            $jsonresponse['avatar'] = $rows['avatar'];
            $check= $rows['taikhoan'];
        }
        if($check !=''){   
            $jsonData['trangthai'] = 1;
            $jsonData['data'] = $jsonresponse;
            echo json_encode($jsonData);
        }else{
            $queryAdmin = "SELECT * FROM `useradmin` WHERE taikhoan='$taikhoan' and matkhau='$matkhau'";
            $sqlAdmin = mysqli_query($connect,$queryAdmin);
            while($rows=mysqli_fetch_array($sqlAdmin)){
                $jsonresponse['taikhoan'] = $rows['taikhoan'];
                $jsonresponse['matkhau'] = $rows['matkhau'];
                $jsonresponse['avatar'] = $rows['avatar'];
                $check= $rows['taikhoan'];
            }
            if($check !=''){
                $jsonData['trangthai']=2;
                $jsonData['data']=$jsonresponse;
                echo json_encode($jsonData);
                
            }else{
                $jsonData['trangthai'] =0;
                echo json_encode($jsonData);
            }  
        }
        break;
    }
    case 'muahang':{
        $taikhoan =$_GET['taikhoan'];
        $maxe     =$_GET['maxe'];
        $sql = "INSERT INTO `donhang` (`madh`, `taikhoan`, `maxe`, `thoigian`) VALUES (NULL, '$taikhoan', '$maxe', current_timestamp())";
        $result=mysqli_query($connect,$sql);
        if($result){
            $res[$event]=1;
        }else{
            $res[$event]=0;
        }
        echo json_encode($res);
        break;
    }
    case 'getDSdonhang':{
        $mang=array();
        $record=(int)$_GET['record'];
        $page=(int)$_GET['page'];
        $thutu=$page*$record;
        $query="SELECT * FROM infocar,donhang,user WHERE infocar.maxe = donhang.maxe and donhang.taikhoan=user.taikhoan";
        $result=mysqli_query($connect,$query); 
        while($rows=mysqli_fetch_array($result)){
            $id=$rows['madh'];
            $usertemp['maxe']=$rows['maxe'];
            $usertemp['tenxe']=$rows['tenxe'];
            $usertemp['giaxe']=$rows['giaxe'];
            $usertemp['loai']=$rows['loai'];
            $usertemp['taikhoan']=$rows['taikhoan'];
            $usertemp['thoigian']=$rows['thoigian'];
            $usertemp['email']=$rows['email'];
            $usertemp['sodienthoai']=$rows['sodienthoai'];
            $usertemp['gioitinh']=$rows['gioitinh'];
            $mang[$id]=$usertemp;
        }
        $tong=mysqli_query($connect,"SELECT COUNT(*) as tongsodong FROM infocar,donhang,user WHERE infocar.maxe = donhang.maxe and donhang.taikhoan=user.taikhoan");
        $row=mysqli_fetch_array($tong);
        $jsonData['total'] =(int)$row['tongsodong'];
        $jsonData['totalpage'] =ceil($row['tongsodong']/$record);
        $jsonData['page'] =(int)$page;
        $jsonData['items'] =$mang;
        echo json_encode($jsonData);
        mysqli_close($connect);
        break;
        break;
    }
    case 'xoadonhang':{
        $madh =$_GET['madh'];
        $sql = "DELETE FROM `donhang` WHERE madh='$madh' ";
        $result = mysqli_query($connect,$sql);
        if(mysqli_affected_rows($connect)){
            $res[$event]=1;
        }else{
            $res[$event]=0;
        }
        echo json_encode($res);
        mysqli_close($connect);
        break;
    }
    default:{
        break;
    }
}


?>