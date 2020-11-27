<?php

require('PasswordHash.php');

/**
 * Created by PhpStorm.
 * User: typhon
 * Date: 4/3/2015
 * Time: 6:53 PM
 */
include('defaultConnector.php');



$password = "";

if(!empty($_GET['password']))
{
    $password = $_GET['password'];
}


$user_name = "";

if(!empty($_GET['user_name']))
{
    $user_name = $_GET['user_name'];
}


$email = "";

if(!empty($_GET['email']))
{
    $email = $_GET['email'];
}



$current_user_id = $_COOKIE["userid"];
$UACresult = mysqli_query($dbhandle,"select users.user_status, users.organizational_unit from users where users.user_id like '$current_user_id'");

$user_access_level = array();

while ($row = mysqli_fetch_array($UACresult, MYSQLI_ASSOC)) {

    array_push($user_access_level,
        array($row['user_status'], $row['organizational_unit'])
    );

}


$alt = $user_access_level[0][0];
$OU = $user_access_level[0][1];

if ($alt[0] <= 2) {

    $pwdHasher = new PasswordHash(8, FALSE);


    $hash = $pwdHasher->HashPassword($password);



    $result = mysqli_query($dbhandle, "INSERT into users(pw_hash, username, email, user_status, organizational_unit) VALUES ('$hash','$user_name','$email',3, $OU[0])");

    $newUser = mysqli_query($dbhandle, "select user_id from users where user_name like $user_name");

    $ary = array();

    while($row = mysqli_fetch_array($newUser, MYSQLI_ASSOC))
    {
        array_push($ary, array($row['user_id']));
    }
    $newUserVal = $ary[0][0];
    $newuserid = $newUserVal[0];

    //     $newRes = mysqli_query($dbhandle, "INSERT INTO `scrumdb_bastionsoftware`.`stream` (`event_type_id`,`task_id`,`project_id`,`comment_id`,`date_created`,`event_initiator_id`,`target_user_id`,`event_target_type_id`) VALUES( );");

    $newRes = mysqli_query($dbhandle, "INSERT INTO `scrumdb_bastionsoftware`.`stream` (`event_type_id`,`task_id`,`project_id`,`comment_id`,`date_created`,`event_initiator_id`,`target_user_id`,`event_target_type_id`) VALUES(5,-1,-1, -1, UTC_TIMESTAMP(), $current_user_id, $newuserid , 3);");


}