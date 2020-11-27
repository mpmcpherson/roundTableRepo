<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 2/12/18
 * Time: 5:31 PM
 */

include('defaultConnector.php');


$team_name = "";

if(!empty($_GET['team_name']))
{
    $team_name = $_GET['team_name'];
}



$current_user_id = $_COOKIE["userid"];
$UACresult = mysqli_query($dbhandle,"select users.user_status, users.organizational_unit from users where users.user_id like '$current_user_id'");

$user_access_level = array();

while ($row = mysqli_fetch_array($UACresult, MYSQLI_ASSOC)) {

    array_push($user_access_level,
        array($row['user_status'], $row['organizational_unit'])
    );

}


$alt = $user_access_level[0][0];
$OU = $user_access_level[0][1];

if ($alt[0] < 2) {


    $result = mysqli_query($dbhandle, "INSERT into team_name(team_name) VALUES ('$team_name')");


    //     $newRes = mysqli_query($dbhandle, "INSERT INTO `scrumdb_bastionsoftware`.`stream` (`event_type_id`,`task_id`,`project_id`,`comment_id`,`date_created`,`event_initiator_id`,`target_user_id`,`event_target_type_id`) VALUES( );");

    $newRes = mysqli_query($dbhandle, "INSERT INTO `scrumdb_bastionsoftware`.`stream` (`event_type_id`,`task_id`,`project_id`,`comment_id`,`date_created`,`event_initiator_id`,`target_user_id`,`event_target_type_id`) VALUES(15,-1,-1, -1, UTC_TIMESTAMP(), $current_user_id, -1 , 4);");



}