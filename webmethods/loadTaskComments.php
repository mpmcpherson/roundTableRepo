<?php
/**
 * Created by PhpStorm.
 * User: typhon
 * Date: 12/6/2015
 * Time: 9:37 PM
 */


include('defaultConnector.php');


$post_id = '';
if(!empty($_GET['post_id']))
{
    $post_id= $_GET['post_id'];
}
$result = mysqli_query($dbhandle,"SELECT task_info.task_message, task_info.task_info_id from task_info where task_info.post_id = $post_id and task_info.status = 1");



$output = array();

array_push($output, array('','',$post_id));

//fetch tha data from the database
if(mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

        array_push($output, array($row['task_message'], $row['task_info_id'], $post_id
            )
        );

    }
}

echo json_encode($output);