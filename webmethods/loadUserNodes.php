<?php
/**
 * Created by PhpStorm.
 * User: typhon
 * Date: 10/4/2015
 * Time: 4:09 PM
 */

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



$user_id = '';
if(!empty($_GET['user_id']))
{
    $user_id = $_GET['user_id'];
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
if ($alt[0] < 4) {
    if($alt[0] < 1)
    {
        $result = mysqli_query($dbhandle, "select users.user_id, users.username, projects.project_id, projects.name from project_ac left join users on project_ac.user_id = users.user_id left join projects on project_ac.project_id = projects.project_id where users.user_id not like 'null'  and users.username not like 'null' and projects.project_id not like 'null' and projects.name not like 'null'");
    }else {
        $result = mysqli_query($dbhandle, "select users.user_id, users.username, projects.project_id, projects.name from project_ac left join users on project_ac.user_id = users.user_id left join projects on project_ac.project_id = projects.project_id where users.user_id not like 'null'  and users.username not like 'null' and projects.project_id not like 'null' and projects.name not like 'null' and users.organizational_unit = $OU");
    }






    $output = array();


    while ($row = mysqli_fetch_array($result)) {

        array_push($output,
            array($row['project_id'], $row['name'], $row['user_id'], $row['username'])
        );

    }

    echo json_encode($output);
}