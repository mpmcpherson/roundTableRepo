<?php
/**
 * Created by PhpStorm.
 * User: typhon
 * Date: 8/7/2015
 * Time: 5:11 PM
 */

include('defaultConnector.php');


$post_id = '';
if(!empty($_GET['post_id']))
{
    $post_id= $_GET['post_id'];
}

$result = mysqli_query($dbhandle,"SELECT * from posts left join task_info on task_info.post_id = posts.post_id left join status_key on status_key.id = posts.status where posts.post_id = '".$post_id."' ");

$newResult = '';

$output = array();

//fetch tha data from the database
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

    array_push($output, array($row['post_id'], $row['status_string'], $row['text'], $row['task_message']
        )
    );

}

echo json_encode($output);

