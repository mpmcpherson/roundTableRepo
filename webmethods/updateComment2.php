<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 8/30/17
 * Time: 3:18 PM
 */


include('defaultConnector.php');


$task_id = '';
if(!empty($_GET['task_info_id']))
{
    $task_id = $_GET['task_info_id'];
}

$event_type_id = '';
$post_id = '';
$project_id = '';
$comment_id = '';

$post_id = '';
if(!empty($_GET['post_id']))
{
    $post_id= $_GET['post_id'];
}

$task_message= '';
if(!empty($_GET['task_message']))
{
    $task_message = html_entity_decode($_GET['task_message']);
    $task_message = $msqli->real_escape_string($task_message);
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


    $current_user_id = $_COOKIE["userid"];

    $secondResult = mysqli_query($dbhandle, "update task_info set task_info.task_message = '$task_message' where task_info.task_info_id = $task_id");

    return json_encode("[$task_id][$task_message][$post_id]");

//$event_type_id = 3;
//$logResult = mysqli_query($dbhandle, "insert into stream(event_type_id, task_id, project_id, comment_id, is_new, date_created, event_initiator_id, target_user_id) values ('$event_type_id','$post_id','$project_id','$task_id','1',UTC_DATE(),'$current_user_id','0')");

}