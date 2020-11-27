<?php
/**
 * Created by PhpStorm.
 * User: typhon
 * Date: 3/26/2016
 * Time: 4:24 PM
 */

include('defaultConnector.php');


$user_id = '';
if(!empty($_GET['user_id']))
{
    $user_id = $_GET['user_id'];
}

$current_user_id = $_COOKIE["userid"];

$q = "
select DISTINCT stream.stream_id, posts.text, projects.name, e.username as init, u.username as user, ek.event_type, stream.event_type_id
  from stream
    left join posts on posts.post_id = stream.task_id
    left join project_ac on project_ac.project_id = posts.project_id
    left join users u on u.user_id = stream.target_user_id
    left join users e on e.user_id = stream.event_initiator_id
    left join stream_event_type_key ek on ek.id = stream.event_type_id
    left join projects on projects.project_id = project_ac.project_id
  where stream.event_initiator_id like $user_id and ek.event_type not like 'null' order by stream.stream_id
  limit 50

";


$result = mysqli_query($dbhandle, $q);

$output = array();

while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
//posts.text, projects.name, e.username, u.username, ek.event_type, stream.event_type_id
    array_push($output, array($row['stream_id'], $row['text'], $row['name'], $row['init'], $row['user'], $row['event_type']
        )
    );

}
echo json_encode($output);