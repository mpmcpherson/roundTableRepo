/**
 * Created by typhon on 8/7/2015.
 */


$(document).ready(function(){

    var inp = document.getElementById('taskEditInput');
    //console.log(inp.value);
    //console.log("document ready")
        //document.getElementById('userIDselector').addEventListener("change", function() {alert("changed");});
        //document.getElementById('userIDselector').appendChild(new Node);

    $("#taskTitle").empty();
    $("#userIDselector").empty();
    //$("#textBody").empty();

    loadTaskData(inp.value);
    loadTaskComments(inp.value);
    loadDropdownUsers(inp.value);


});




function loadTaskComments(id)
{
    var params = "post_id="+id;



    getRequest(
        'loadTaskComments.php', // URL for the PHP file
        buildInfoBox,  // handle successful request
        drawError,    // handle error
        params
    );
    return false;

}

function loadTaskData(id) {
    /* handles the click event for link 1, sends the query*/
    var params = "post_id="+id;

    //console.log("loadtask");
    getRequest(
        'loadTaskData.php', // URL for the PHP file
        drawOutput,  // handle successful request
        drawError,    // handle error
        params
    );
    return false;

}
function loadDropdownUsers(id) {
    /* handles the click event for link 1, sends the query*/
    var params = "post_id="+id;

    getRequest(
        'loadDropdownUsers.php', // URL for the PHP file
        buildDropDown,  // handle successful request
        drawError,    // handle error
        params
    );
    return false;

}
function buildDropDown(responsetext){
    var data = JSON.parse(responsetext);
    //console.log(responsetext);
    var dropDown = $("#userIDselector");

    if(data == undefined) {
        dropDown.append('<option value = "noAssignee">select a user</option>');
    }else {
        for (var val in data) {

            dropDown.append('<option value = ' + data[val][1] + '>' + data[val][0] + '</option>');
            //console.log(val + ": " + data[val]);
        }
    }

}

function buildInfoBox(responsetext){
    var data = JSON.parse(responsetext);

    //console.log(data);

    var notes = $(".existingNotes");
    notes.empty();
    //document.getElementById("textBody").value="";


    if(data == undefined) {

    }else {
        for (var val in data) {
            var newDiv = document.createElement("div");
            newDiv.className = "taskID";
            newDiv.id = data[val][1];
            newDiv.appendChild(document.createTextNode(data[val][0]));
            notes.append(newDiv);


        }
    }

}
// handles drawing an error message
function drawError() {

    var container = document.getElementById('case');
    container.innerHTML = 'An error occurred while loading your project; please try again or contact support @ support@mpmcpherson.com';
}



// handles the response, adds the html
function drawOutput(responseText) {
    var output = JSON.parse(responseText);
    var textChild = document.createTextNode(output[0][2]);
    var divID = document.createElement('div');
    divID.className = "col-xs-12";
    divID.appendChild(textChild);
    document.getElementById('taskTitle').appendChild(divID);
}





// helper function for cross-browser request object
function getRequest(url, success, error, params) {
    var req = false;
    try{
        // most browsers
        req = new XMLHttpRequest();
    } catch (e){
        // IE
        try{
            req = new ActiveXObject("Msxml2.XMLHTTP");
        } catch(e) {
            // try an older version
            try{
                req = new ActiveXObject("Microsoft.XMLHTTP");
            } catch(e) {
                return false;
            }
        }
    }
    if (!req) return false;
    if (typeof success != 'function') success = function () {};
    if (typeof error!= 'function') error = function () {};


    if(params != null){

        req.open("GET", url+"?"+params, true);

    }else {
        req.open("GET", url, true);
    }


    req.onreadystatechange = function(){
        if(req.readyState == 4) {
            return req.status === 200 ?
                success(req.responseText) : error(req.status);
        }
    };

    req.send(null);
    return req;
}




(function() {

    /**
     * Variables.
     */
    var taskItemClassName = 'projects';
    var specificTaskID = "";
    var menu = document.querySelector(".context-menu");
    var menuState = 0;
    var activeClassName = "context-menu--active";


    var contextMenuClassName = "comment_context-menu";
    var contextMenuItemClassName = "context-menu__item";
    var contextMenuLinkClassName = "context-menu__link";
    var activeContextMenuClass = "comment_context-menu--active";
    var contextMenuActive = 0;

    var taskItemInContext;

    var clickCoords;
    var clickCoordsX;
    var clickCoordsY;


    //var menuItems = menu.querySelectorAll(".context-menu__item");
    var menuWidth;
    var menuHeight;
    var menuPosition;
    var menuPositionX;
    var menuPositionY;

    var windowWidth;
    var windowHeight;


    var userAdd_modalProjectName = document.querySelector("#userIDSelector");
    var userAdd_modalMenuProjectID = 0;



    var save_btn = document.getElementsByClassName("saveButton");



    var selectedProjectID = 0;

    var selectedTaskID=0;

    "use strict";

    ///////////////////////////////////////
    ///////////////////////////////////////
    //
    // H E L P E R    F U N C T I O N S
    //
    ///////////////////////////////////////
    ///////////////////////////////////////

    function resizeListener() {
        window.onresize = function(e) {
            toggleMenuOff();
        };
    }

    function saveChanges() {

        //console.log("writing down comments...");
        save_comments();
        //console.log("writing down user");
        save_assignedUser();
        var inp = document.getElementById('taskEditInput');
        loadTaskComments(inp.value);

    }
    function save_comments(){
        var inp = document.getElementById('textBody');
        var pid = document.getElementById('taskEditInput');
        var params = "task_message="+inp.value+"&post_id="+pid.value;
        if(inp.value != '') {
            getRequest(
                'saveComments.php',
                buildDropDown,
                drawError,
                params
            );
        }
        return false;

    }

    function save_assignedUser(){
        var inp = document.getElementById('taskEditInput');
        var userID = document.getElementById('userIDselector');

        var params = "post_id="+inp.value+"&user_id="+ userID.value;
        //console.log(params);

        getRequest(
            'saveChanges.php', // URL for the PHP file
            buildDropDown,  // handle successful request
            drawError,    // handle error
            params
        );
        return false;

    }

    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }



    function buildDropDown(responsetext)
    {

        //var data = JSON.parse(responsetext);
        //var dropDown = $(userAdd_modalProjectName);
        //dropDown.empty();

       //(responsetext);

        //for (var val in data){
        //    dropDown.append('<option value = '+data[val][0]+'>'+data[val][1]+'</option>');

        //}

    }
    function getPosition(e) {
        var posx = 0;
        var posy = 0;

        if (!e) var e = window.event;

        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        } else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft +
                document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop +
                document.documentElement.scrollTop;
        }

        return {
            x: posx,
            y: posy
        }
    }
    function positionMenu(e, menu) {
        clickCoords = getPosition(e);
        clickCoordsX = clickCoords.x;
        clickCoordsY = clickCoords.y;

        menuWidth = menu.offsetWidth + 4;
        menuHeight = menu.offsetHeight + 4;

        windowWidth = window.innerWidth;
        windowHeight = $(document).height(); //window.innerHeight;

        if ( (windowWidth - clickCoordsX) < menuWidth ) {
            menu.style.left = windowWidth - menuWidth + "px";
        } else {
            menu.style.left = clickCoordsX + "px";
        }

        if ( (windowHeight - clickCoordsY) < menuHeight ) {
            menu.style.top = windowHeight - menuHeight + "px";
        } else {
            menu.style.top = clickCoordsY + "px";
        }
    }

    function clickInsideElement( e, className ) {

        var el = e.srcElement || e.target;

        if ( el.classList.contains(className) ) {

            return el;
        } else {
            while ( el = el.parentNode ) {
                if ( el.classList && el.classList.contains(className) ) {
                    return el;
                }
            }
        }

        return false;
    }
    ///////////////////////////////////////
    ///////////////////////////////////////
    //
    // C O R E    F U N C T I O N S
    //
    ///////////////////////////////////////
    ///////////////////////////////////////

    /**
     * Initialise our application's code.
     */
    function init() {
        contextListener();
        clickListener();
        keyupListener();
    }

    /**
     * Listens for contextmenu events.
     */

    function contextListener() {
        document.addEventListener( "contextmenu", function(e) {

            taskItemInContext = clickInsideElement( e, taskItemClassName );
            //console.log(taskItemClassName);
            //console.log(taskItemInContext);

            if ( taskItemInContext ) {
                specificTaskID = e.target.id;
                e.preventDefault();

                //positionMenu(e);
            } else {
                taskItemInContext = null;

            }
        });
    }

    /**
     * Listens for click events.
     */

    function clickListener() {
        document.addEventListener( "click", function(e) {

            var clickedSaveButton = clickInsideElement(e, "saveButton");
            var clickedComment = clickInsideElement(e,"taskID");
            var clickedDelete = clickInsideElement(e, "deleteComment");

            if(clickedSaveButton)
            {
                //time to save stuff here
                //alert("STEP ONE");
                saveChanges();
                document.getElementById("textBody").value="";
            }

            else  if (taskItemInContext) {
                specificTaskID = e.target.id;
                e.preventDefault();

                selectedProjectID = taskItemInContext.id;

                document.getElementById('projectIDformfield').value=selectedProjectID;

                positionMenu(e, menu);
                toggleContextMenuOff();

            }else if (clickedComment){
                e.preventDefault();

                selectedTaskID = e.target.id;
                toggleContextMenuOn();
                positionMenu(e, document.getElementById(contextMenuClassName));

            }else if (clickedDelete)
            {
                e.preventDefault();

                deleteComment(selectedTaskID);
            }
            else
            {
                toggleContextMenuOff();
                taskItemInContext = null;
                userAdd_modalMenuProjectID = 0;
            }

        });
    }

    function deleteComment(task_info_id)
    {
        var params = "task_info_id="+task_info_id;
        getRequest(
            'deleteComment.php', // URL for the PHP file
            reloadComments,   // handle successful request
            drawError,      // handle error
            params
        );
        toggleContextMenuOff();
    }

    function reloadComments()
    {
        var inp = document.getElementById('taskEditInput');
        loadTaskComments(inp.value);
    }

    /**
     * Listens for keyup events.
     */
    function keyupListener() {
        window.onkeyup = function(e) {
            if ( e.keyCode === 27 ) {
                toggleContextMenuOff();
            }
        }
    }


    function toggleContextMenuOn()
    {

        if(contextMenuActive !== 1)
        {
            contextMenuActive = 1;
            var doc = document.getElementById(contextMenuClassName);
            doc.classList.add(activeContextMenuClass);




        }
    }
    function toggleContextMenuOff()
    {
        if(contextMenuActive !== 0)
        {
            contextMenuActive = 0;
            document.getElementById(contextMenuClassName).classList.remove(activeContextMenuClass);

        }
    }

    setInterval(function(){reloadComments();},15000);
    /**
     * Run the app.
     */
    init();
})();