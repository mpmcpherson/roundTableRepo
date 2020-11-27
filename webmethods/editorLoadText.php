<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 2/13/18
 * Time: 9:24 PM
 */

include('defaultConnector.php');

$newQ = '';

$text_id = '';
if(!empty($_GET['text_id']))
{
    $text_id = $_GET['text_id'];
}

    $userid = $_COOKIE["userid"];
    $sessionID = $_COOKIE["sessionID"];
    $statement = "select users.user_status from users where users.user_id like $userid  and users.sessionID like $sessionID";
    //echo json_encode($statement);
    $UACresult = mysqli_query($dbhandle, $statement);

    $user_access_level = array();

    while ($row = mysqli_fetch_array($UACresult, MYSQLI_ASSOC)) {
        array_push($user_access_level,
            array($row['user_status'])
        );
    }
    //echo json_encode($user_access_level);
    $alt = $user_access_level[0];



    if ($alt[0] < 4) {

        $newQ = "select text from editor where id = $text_id ";//build lazy loading later

        $result = mysqli_query($dbhandle, $newQ);

    }







$output = array();

//fetch tha data from the database
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {


    array_push($output, array($row['text']
        )
    );

}
//echo $output;
echo json_encode($output);