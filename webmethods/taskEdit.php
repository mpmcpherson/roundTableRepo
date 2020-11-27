<?php
/**
 * Created by PhpStorm.
 * User: typhon
 * Date: 8/6/2015
 * Time: 6:45 PM
 */

 if(session_status() == PHP_SESSION_NONE) {     session_start(); }


include("header.php");
include("comment_modal.php");

$_GET['current_page'] = $_SERVER['REQUEST_URI'];



if($_COOKIE['userid']!=null){
    $myVal = $_GET['taskEditInputValue'];
    echo "<form name='taskEditForm'  method='get' action='taskEdit.php'> <input id = 'taskEditInput' class = 'proForma' type='text' value='$myVal'/> </form>";

    echo "<div id='case'>";
    echo "<div id = 'editContainer container-fluid'>";
    echo "<br />";
    echo "<div id = 'taskTitle' class = 'col-xs-offset-1 col-md-offset-1 col-lg-offset-1 col-md-9 col-xs-9 col-lg-9 text-center'> </div>";
    echo "<br />";
    echo "<br />";


    echo "<div class='userSelector col-xs-offset-1 col-md-offset-1 col-lg-offset-1 col-md-9 col-xs-9 col-lg-9'>

            <select id ='userIDselector'>

            </select> currently assigned.
          </div>";
    echo "<div class='container-fluid existingNotes col-xs-offset-1 col-lg-offset-1 col-xs-9 col-lg-9'>";
    echo "<br />";
    echo "<div class='notes'></div>";
    echo "<br /><br />";
    echo "</div>";
    echo "<textarea id='textBody' class='textBody col-xs-offset-1 col-lg-offset-1 col-xs-9 col-lg-9' style='buffer-bottom: 30px;'></textarea>";
    echo "<br />";
    echo "<br />";
    echo "<div class = 'saveButton btn col-xs-offset-1 col-lg-offset-1 col-xs-9 col-lg-9' style='margin-top: 8px; buffer-bottom: 15px;'> SAVE <div class = 'col-xs-offset-1 col-lg-offset-1 col-xs-9 col-lg-9' style='margin-top: 8px;'></div></div>";


    echo "<br />";
    echo "<br />";
    echo "</div>";

    echo "</div>";


}else
{
    include("login.php");


}


include("footer.php");

echo "<script type='text/javascript' src='../js/taskEditScript.js'></script>";
echo"</body>";
echo"</html>";