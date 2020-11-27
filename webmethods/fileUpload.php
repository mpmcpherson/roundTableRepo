<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 2/4/18
 * Time: 1:10 PM
 */

include('defaultConnector.php');


//error_reporting(E_ALL | E_STRICT);
//require('UploadHandler.php');
//$upload_handler = new UploadHandler();

$testFile = array();

array_push($testFile, $_FILES['file']);



$handle = fopen("$testFile[2]", "r");

echo json_encode($testFile);



$user_id = '';
if(!empty($_GET['user_id']))
{
    $user_id = $_GET['user_id'];
}

$user = $_COOKIE["userid"];

//$result = mysqli_query($dbhandle, "insert into scrumdb_bastionsoftware.projectFileData(projectID, fileName, fileExtension, fileData, uploadedBy, versionNumber) values ('',$testFile[0],$testFile[1],$testFile,$user,0)");

