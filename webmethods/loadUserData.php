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
//$result = mysqli_query($dbhandle,"SELECT users.username, users.user_id from users left join user_assignment on user_assignment.user_id = users.user_id where user_assignment.post_id = $post_id");

$result = mysqli_query($dbhandle,"SELECT users.username, users.user_id from users inner join posts on posts.assigned_user = users.user_id where posts.post_id = $post_id");

$newResult = '';

$output = array();

//fetch tha data from the database
if(mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_array($result)) {

        array_push($output, array($row['username'], $row['user_id']
            )
        );

    }
}else
{

    array_push($output, array('No user ', '000'
        )
    );

}
$result = mysqli_query($dbhandle,"select DISTINCT users.username, users.user_id
from project_ac
  inner join users on project_ac.user_id = users.user_id
  inner join posts on posts.project_id = project_ac.project_id
where
  posts.status < 4
  AND
  posts.post_id = $post_id");

while ($row = mysqli_fetch_array($result)) {

    array_push($output, array($row['username'], $row['user_id']
        )
    );

}
echo json_encode($output);
