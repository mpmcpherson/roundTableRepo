<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 2/12/18
 * Time: 5:40 PM
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
if ($alt[0] <= 1 ) {

    if ($company != '') {

        $qq = "select * from team_name";

        $result = mysqli_query($dbhandle, $qq);

        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            array_push($output, array($row['id_team_name'], $row['team_name']));
        }
    }
}
else
    {
        if ($company != '') {

            $qq = "select id_team_name, team_name from team_name left join team on team.id_team_name = team_name.id_team_name where team.user_id = $current_user_id";

            $result = mysqli_query($dbhandle, $qq);

            while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
                array_push($output, array($row['id_team_name'], $row['team_name']));
            }
        }
    }

echo json_encode($output);
