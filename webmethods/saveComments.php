<?php
/**
 * Created by PhpStorm.
 * User: typhon
 * Date: 12/9/2015
 * Time: 5:33 PM
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





    $event_type_id = 4;
    if(!(strlen($task_message) > 0 && strlen(trim($task_message)) == 0)&& $task_message != "") {
        $result = mysqli_query($dbhandle, "INSERT into task_info(post_id, task_message, created_date) values ($post_id, '$task_message', UTC_TIMESTAMP() ) ");
        //this is going to produce semi-bad results, and will probably need to be scrubbed as time goes by
        $logResult = mysqli_query($dbhandle, "insert into stream(event_type_id, task_id, project_id, comment_id, is_new, date_created, event_initiator_id, target_user_id) values ('$event_type_id','$post_id','$project_id','$comment_id','1',UTC_DATE(),'$current_user_id', '0')");
    }

}