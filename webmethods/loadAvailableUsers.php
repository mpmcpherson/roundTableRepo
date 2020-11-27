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

$current_user_id = $_COOKIE["userid"];
$UACresult = mysqli_query($dbhandle,"select users.user_status, users.organizational_unit from users where users.user_id like '$current_user_id'");

$user_access_level = array();

while ($row = mysqli_fetch_array($UACresult, MYSQLI_ASSOC)) {

    array_push($user_access_level,
        array($row['user_status'], $row['organizational_unit'])
    );

}


$alt = $user_access_level[0];
if ($alt[0] < 2) {

    $current_user_id = $_COOKIE["userid"];

    $currentMembers = array();
    $allMembers = array();

    $req = "select users.user_id, username from users  where users.organizational_unit = $alt[1] and user_status > 0";


    $reqResult = mysqli_query($dbhandle, $req);

    while($row = mysqli_fetch_array($reqResult, MYSQLI_ASSOC))
    {
        array_push($allMembers,
            array($row['user_id'], $row['username']));

    }

    $req2 = "select team.user_id from team where id_team_name =$team_id";

    $reqResult = mysqli_query($dbhandle, $req2);

    while($row = mysqli_fetch_array($reqResult, MYSQLI_ASSOC))
    {
        array_push($currentMembers,
            array($row['user_id']));

    }

    $returnAry = array();

    foreach($allMembers as $value)
    {
        if(!in_array($value[0], $currentMembers[0]))
        {
            array_push($returnAry, $value);
        }
    }




    echo json_encode($returnAry);

    /* no energy for this today

        $newRes = mysqli_query($dbhandle, "INSERT INTO `scrumdb_bastionsoftware`.`stream` (`event_type_id`,`task_id`,`project_id`,`comment_id`,`date_created`,`event_initiator_id`,`target_user_id`,`event_target_type_id`) VALUES(8,$post_id,$project_id, -1, UTC_TIMESTAMP(), $current_user_id, $user_id, 2);");

        $newRes2 = mysqli_query($dbhandle, "INSERT INTO `scrumdb_bastionsoftware`.`stream` (`event_type_id`,`task_id`,`project_id`,`comment_id`,`date_created`,`event_initiator_id`,`target_user_id`,`event_target_type_id`) VALUES(8,$post_id,$project_id, -1, UTC_TIMESTAMP(), $current_user_id, $user_id, 3);");
    */

}