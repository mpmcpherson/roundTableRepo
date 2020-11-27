<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 9/13/17
 * Time: 6:05 PM
 */

include('defaultConnector.php');



$sessionID = '';
if(!empty($_GET['sessionID']))
{
    $sessionID = $_GET['sessionID'];
}

$user_id = '';
if(!empty($_GET['user_id']))
{
    $user_id = $_GET['user_id'];
}



//execute the SQL query and return records
$result = mysqli_query($dbhandle, "SELECT company_id, company_name, dateCreated, dateActivated, dateDeactivated FROM scrumdb_bastionsoftware.company;");

$output = array();

//fetch tha data from the database
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {


    array_push($output, array($row['company_id'], $row['company_name'], $row['dateCreated'], $row['dateActivated'], $row['dateDeactivated']
        )
    );

}
//echo $output;
echo json_encode($output);
