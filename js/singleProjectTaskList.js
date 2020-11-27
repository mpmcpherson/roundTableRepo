/**
 * Created by typhon on 11/3/2015.
 */

/**
 * Created by typhon on 4/2/2015.
 */


$('#add_task').mousedown(function(event) {
    switch (event.which) {
        case 1:
            if( event.target === this ){
                //toggleModalOn();
                //addTask();
            }
            break;
        case 2:

            break;
        case 3:

            break;
        default:
            alert('You have a strange Mouse!');
    }
});

$(document).ready(function(){

    loadNodes();

    setInterval(function(){loadNodes();},15000);

});


function writeData(outputText)
{
    var data = new FormData();
    data.append("data", outputText);
    var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
    xhr.open('post', '/path/to/php', true);
    xhr.send(data);
    xhr.close();
}

function loadNodes(data) {
    if(data != undefined) {
        //console.log(data);

    }
    /* handles the click event for link 1, sends the query*/
    var user_id = document.querySelector("#userIdField");
    var project_id = document.getElementById("projectIDformfield");

    var params = "user_id="+user_id.value + "&project_id="+project_id.value;
    //console.log(params);
    getRequest(
        'projectDetailTasks.php', // URL for the PHP file
        drawOutput,  // handle successful request
        drawError,    // handle error
        params
    );
    return false;

}


// handles drawing an error message
function drawError() {
    var container = document.getElementById('case');
    container.innerHTML = 'An error occurred while loading your project; please try again or contact support @ support@mpmcpherson.com';
}

// handles the response, adds the html
function drawOutput(responseText) {//this is going to need a ton of work

    $("#back_log").empty();
    $("#in_progress").empty();
    $("#done").empty();

    //console.log(responseText);
    var output = JSON.parse(responseText);
//console.log(output);
    for(var k = 0; k<output.length;++k)

    {
        //console.log(output[k]);
        loadTask(output[k][2], output[k][1], output[k][0]);
    }

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


function addTask(userID, projectID, task, taskInfo) {

    var params = "user_id="+userID+"&text="+task+"&project="+projectID+"&taskinfo='"+taskInfo+"'";

    if(task != "" && task != null) {
        getRequest(
            'addTask.php', // URL for the PHP file
            loadNodes,   // handle successful request
            drawError,      // handle error
            params
        );

    }

}


function loadTask(task, taskPosition, id) {

    var elem = document.getElementById(taskPosition);
    if(task != "" && taskPosition != null) {
        var newDiv = buildTaskNode(task, id);
        //console.log(newDiv);
        elem.appendChild(newDiv);//this is happening because I've wrapped my backlog div inside another div
                                 //I'm going to have to do some node traversal in order to get what I'm looking for.
    }

}



function moveTask(id, direction){

    var params = "post_id="+id+"&direction="+direction;
    console.log(params);
    getRequest(
        'moveTask.php', // URL for the PHP file
        loadNodes,   // handle successful request
        drawError,      // handle error
        params
    );
}



function deleteTask(id){


    var params = "post_id="+id;

    getRequest(
        'taskDelete.php', // URL for the PHP file
        loadNodes,   // handle successful request
        drawError,      // handle error
        params
    );


}



function buildTaskNode(task,id) {
    var newDiv = document.createElement("div");
    newDiv.id = id;
    newDiv.className = "taskID";
    var textChild = document.createTextNode(task);

    newDiv.appendChild(textChild);




    return newDiv;
}



function elementToObject(element) {
    var el = $(element);
    var o = {
        id: el.id,
        loc: el.parent.className
    };
    for (var i = 0; i < el.attributes.length; i++) {
        o[el.attributes[i].name] = el.attributes[i].value;
    }

    var children = el.childNodes;
    if (children.length) {
        o.children = [];

        for (var i=0; i < children.length; i++) {
            child = $(children[i]);
            o.children[i] = elementToObject(child, o.children) ;
        }
    }
    return o;
}


(function() {

    /**
     * Variables.
     */
    var taskItemClassName = 'taskID';
    var specificTaskID = "";
    var add_task_class = "add_task";
    var menu = document.querySelector(".context-menu");
    var modal = document.querySelector(".task_creation_modal");
    var menuState = 0;
    var modalState = 0;
    var activeClassName = "context-menu--active";
    var userid = document.querySelector("#userIdField");

    var contextMenuClassName = "context-menu";
    var contextMenuItemClassName = "context-menu__item";
    var contextMenuLinkClassName = "context-menu__link";
    var contextMenuActive = "context-menu--active";
    var modalMenuActive = "task_creation_modal--active";
    var modalMenuClassName = "modal_element";
    var modalTaskName = document.querySelector("#task_Title");
    var modalProjectName = document.querySelector("#projectSelector");
    var modalTaskinfo = document.querySelector("#taskText");

    var taskItemInContext;

    var clickCoords;
    var clickCoordsX;
    var clickCoordsY;


    var menuItems = menu.querySelectorAll(".context-menu__item");
    var menuWidth;
    var menuHeight;
    var menuPosition;
    var menuPositionX;
    var menuPositionY;

    var windowWidth;
    var windowHeight;







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


    function loadProjects() {
        /* handles the click event for the project dropdown in the modal, sends the query*/

        var user_id = document.querySelector("#userIdField");

        var params = "user_id="+user_id.value;

        //console.log(params);
        getRequest(
            'loadProjectList.php', // URL for the PHP file
            buildDropDown,  // handle successful request
            drawError,    // handle error
            params
        );
        return false;

    }

    function buildDropDown(responsetext)
    {

        var data = JSON.parse(responsetext);
        var dropDown = $(modalProjectName);
        dropDown.empty();


        for (var val in data){

            dropDown.append('<option value = '+data[val][0]+'>'+data[val][1]+'</option>');
            //console.log(data[val][0] + ": " + data[val][1]);
        }
        //this preselects the current project in the dropdown
        dropDown.val(document.getElementById('projectIDformfield').value);

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

        menu.style.position = 'absolute';

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
    function menuItemListener( link ) { //this is what I need to modify to get my menuclick actions



        if(link.id == "taskEdit") {
            var inp = document.getElementById('taskEditInput');
            inp.value = specificTaskID;
            document.forms['taskEditForm'].submit();
        }
        if(link.id == "advanceTask") {
            moveTask(specificTaskID, "1");

        }
        if(link.id == "regressTask") {
            moveTask(specificTaskID, "-1");

        }
        if(link.id == "deleteTask") {
            deleteTask(specificTaskID);

        }
        toggleMenuOff();
    }
    function modalItemListener( link ) { //this is what I need to modify to get my menuclick actions

        //console.log(link);

        if(link.id == "createTaskBtn") {


            var projectID = $( "#projectSelector option:selected").val();
            var taskName = modalTaskName.value;
            var taskInfo = "";//modalTaskinfo.value;
            var current_user_name = userid.value;


            addTask(current_user_name, projectID, taskName, taskInfo);

            $("#projectSelector").val($("#projectSelector option:first").val());

            modalTaskName.value = "";
            //modalTaskinfo.value = "";


            toggleModalOff();
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



            if ( taskItemInContext ) {
                specificTaskID = e.target.id;
                e.preventDefault();
                toggleMenuOn();
                positionMenu(e, menu);

            } else {
                taskItemInContext = null;
                toggleMenuOff();
            }
        });
    }

    /**
     * Listens for click events.
     */
    function localizeMenu(e, menu)
    {

        var todo = clickInsideElement(e, "back_log" );
        var local_done = clickInsideElement(e, "done" );
        if(todo) {
            $("#regressTask").parent().hide();
            $("#advanceTask").parent().show();

        }else if(local_done)
        {

            $("#regressTask").parent().show();
            $("#advanceTask").parent().hide();
        }else
        {

            $("#regressTask").parent().show();
            $("#advanceTask").parent().show();
        }

    }
    function clickListener() {
        document.addEventListener( "click", function(e) {

            var clickeElIsLink = clickInsideElement( e, contextMenuLinkClassName );

            var clickedElIsModal = clickInsideElement(e, modalMenuClassName);

            var taskItemInContext = clickInsideElement( e, taskItemClassName );

            var clickedAddTask = clickInsideElement(e, add_task_class);

            if ( clickeElIsLink ) {//IF THIS CLICK IS INSIDE THE MENU
                e.preventDefault();
                menuItemListener( clickeElIsLink );

            }
            else if (clickedElIsModal)
            {
                e.preventDefault();
                modalItemListener( clickedElIsModal );
            }
            else  if (taskItemInContext) {
                specificTaskID = e.target.id;
                e.preventDefault();
                toggleMenuOn();

                localizeMenu(e, menu);

                toggleModalOff();
                positionMenu(e, menu);

            } else if(clickedAddTask)
            {
                toggleModalOn();
                toggleMenuOff();

                positionMenu(e, modal);

                $( "#task_Title").focus();

                loadProjects();
            }
            else {
                taskItemInContext = null;
                toggleMenuOff();
                toggleModalOff();
            }
        });

    }

    /**
     * Listens for keyup events.
     */
    function keyupListener() {
        window.onkeyup = function(e) {
            if ( e.keyCode === 27 ) {
                toggleMenuOff();
            }
        }
    }

    /**
     * Turns the custom context menu on.
     */

    function toggleMenuOn() {
        if ( menuState !== 1 ) {
            menuState = 1;
            menu.classList.add( contextMenuActive );
        }
    }

    function toggleMenuOff() {
        if ( menuState !== 0 ) {
            menuState = 0;
            menu.classList.remove( contextMenuActive );
        }
    }

    /**
     * Turn on the add-task modal
     */


    function toggleModalOn() {
        if ( modalState !== 1 ) {
            modalState = 1;
            modal.classList.add( modalMenuActive );
        }
    }

    function toggleModalOff() {

        if ( modalState !== 0 ) {
            modalState = 0;
            modal.classList.remove( modalMenuActive );
        }
    }

    /**
     * Run the app.
     */
    init();

})();