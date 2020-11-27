<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 2/21/18
 * Time: 2:05 PM
 */

include('defaultConnector.php');

$event_type_id = " ";

$project_id = " ";

$team_id = '';
if(!empty($_GET['user_id']))
{
    $team_id = $_GET['user_id'];
}

$project_id = '';
if(!empty($_GET['project_id']))
{
    $project_id = $_GET['project_id'];
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
if ($alt[0] < 2) {

    $new_team_list = mysqli_query("SELECT user_id FROM team where id_team",MYSQLI_ASSOC);

    while ($row = mysqli_fetch_array($new_team_list, MYSQLI_ASSOC)) {
        //$row['user_id']
        $query = "delete from scrumdb_bastionsoftware.project_ac where user_id = " . $row['user_id'] . " and project_id =  " . $project_id ;

        $result = mysqli_query($dbhandle, $query);

        $current_user_id = $_COOKIE["userid"];


        $newRes = mysqli_query($dbhandle, "INSERT INTO `scrumdb_bastionsoftware`.`stream` (`event_type_id`,`task_id`,`project_id`,`comment_id`,`date_created`,`event_initiator_id`,`target_user_id`,`event_target_type_id`) VALUES(9,$post_id,$project_id, -1, UTC_TIMESTAMP(), $current_user_id, $user_id, 2);");

        $newRes2 = mysqli_query($dbhandle, "INSERT INTO `scrumdb_bastionsoftware`.`stream` (`event_type_id`,`task_id`,`project_id`,`comment_id`,`date_created`,`event_initiator_id`,`target_user_id`,`event_target_type_id`) VALUES(9,$post_id,$project_id, -1, UTC_TIMESTAMP(), $current_user_id, $user_id, 3);");

    }

//     $newRes = mysqli_query($dbhandle, "INSERT INTO `scrumdb_bastionsoftware`.`stream` (`event_type_id`,`task_id`,`project_id`,`comment_id`,`date_created`,`event_initiator_id`,`target_user_id`,`event_target_type_id`) VALUES( );");

    $newRes2 = mysqli_query($dbhandle, "INSERT INTO `scrumdb_bastionsoftware`.`stream` (`event_type_id`,`task_id`,`project_id`,`comment_id`,`date_created`,`event_initiator_id`,`target_user_id`,`event_target_type_id`) VALUES(20,$post_id,$project_id, -1, UTC_TIMESTAMP(), $current_user_id, null, 4);");


}