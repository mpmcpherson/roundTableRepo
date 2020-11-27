<?php
/**
 * Created by PhpStorm.
 * User: typhon
 * Date: 4/22/2015
 * Time: 4:45 PM
 */

require('PasswordHash.php');
include('defaultConnector.php');


$password = "";

if(!empty($_GET['password']))
{
    $password = $_GET['password'];
}

$user_name = "";

if(!empty($_GET['username']))
{
    $user_name = $_GET['username'];
}

$result = mysqli_query($dbhandle,"SELECT pw_hash, user_id, user_status, sessionID from users where username like '$user_name'");


//echo "SELECT pw_hash, user_id, user_status from users where username like '$user_name'";


$newResult = '';
$userid = '';
$user_status = '';
$sessionID = '';

//echo var_dump($_GET).var_dump($result);

//fetch tha data from the database
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    $newResult = $row['pw_hash'];
    $userid = $row['user_id'];
    $user_status = $row['user_status'];
    $sessionID = $row['sessionID'];//echo var_dump($row);
}



$pwdHasher = new PasswordHash(8,false);

if($_COOKIE['sessionID'] != $sessionID || empty($_COOKIE['sessionID']) || empty($sessionID) )
{
    $userNotValid = true;

}//see if the session is any good

$rettext = "nope";


if($user_status > -1 && $userNotValid) { //if the user is valid but the session ID is no good
    if ($pwdHasher->CheckPassword($password, $newResult)) { // if the pasword passes...
        $rnd=rand(); //set up a new session, and reset all our cookies to use the new session
        $_SESSION['valid'] = 1;
        $_SESSION['userid'] = $userid;
        $_SESSION['username'] = $user_name;
        setcookie('userid', $userid, time() + 60 * 60 * 1, "/");
        setcookie('sessionID', "invalidSessionUnset", time() - (60 * 60 * 8), "/");
        setcookie('sessionID', $rnd, time() + 60 * 60 * 1, "/");
        $newQ = "UPDATE scrumdb_bastionsoftware.users SET sessionID = ".$rnd." WHERE user_id = '".$_SESSION['userid']."'";
        $result = mysqli_query($dbhandle, $newQ);
        //echo json_encode($rettext);

        echo json_encode("0"); //success

    } else { //user not valid and session ID no good
        echo json_encode("1"); //failure //this should instead start logging things on the back end
    }
}

