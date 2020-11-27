<?php
/**
 * Created by PhpStorm.
 * User: typhon
 * Date: 9/13/2015
 * Time: 4:21 PM
 */

include('defaultConnector.php');

$event_type_id = '';
$post_id = '';
$project_id = '';
$comment_id = '';


$post_id = '';
if(!empty($_GET['post_id']))
{
    $post_id= $_GET['post_id'];
}

$user_id= '';
if(!empty($_GET['user_id']))
{
    $user_id= $_GET['user_id'];
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

    $result = mysqli_query($dbhandle, "update posts set posts.assigned_user = $user_id where posts.post_id = $post_id ");
    $event_type_id = 5;
    $logResult = mysqli_query($dbhandle, "insert into stream(event_type_id, task_id, project_id, comment_id, is_new, date_created, event_initiator_id, target_user_id) values ('$event_type_id','$post_id','$project_id','$comment_id','1',UTC_DATE(),'$current_user_id', '$user_id')");
}