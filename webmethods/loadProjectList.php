<?php
/**
 * Created by PhpStorm.
 * User: typhon
 * Date: 8/30/2015
 * Time: 7:46 PM
 */

include('defaultConnector.php');



$user_id = '';
if(!empty($_GET['user_id']))
{
    $user_id = $_GET['user_id'];
}



if(!empty($_COOKIE['userid'])) {
    $userid = $_COOKIE["userid"];

    $UACresult = mysqli_query($dbhandle, "select users.user_status from users where users.user_id like '$userid'");

    $user_access_level = array();

    while ($row = mysqli_fetch_array($UACresult, MYSQLI_ASSOC)) {
        array_push($user_access_level,
            array($row['user_status'])
        );
    }

    $alt = $user_access_level[0];
    if ($alt[0] < 1) {
        $result = mysqli_query($dbhandle,"SELECT distinct projects.project_id, projects.name, projects.status_id from projects left join project_ac on project_ac.project_id = projects.project_id where projects.status_id<1");
    }else
    {
        $result = mysqli_query($dbhandle,"SELECT distinct projects.project_id, projects.name, projects.status_id from projects left join project_ac on project_ac.project_id = projects.project_id where projects.status_id<1 and project_ac.user_id like '".$user_id."'");
    }
}


//$result = mysql_query("SELECT projects.project_id, projects.name, projects.status_id from projects");


$output = array();

//fetch tha data from the database
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

    array_push($output,
                array($row['project_id'], $row['name'], $row['status_id'])
    );

}

echo json_encode($output);
