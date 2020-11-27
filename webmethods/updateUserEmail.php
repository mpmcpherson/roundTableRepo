<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 2/15/18
 * Time: 5:32 PM
 */
include('defaultConnector.php');


$email = '';
if(!empty($_GET['email']))
{
    $email= $_GET['email'];
}

$current_user_id = $_COOKIE["userid"];
$UACresult = mysqli_query($dbhandle,"select users.user_status from users where users.user_id like '$current_user_id'");

$user_access_level = array();

while ($row = mysqli_fetch_array($UACresult, MYSQLI_ASSOC)) {

    array_push($user_access_level,
        array($row['user_status'])
    );

}


$alt = $user_access_level[0];
if ($alt[0] < 4) {

        $result = mysqli_query($dbhandle, "update users set email = '$email' where user_id = $current_user_id");
}
echo json_encode($email);