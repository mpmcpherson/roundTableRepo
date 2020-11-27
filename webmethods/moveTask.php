<?php
/**
 * Created by PhpStorm.
 * User: typhon
 * Date: 5/23/2015
 * Time: 5:24 PM
 */
include('defaultConnector.php');


$post_id = '';
if(!empty($_GET['post_id']))
{
    $post_id = $_GET['post_id'];
}
$direction = '';
if(!empty($_GET['direction']))
{

    $direction = $_GET['direction'];
}

$user_id = '';
if(!empty($_COOKIE['userid']))
{

    $user_id = $_COOKIE['userid'];
}


$event_type_id = " ";

$project_id = " ";
$comment_id = " ";
$event_initiator_id = " ";


if(empty($_GET['event_type_id']))
{
    if($direction == 1) {
        $event_type_id = 1;//advance task
    }else if ($direction ==-1){
        $event_type_id = 2;//regress task
    }
}else
{
    $event_type_id = $_GET['event_type_id'];
}


if(!empty($_GET['project_id']))
{
    $project_id = $_GET['project_id'];
}
if(!empty($_GET['comment_id']))
{
    $comment_id= $_GET['comment_id'];
}

$current_user_id = $_COOKIE["userid"];




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

//execute the SQL query and return records
    $result = mysqli_query($dbhandle, "UPDATE posts SET status = CASE WHEN ".$direction."=1 THEN CASE WHEN status <= 1 THEN status+" . $direction . " ELSE status END ELSE CASE WHEN status >=1 THEN status+".$direction." ELSE STATUS END END, assigned_user = '$user_id' where post_id  = '$post_id'");

    $logResult = mysqli_query($dbhandle, "insert into stream(event_type_id, task_id, project_id, comment_id, is_new, date_created, event_initiator_id) values ('$event_type_id','$post_id','$project_id','$comment_id','1',UTC_DATE(),'$user_id')");
}

//fetch tha data from the database

