<?php
/**
 * Created by PhpStorm.
 * User: typhon
 * Date: 1/20/2016
 * Time: 7:33 PM
 */


include('defaultConnector.php');



$user_id = '';
if(!empty($_GET['user_id']))
{
    $user_id = $_GET['user_id'];
}

$result = mysqli_query($dbhandle, "UPDATE users SET user_status = '-1' where users.user_id = $user_id");
//$deauth = mysqli_query($dbhandle, "delete from project_ac where user_id = $user_id");


$current_user_id = $_COOKIE["userid"];
$event_type_id = 3;
$logResult = mysqli_query($dbhandle, "insert into stream(event_type_id, task_id, project_id, comment_id, is_new, date_created, event_initiator_id, target_user_id) values ('$event_type_id','$post_id','$project','$task_id','1',UTC_DATE(),'$current_user_id', '$user_id')");

