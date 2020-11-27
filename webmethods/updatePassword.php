<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 2/10/18
 * Time: 8:50 PM
 */
require('PasswordHash.php');
include('defaultConnector.php');



$oldPassword = "";

if(!empty($_GET['oldPassword']))
{
    $oldPassword  = $_GET['oldPassword'];
}
$newPassword = "";
if(!empty($_GET['newPassword']))
{
    $newPassword = $_GET['newPassword'];
}

$current_user_id = $_COOKIE["userid"];

$useramt="select users.pw_hash from users where users.user_id = '$current_user_id'";
$UACresult = mysqli_query($dbhandle, $useramt);


$user_access_level = array();

while ($row = mysqli_fetch_array($UACresult, MYSQLI_ASSOC)) {

    array_push($user_access_level,
        array($row['pw_hash'])
    );
}
$pwdHasher = new PasswordHash(8, false);

$storedPW = $user_access_level[0][0];


if ($pwdHasher->CheckPassword($oldPassword, $storedPW)) { // and the password passes...

    $hash = $pwdHasher->HashPassword($newPassword);

    $result = mysqli_query($dbhandle, "update users set pw_hash = '$hash' where user_id = $current_user_id");

    echo json_encode("Password changed!");


} else { //user not valid and session ID no good
    echo json_encode("nope"); //this should instead start logging things on the back end

}
//echo json_encode("An error occurred");