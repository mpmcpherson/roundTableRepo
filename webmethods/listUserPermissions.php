<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 2/12/18
 * Time: 12:47 PM
 */

include('defaultConnector.php');

$current_user_id = $_COOKIE["userid"];
$UACresult = mysqli_query($dbhandle,"select users.user_status, users.organizational_unit from users where users.user_id like '$current_user_id'");

$user_access_level = array();
$company = array();

while ($row = mysqli_fetch_array($UACresult, MYSQLI_ASSOC)) {

    array_push($user_access_level,
        array($row['user_status'])
    );

    array_push($company,
        array($row['organizational_unit'])
    );

}

$output = array();
$alt = $user_access_level[0];
$company = $company[0];
if ($alt[0] < 4 ) {

    if ($company != '') {

        $qq = "select * from permissions_status_key where user_status_id > 0 ";

        $result = mysqli_query($dbhandle, $qq);

        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            array_push($output, array($row['permission_status_key_id'], $row['user_status_id'], $row['permission_level']));
        }
    }
}

echo json_encode($output);
