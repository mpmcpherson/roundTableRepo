<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 2/15/18
 * Time: 5:12 PM
 */
include('defaultConnector.php');

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

        $result = mysqli_query($dbhandle, "select distinct email from users where users.user_id = $userid");

        $output = array();

//fetch tha data from the database
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

            array_push($output,
                array($row['email'])
            );

        }

        echo json_encode($output);
    }
}