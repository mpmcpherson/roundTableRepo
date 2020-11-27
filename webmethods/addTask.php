<?php
/**
 * Created by PhpStorm.
 * User: typhon
 * Date: 5/23/2015
 * Time: 5:24 PM
 */
include('defaultConnector.php');



$project = '';
if(!empty($_GET['project']))
{
    $project = $_GET['project'];
}

$text = '';
if(!empty($_GET['text']))
{
    $text = html_entity_decode($_GET['text']);
    $text = $msqli->real_escape_string($text);
}

$user_id = '';
if(!empty($_GET['user_id']))
{
    $user_id = $_GET['user_id'];
}


$taskInfo = '';
if(!empty($_GET['taskinfo']))
{
    $taskInfo = html_entity_decode($_GET['taskinfo']);
    $taskInfo = $msqli->real_escape_string($taskInfo);
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

//execute the SQL query and return records
    $result = mysqli_query($dbhandle, "INSERT into posts(project_id, text, creator_user_id, status, created_date) values ('$project','$text','$user_id',0, UTC_TIMESTAMP());");

    $last_id = "id is: " . $dbhandle->insert_id;

//$logResult = mysqli_query($dbhandle, "insert into scrumdb_bastionsoftware.stream(event_type_id, task_id, project_id, comment_id, is_new, date_created, event_initiator_id) values ($event_type_id,$task_id,$project_id,$comment_id,1,UTC_DATE(),$event_initiator_id)");


    $newSelect = mysqli_query($dbhandle, "select post_id from posts where project_id = '$project' and text = '$text' and creator_user_id = '$user_id' order by post_id desc LIMIT 1");

    $post_id = "";

    while ($row = mysqli_fetch_array($newSelect, MYSQLI_ASSOC)) {


        $post_id = ($row['post_id']);

    }

//     $newRes = mysqli_query($dbhandle, "INSERT INTO `scrumdb_bastionsoftware`.`stream` (`event_type_id`,`task_id`,`project_id`,`comment_id`,`event_initiator_id`,`target_user_id`,`event_target_type_id`) VALUES( );");

    $newRes = mysqli_query($dbhandle, "INSERT INTO `scrumdb_bastionsoftware`.`stream` (`event_type_id`,`task_id`,`project_id`,`comment_id`,`date_created`,`event_initiator_id`,`target_user_id`,`event_target_type_id`) VALUES(4,$post_id,$project, -1, UTC_TIMESTAMP(), $current_user_id, -1, 1);");


//fetch tha data from the database
    /*
     *Removed for v1.0*/
//return $last_id;
    /**/
    $result = mysqli_query($dbhandle, "INSERT into task_info(post_id, task_message) values ($post_id, $taskInfo)");


    $output = array();

//fetch tha data from the database
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {


        array_push($output, array($row['post_id'], $row['status_string'], $row['text']
            )
        );

    }
//echo $output;
    echo json_encode($output);
}