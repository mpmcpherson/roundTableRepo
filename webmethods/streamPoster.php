<?php
/**
 * Created by PhpStorm.
 * User: typhon
 * Date: 3/17/2016
 * Time: 3:59 PM
 */

include('defaultConnector.php');
$event_type_id = "";
$task_id = "";
$project_id = "";
$comment_id = "";
$event_initiator_id = "";


if(!empty($_GET['event_type_id']))
{//var params = "newPermission="+permissionDropDownVal+"&user_id="+user_id;

    $event_type_id = $_GET['event_type_id'];
}
if(!empty($_GET['task_id']))
{
    $task_id = $_GET['task_id'];
}

if(!empty($_GET['project_id']))
{
    $project_id = $_GET['project_id'];
}
if(!empty($_GET['comment_id']))
{
    $comment_id= $_GET['comment_id'];
}
if(!empty($_GET['event_initiator_id']))
{
    $event_initiator_id = $_GET['event_initiator_id'];
}

$current_user_id = $_COOKIE["userid"];


$logResult = mysqli_query($dbhandle, "insert into scrumdb_bastionsoftware.stream(event_type_id, task_id, project_id, comment_id, is_new, date_created, event_initiator_id) values ($event_type_id,$task_id,$project_id,$comment_id,1,UTC_DATE(),$event_initiator_id)");
