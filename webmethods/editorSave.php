<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 2/13/18
 * Time: 8:49 PM
 */

include('defaultConnector.php');



$title = '';
if(!empty($_GET['title']))
{
    $title = html_entity_decode($_GET['title']);
    $title = $msqli->real_escape_string($title);
}

$text = '';
if(!empty($_GET['text']))
{
    $text = html_entity_decode($_GET['text']);
    $text = $msqli->real_escape_string($text);
}




$current_user_id = $_COOKIE["userid"];
$UACresult = mysqli_query($dbhandle,"select users.user_status from users where users.user_id like '$current_user_id'");

$user_access_level = array();

while ($row = mysqli_fetch_array($UACresult, MYSQLI_ASSOC)) {

    array_push($user_access_level,
        array($row['user_status'])
    );

}

$QQ = '';

$alt = $user_access_level[0];
if ($alt[0] < 4) {
$QQ = "INSERT into editor(title, text) values ('$title','$text');";
//execute the SQL query and return records
    $result = mysqli_query($dbhandle, $QQ);

}
echo $QQ;