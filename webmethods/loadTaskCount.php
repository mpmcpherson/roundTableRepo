<?php
/**
 * Created by PhpStorm.
 * User: typhon
 * Date: 2/17/2016
 * Time: 6:24 PM
 */


include('defaultConnector.php');


$user_id = '';
if(!empty($_GET['user_id']))
{
    $user_id = $_GET['user_id'];
}


$result = mysqli_query($dbhandle, "select count(text), username from posts left join users on users.user_id = posts.assigned_user where user_id = '".$user_id."' group by username");

$output = array();

while ($row = mysqli_fetch_array($result, MYSQLI_BOTH)) {
     array_push($output,
         array($row[0], $row[1])
    );

}

//$row = mysqli_fetch_array($result, MYSQLI_ASSOC);

echo json_encode($output);
