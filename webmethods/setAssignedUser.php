<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 2/11/18
 * Time: 2:04 PM
 */

include('defaultConnector.php');

$newQ = 'testing ';
$user_id = '';
if(!empty($_GET['user_id']))
{
    $user_id = $_GET['user_id'];
}

$task_id = '';
if(!empty($_GET['task_id']))
{
    $task_id= $_GET['task_id'];
}


    $userid = $_COOKIE["userid"];
    $sessionID = $_COOKIE["sessionID"];
    $statement = "select users.user_status from users where users.user_id like $userid  and users.sessionID like $sessionID";
    //echo json_encode($statement);
    $UACresult = mysqli_query($dbhandle, $statement);

    $user_access_level = array();

    while ($row = mysqli_fetch_array($UACresult, MYSQLI_ASSOC)) {
        array_push($user_access_level,
            array($row['user_status'])
        );
    }
    //echo json_encode($user_access_level);
    $alt = $user_access_level[0];



    if ($alt[0] < 1) {
        $newQ = $statement;
        //$result = mysqli_query($dbhandle,"SELECT distinct posts.post_id, status_key.status_string, posts.text from posts left join status_key on status_key.id = posts.status left join project_ac on project_ac.project_id = posts.project_id where posts.status <= '2'");
    } else {

        $newQ = "update posts set posts.assigned_user = $user_id where posts.post_id = $task_id";

        //echo json_encode("incorrectly parsed 'all'");
        $result = mysqli_query($dbhandle, $newQ);



    }





//echo $output;
echo json_encode("success");