<?php
/**
 * Created by PhpStorm.
 * User: typhon
 * Date: 3/25/2015
 * Time: 8:29 PM
 */
if(!empty($_POST['data'])){
    $data = $_POST['data'];
    $fname = mktime() . "Node.txt";//generates random name

    $file = fopen("savedTasks/".$fname, 'w');//creates new file
    fwrite($file, $data);
    fclose($file);
}