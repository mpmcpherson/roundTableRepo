<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 10/6/17
 * Time: 5:34 PM
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

        $qq = "select user_id, username, permission_level, company_name from users left join company on company.company_id = users.organizational_unit left join permissions_status_key on permissions_status_key.user_status_id = users.user_status where user_status > -1 and $alt[0] <= user_status and organizational_unit = $company[0] order by username";

        $result = mysqli_query($dbhandle, $qq);

        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            array_push($output, array($row['user_id'], $row['username'], $row['permission_level'], $row['company_name']));
        }
    }
}

echo json_encode($output);
