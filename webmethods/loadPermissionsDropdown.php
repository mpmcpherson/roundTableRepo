<?php
/**
 * Created by PhpStorm.
 * User: typhon
 * Date: 2/10/2016
 * Time: 2:41 PM
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
    $result = "";
    $alt = $user_access_level[0];


    $output = array();
    $result = mysqli_query($dbhandle,"select user_status_id, permission_level from users left join permissions_status_key on permissions_status_key.user_status_id = users.user_status where user_id = $user_id");
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

        array_push($output, array($row['permission_level'], $row['user_status_id']
            )
        );
    }


    if ($alt[0] < 1) {

        $result = mysqli_query($dbhandle,"SELECT * from permissions_status_key");
    }else
    {
        $result = mysqli_query($dbhandle,"SELECT user_status_id, permission_level from permissions_status_key where permissions_status_key.user_status_id >= '1'");

    }


    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

        array_push($output, array($row['permission_level'], $row['user_status_id']
            )
        );

    }
    echo json_encode($output);


}
