<?php
/**
 * Created by PhpStorm.
 * User: typhon
 * Date: 9/13/2015
 * Time: 4:21 PM
 */

include('defaultConnector.php');




$user_id = '';
if(!empty($_GET['user_id']))
{
    $user_id = $_GET['user_id'];
}

if(!empty($_COOKIE["userid"])) {
    $userid = $_COOKIE["userid"];

    $UACresult = mysqli_query($dbhandle, "select users.user_status, users.organizational_unit from users where users.user_id like '$userid'");

    $user_access_level = array();

    while ($row = mysqli_fetch_array($UACresult, MYSQLI_ASSOC)) {
        array_push($user_access_level,
            array($row['user_status'], $row['organizational_unit'])
        );
    }

    $alt = $user_access_level[0][0];
    $OU = $user_access_level[0][1];

    if ($alt[0] < 3) {
        if($alt[0] < 1)
        {
            $result = mysqli_query($dbhandle, "select distinct username, users.user_id from users where username not like 'null' and users.user_id not like 'null' and users.user_status > -1");
        }else {
            $result = mysqli_query($dbhandle, "select distinct username, users.user_id from users where username not like 'null' and users.user_id not like 'null' and users.user_status > -1 and users.organizational_unit = $OU");
        }
        $output = array();

//fetch tha data from the database
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

            array_push($output,
                array($row['user_id'], $row['username'])
            );

        }

        echo json_encode($output);
    }
}