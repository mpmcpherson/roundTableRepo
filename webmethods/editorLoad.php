<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 2/13/18
 * Time: 8:49 PM
 */

include('defaultConnector.php');

$newQ = '';

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



    if ($alt[0] < 4) {

        $newQ = "select id, title from editor";//build lazy loading later

        $result = mysqli_query($dbhandle, $newQ);

    }







$output = array();

//fetch tha data from the database
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {


    array_push($output, array($row['id'], $row['title']
        )
    );

}
//echo $output;
echo json_encode($output);
//echo json_encode($result);
//echo "SELECT * from posts left join status_key on status_key.id = posts.status left join project_ac on project_ac.project_id = posts.project_id where posts.status <= '2' and project_ac.user_id = ".$user_id." ";
