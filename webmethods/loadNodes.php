<?php
/**
 * Created by PhpStorm.
 * User: typhon
 * Date: 3/25/2015
 * Time: 7:46 PM
 */

include('defaultConnector.php');

$newQ = '';
$user_id = '';
if(!empty($_GET['user_id']))
{
    $user_id = $_GET['user_id'];
}
$sessionID = '';
if(!empty($_GET['session_id']))
{
    $sessionID = $_GET['session_id'];
}

$project_id = '';
if(!empty($_GET['project_id']))
{

    $project_id = $_GET['project_id'];
}


if(!empty($_GET['user_id'])) {
    $userid = $_COOKIE["userid"];
    $statement = "select users.user_status from users where users.user_id like $user_id  and users.sessionID like $sessionID";
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
        //$result = mysqli_query($dbhandle,"SELECT distinct posts.post_id, status_key.status_string, posts.text from posts left join status_key on status_key.id = posts.status left join project_ac on project_ac.project_id = posts.project_id where posts.status <= '2'");
    }else
    {
        if($project_id == "all")
        {
            $newQ = "SELECT distinct posts.post_id, status_key.status_string, posts.text from posts left join projects on projects.project_id = posts.project_id left join status_key on status_key.id = posts.status left join hiddenProjects on hiddenProjects.projectId = posts.project_id left join project_ac on project_ac.project_id = posts.project_id where posts.status <= '2' and project_ac.user_id like '" . $user_id . "' and projects.isActive = '1' and (((hiddenProjects.isHidden='0' and hiddenProjects.userId='".$user_id."') || (hiddenProjects.isHidden=1 and hiddenProjects.userId='".$user_id."' and isOverridden='1')) || hiddenProjects.userId is NULL)";
            //echo json_encode("correctly parsed 'all'");
            $result = mysqli_query($dbhandle, $newQ);
        }else
        {
            $newQ = "SELECT distinct posts.post_id, status_key.status_string, posts.text from posts left join projects on projects.project_id = posts.project_id left join status_key on status_key.id = posts.status left join hiddenProjects on hiddenProjects.projectId = posts.project_id left join project_ac on project_ac.project_id = posts.project_id where posts.status <= '2' and project_ac.user_id like '" . $user_id . "' and project_ac.project_id like '" . $project_id . "' and projects.isActive = '1' and (((hiddenProjects.isHidden='0' and hiddenProjects.userId='".$user_id."') || (hiddenProjects.isHidden=1 and hiddenProjects.userId='".$user_id."' and isOverridden='1')) || hiddenProjects.userId is NULL)";
            //echo json_encode("incorrectly parsed 'all'");
            $result = mysqli_query($dbhandle, $newQ);
        }
    }
}






$output = array();
// Debugging for irregular show-project behavior
/*  if($project_id == "all") {
    array_push($output, array($newQ, "DEBUGGING", "DEBUGGING"
        )
    );
}
*/
//fetch tha data from the database
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {


    array_push($output, array($row['post_id'], $row['status_string'], $row['text']
                             )
              );

}
//echo $output;
echo json_encode($output);
//echo json_encode($result);
//echo "SELECT * from posts left join status_key on status_key.id = posts.status left join project_ac on project_ac.project_id = posts.project_id where posts.status <= '2' and project_ac.user_id = ".$user_id." ";