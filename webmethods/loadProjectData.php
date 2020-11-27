<?php
/**
 * Created by PhpStorm.
 * User: typhon
 * Date: 8/7/2015
 * Time: 6:17 PM
 */



 if(session_status() == PHP_SESSION_NONE) {     session_start(); }



include("header.php");


$_POST['current_page'] = $_SERVER['REQUEST_URI'];



if($_COOKIE['userid']!=null){
    $myVal = $_POST['taskEditInputValue'];
    echo "<form name='taskEditForm'  method='post' action='taskEdit.php'> <input id = 'taskEditInput' class = 'proForma' type='text' value='$myVal'/> </form>";

    echo "<div id='case'>";
    echo "<div id = 'editContainer'>";
    echo "<br />";
    echo "<div id = 'taskTitle'> </div>";
    echo "<br />";
    echo "<div class='userSelector'>

            <select id ='userIDselector'>

            </select> is currently working on this.
          </div>";
    echo "<div class='notes'>Notes and instructions regarding the task: </div>";
    echo "<br />";
    echo "<textarea id='textBody'></textarea>";
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