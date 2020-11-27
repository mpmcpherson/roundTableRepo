<?php
/**
 * Created by PhpStorm.
 * User: typhon
 * Date: 7/16/2015
 * Time: 9:33 PM
 */


include('defaultConnector.php');




$newQ = "UPDATE scrumdb_bastionsoftware.users SET sessionID = '4' WHERE user_id = '".$_SESSION['userid']."'";
$result = mysqli_query($dbhandle, $newQ);

unset($_COOKIE['PHPSESSID']);


$_SESSION['valid'] = 0;
$_SESSION['userid'] = NULL;
$_SESSION['username'] = NULL;
setcookie('userid', NULL, time() + 60 * 60 * 1, "/");
setcookie('sessionID', "invalidSessionUnset", time() - (60 * 60 * 8), "/");
setcookie('sessionID', $rnd, time() + 60 * 60 * 1, "/");



session_destroy();
