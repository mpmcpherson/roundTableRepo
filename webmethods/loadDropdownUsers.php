<?php
/**
 * Created by PhpStorm.
 * User: typhon
 * Date: 8/7/2015
 * Time: 6:17 PM
 */


include('defaultConnector.php');


$post_id = '';
if(!empty($_GET['post_id']))
{
    $post_id= $_GET['post_id'];
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
if ($alt[0] < 4) {


    $result = mysqli_query($dbhandle, "SELECT users.username, users.user_id from users inner join posts on posts.assigned_user = users.user_id where posts.post_id = $post_id");

    $newResult = '';

    $output = array();

//fetch tha data from the database
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {

            array_push($output, array($row['username'], $row['user_id']
                )
            );

        }
    } else {

        array_push($output, array('No user ', '000'
            )
        );

    }
    $result = mysqli_query($dbhandle, "select DISTINCT users.username, users.user_id
                                        from project_ac
                                          inner join users on project_ac.user_id = users.user_id
                                          inner join posts on posts.project_id = project_ac.project_id
                                        where
                                          posts.status < 4
                                          AND
                                          posts.post_id = $post_id");

    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

        array_push($output, array($row['username'], $row['user_id']
            )
        );

    }
    echo json_encode($output);
}