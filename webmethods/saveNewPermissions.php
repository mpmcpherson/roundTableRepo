<?php
/**
 * Created by PhpStorm.
 * User: typhon
 * Date: 2/17/2016
 * Time: 9:26 PM
 */


include('defaultConnector.php');


$newPermissions = '';
if(!empty($_GET['newPermission']))
{//var params = "newPermission="+permissionDropDownVal+"&user_id="+user_id;

    $newPermissions = $_GET['newPermission'];
}

$user_id= '';
if(!empty($_GET['user_id']))
{
    $user_id = $_GET['user_id'];
}

$current_user_id = $_COOKIE["userid"];
$UACresult = mysqli_query($dbhandle,"select users.user_status from users where users.user_id like '$current_user_id'");

$user_access_level = array();

while ($row = mysqli_fetch_array($UACresult, MYSQLI_ASSOC)) {

    array_push($user_access_level,
        array($row['user_status'])
    );

}

$targetUserResult = mysqli_query($dbhandle,"select users.user_status from users where users.user_id like '$user_id'");

$targetAry = array();

while ($row = mysqli_fetch_array($targetUserResult , MYSQLI_ASSOC)) {

    array_push($targetAry,
        array($row['user_status'])
    );

}



$alt = $user_access_level[0];

$TA = $targetAry[0];
//you can't set anyone's permissions higher than yours, and you can't set the permissions of anyone higher than you
if ($alt[0] <= $newPermissions && $TA[0] >= $alt[0]) {

    $result = mysqli_query($dbhandle, "update users set user_status = $newPermissions where user_id = $user_id");
    //echo json_encode("alt: $alt[0]...TA: $TA[0]...New Permissions: $newPermissions");
}
else
{
    //echo json_encode("LOGIC ERROR: alt: $alt[0]...TA: $TA[0]...New Permissions: $newPermissions");
}