<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 2/27/17
 * Time: 6:00 PM
 */

require('phpass03/PasswordHash.php');
include('defaultConnector.php');


$trysessionid = "";

if(!empty($_GET['sessionID']))
{
    $trysessionid  = $_GET['sessionID'];
}

$userid = "";

if(!empty($_GET['userid']))
{
    $userid = $_GET['userid'];
}

$result = mysqli_query($dbhandle,"SELECT sessionID from users where user_id like '$userid'");

$sessionID = "";

//fetch tha data from the database
while ($row = mysqli_fetch_array($result)) {
    $sessionID = $row['sessionID'];
}
$out = "userid: $userid passed_in_id:  $trysessionid  result_id: $sessionID";
echo json_encode($out);

//return json_encode("$trysessionid : $sessionID");