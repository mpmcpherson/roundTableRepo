<?php
/**
 * Created by PhpStorm.
 * User: typhon
 * Date: 11/15/2015
 * Time: 3:47 PM
 */


include('defaultConnector.php');


$user_id = '';
if(!empty($_GET['user_id']))
{
    $user_id = $_GET['user_id'];
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
if ($alt[0] < 3) {

//echo var_dump($_GET);
    var_dump($_GET);
    $query = "DELETE from scrumdb_bastionsoftware.project_ac where user_id = " . $user_id . " and project_id = " . $project_id;
    var_dump($query);
    $result = mysqli_query($dbhandle, $query);

    echo $result;

}