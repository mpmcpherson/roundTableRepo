<?php
/**
 * Created by PhpStorm.
 * User: typhon
 * Date: 3/10/2016
 * Time: 6:24 PM
 */


include('defaultConnector.php');


$task_id = '';
if(!empty($_GET['task_info_id']))
{
    $task_id = $_GET['task_info_id'];
}


$current_user_id = $_COOKIE["userid"];

$result = mysqli_query($dbhandle,"update task_info set task_info.status = 0 where task_info.task_info_id = $task_id");



//     $newRes = mysqli_query($dbhandle, "INSERT INTO `scrumdb_bastionsoftware`.`stream` (`event_type_id`,`task_id`,`project_id`,`comment_id`,`date_created`,`event_initiator_id`,`target_user_id`,`event_target_type_id`) VALUES( );");

$newRes = mysqli_query($dbhandle, "INSERT INTO `scrumdb_bastionsoftware`.`stream` (`event_type_id`,`task_id`,`project_id`,`comment_id`,`date_created`,`event_initiator_id`,`target_user_id`,`event_target_type_id`) VALUES(5,-1,-1, -1, UTC_TIMESTAMP(), $current_user_id, $newuserid , 3);");
//gotta get this data, finish updating all these to write to the stream

$event_type_id = 3;



$logResult = mysqli_query($dbhandle, "insert into stream(event_type_id, task_id, project_id, comment_id, is_new, date_created, event_initiator_id, target_user_id) values ('$event_type_id','$post_id','$project_id','$task_id','1',UTC_DATE(),'$current_user_id','0')");

