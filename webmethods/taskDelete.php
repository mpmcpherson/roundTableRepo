<?php
/**
 * Created by PhpStorm.
 * User: typhon
 * Date: 8/12/2015
 * Time: 8:08 PM
 */

include('defaultConnector.php');
$event_type_id = " ";

$project_id = " ";
$comment_id = " ";
$event_initiator_id = " ";

$post_id = '';
if(!empty($_GET['post_id']))
{

    $post_id = $_GET['post_id'];
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

    $event_type_id = 3;
    $result = mysqli_query($dbhandle, "UPDATE posts SET status = '4' where post_id  = '$post_id'");
    $logResult = mysqli_query($dbhandle, "insert into stream(event_type_id, task_id, project_id, comment_id, is_new, date_created, event_initiator_id, target_user_id) values ('$event_type_id','$post_id','$project_id','$comment_id','1',UTC_DATE(),'$current_user_id','0')");
}