<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 5/20/18
 * Time: 8:25 PM
 */

include('defaultConnector.php');


$team_id = " ";
$target_user_id = " ";


$team_id = '';
if(!empty($_GET['team_id']))
{
    $team_id  = $_GET['team_id'];
}

//echo json_encode($team_id);

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

    $current_user_id = $_COOKIE["userid"];

    $currentMembers = array();

    $req = "select team_name.id_team_name, team_name, users.user_id, username from team_name left join team on team_name.id_team_name = team.id_team_name left join users on users.user_id = team.user_id where team_name.id_team_name = $team_id and team.active=1";


    $reqResult = mysqli_query($dbhandle, $req);

    while($row = mysqli_fetch_array($reqResult, MYSQLI_ASSOC))
    {
        array_push($currentMembers,
            array($row['id_team_name'], $row['team_name'], $row['user_id'], $row['username']));

    }

    echo json_encode($currentMembers);

    /* no energy for this today

        $newRes = mysqli_query($dbhandle, "INSERT INTO `scrumdb_bastionsoftware`.`stream` (`event_type_id`,`task_id`,`project_id`,`comment_id`,`date_created`,`event_initiator_id`,`target_user_id`,`event_target_type_id`) VALUES(8,$post_id,$project_id, -1, UTC_TIMESTAMP(), $current_user_id, $user_id, 2);");

        $newRes2 = mysqli_query($dbhandle, "INSERT INTO `scrumdb_bastionsoftware`.`stream` (`event_type_id`,`task_id`,`project_id`,`comment_id`,`date_created`,`event_initiator_id`,`target_user_id`,`event_target_type_id`) VALUES(8,$post_id,$project_id, -1, UTC_TIMESTAMP(), $current_user_id, $user_id, 3);");
    */

}