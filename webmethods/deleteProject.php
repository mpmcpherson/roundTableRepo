<?php
/**
 * Created by PhpStorm.
 * User: typhon
 * Date: 10/23/2015
 * Time: 7:07 PM
 */

include('defaultConnector.php');



$project = '';
if(!empty($_GET['project_id']))
{
    $text = html_entity_decode($_GET['project_id']);
    $project = $msqli->real_escape_string($text);
}

echo json_encode($project);

//execute the SQL query and return records
$result = mysqli_query($dbhandle, "UPDATE projects SET status_id = '1' where project_id  = $project");

//currently the below is cut, so that the stream functions (not done yet) can tell who to notify of the project's deletion
//$deauth = mysqli_query($dbhandle, "delete from project_ac where project_id = $project");

$current_user_id = $_COOKIE["userid"];
$event_type_id = 3;
$logResult = mysqli_query($dbhandle, "insert into stream(event_type_id, task_id, project_id, comment_id, is_new, date_created, event_initiator_id, target_user_id) values ('$event_type_id','$post_id','$project','$task_id','1',UTC_DATE(),'$current_user_id', '0')");

