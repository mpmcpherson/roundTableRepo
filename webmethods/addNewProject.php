<?php
/**
 * Created by PhpStorm.
 * User: typhon
 * Date: 8/16/2015
 * Time: 11:43 PM
 */

include('defaultConnector.php');


$project = '';
if(!empty($_GET['project']))
{
    $text = html_entity_decode($_GET['project']);
    $project = $msqli->real_escape_string($text);
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


    $user_id = '';
    if (!empty($_GET['user_id'])) {
        $user_id = $_GET['user_id'];
    }


//execute the SQL query and return records
    $result = mysqli_query($dbhandle, "insert into scrumdb_bastionsoftware.projects(name, status_id, created_by_user_id, created_date) VALUES ('" . $project . "', 0, '" . $user_id . "',UTC_TIMESTAMP())");

    $newSelect = mysqli_query($dbhandle, "select project_id from scrumdb_bastionsoftware.projects where name = '" . $project . "' and created_by_user_id = '" . $user_id . "' order by created_date desc LIMIT 1");

    $project_id = "";

//fetch tha data from the database
    while ($row = mysqli_fetch_array($newSelect, MYSQLI_ASSOC)) {
        $project_id = $row['project_id'];

    }

    $result = mysqli_query($dbhandle, "INSERT into scrumdb_bastionsoftware.project_ac(user_id, project_id) values ('" . $user_id . "', '" . $project_id . "')");


    $newRes = mysqli_query($dbhandle, "INSERT INTO `scrumdb_bastionsoftware`.`stream` (`event_type_id`,`task_id`,`project_id`,`comment_id`,`date_created`,`event_initiator_id`,`target_user_id`,`event_target_type_id`) VALUES(10,-1,$project_id, -1, UTC_TIMESTAMP(), $current_user_id, -1, 2);");

}