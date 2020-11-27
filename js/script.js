/**
 * Created by typhon on 1/30/2015.
 */


$(document).ready(function(){

    var shibe = "<?php echo json_encode(file_get_contents('http://api.duckduckgo.com/?q=simpsons+characters&format=json&pretty=1'))?>";
    console.log(shibe.toString());
});
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}