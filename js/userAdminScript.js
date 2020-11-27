/**
 * Created by typhon on 9/13/2015.
 */




$(document).ready(function(){

    loadNodes();

});

function reloading(){
    window.location.reload();

}

function loadNodes() {
    /* handles the click event for link 1, sends the query*/
    var user_id = document.querySelector("#userIdField");

    //var params = "user_id="+user_id.value;

    getRequest(
        'loadUserList.php', // URL for the PHP file
        drawOutput,  // handle successful request
        drawError,    // handle error
        null//params
    );
    return false;

}

// handles drawing an error message
function drawError(results) {
    var container = document.getElementById('case');
    container.innerHTML = 'An error occurred while loading your project; please try again or contact support @ support@mpmcpherson.com';
}

// handles the response, adds the html
function drawOutput(responseText) {//this is going to need a ton of work
    //console.log(responseText);


    var container = document.getElementById('case');
    while(container.firstChild)
    {
        container.removeChild(container.firstChild);
    }
    var div = document.createElement('div');
    div.className = "col-lg-offset-6 col-md-offset-6 col-sm-offset-6 col-xs-offset-6 col-lg-6 col-md-6 col-sm-6 col-xs-6";
    container.appendChild(div);


    var output = JSON.parse(responseText);
    for(var i = 0; i<output.length;++i)
    {

        loadUsers(output[i][0], output[i][1]);
    }

}

// helper function for cross-browser request object
function getRequest(url, success, error, params) {
    var req = false;
    try{
        // most browsers
        req = new XMLHttpRequest();
        //console.log(req);
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



function loadUsers(id, name) {

    var elem = document.getElementById('case');
    if(name != "") {
        var newDiv = buildProjectNode(name, id);
        newDiv.className = "users projects col-lg-2 col-md-2 col-sm-4 col-xs-12 offset";

        elem.appendChild(newDiv);
    }

}

function createUser(username, password, email) {

    var params = "user_name="+username+"&password="+password+"&email="+email;
    //console.log(params);
    if(password != "" && password != null && email != null) {
        getRequest(
            'createNewUser.php', // URL for the PHP file
            loadNodes,   // handle successful request
            drawError,      // handle error
            params
        );


    }

}


function buildProjectNode(project,id) {
    var newDiv = document.createElement("div");
    newDiv.id = project+id;
    newDiv.className = "projects";
    var textChild = document.createTextNode(project);

    newDiv.appendChild(textChild);


    return newDiv;
}


(function() {

    /**
     * Variables.
     */
    var taskItemClassName = 'addUserToProject';
    var specificTaskID = "";
    var menu = document.querySelector(".user_context-menu"); //this is why the menu isn't correctly placing itself. Obviously.
    var menuState = 0;

    var contextMenuItemClassName = "user_context-menu__item";
    var contextMenuLinkClassName = "user_context-menu__link";
    var contextMenuActive = "user_context-menu--active";

    var taskItemInContext;

    var clickCoords;
    var clickCoordsX;
    var clickCoordsY;

    var clickedUser = "";

    var menuWidth;
    var menuHeight;

    var windowWidth;
    var windowHeight;

    var modal = document.querySelector(".user_creation_modal");
    var modalState = 0;
    var modalMenuActive = "user_creation_modal--active";

    var usersClass = "users";





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
        windowHeight = $(document).height();//window.innerHeight;

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
        //console.log( "Task ID - " +
        //    specificTaskID +
        //    ", Task action - " + link.getAttribute("data-action"));
        //console.log(link.indexOf("taskEdit"));

        if(link.id == "projectView") {
            var inp = document.getElementById('projectEditForm');
            inp.value = specificTaskID;
            document.forms['projectEditForm'].submit();
        }
        if(link.id == "projectTaskAdd") {
            moveTask(specificTaskID);
            //console.log(specificTaskID);
        }
        if(link.id == "projectDelete") {
            deleteTask(specificTaskID);
            //console.log(specificTaskID);
        }
        toggleMenuOff();
    }



    function modalItemListener( link ) { //this is what I need to modify to get my menuclick actions

        if(link.id == "createUserBtn") {

            var email = document.getElementsByClassName("email").email;
            var username = document.getElementsByClassName("userName").user_name;
            var passwordField = document.getElementsByClassName('password').password;

            if(email.value != "" && username.value != "" && passwordField.value != "") {
                createUser(username.value, passwordField.value, email.value);
            }

            username.value = "";
            passwordField.value = "";
            email.value = "";

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

    function clickListener() {
        document.addEventListener( "click", function(e) {
            var clickeElIsLink = clickInsideElement( e, contextMenuLinkClassName );
            var clickedElIsModal = clickInsideElement(e, "createUserBtn");
            var userCreationClick = clickInsideElement( e, taskItemClassName );
            var userMenuSelector = clickInsideElement(e, usersClass);
            var clickedUserAddNonResponsiveArea = clickInsideElement(e, contextMenuItemClassName);
            var clickedUserDetails = clickInsideElement(e, "userDetails");
            var clickedUserDelete = clickInsideElement(e, "userDelete");

            if ( clickedUserDetails) {
                e.preventDefault();
                loadUserDetails(clickedUser);
                toggleModalOff();

            }else
            if ( clickedUserDelete) {
                e.preventDefault();
                deleteUser(clickedUser);
                toggleModalOff();
            }else
            if ( clickeElIsLink ) {
                e.preventDefault();
            }
            else if (clickedUserAddNonResponsiveArea){
                e.preventDefault();
            }
            else if (userMenuSelector){
                e.preventDefault();
                //console.log(e);
                clickedUser = e.target.id.replace(e.target.innerHTML,'');
                toggleModalOn();
                toggleMenuOff();
                positionMenu(e, modal);
            }
            else if (clickedElIsModal)
            {
                e.preventDefault();
                modalItemListener( clickedElIsModal );
                toggleMenuOff();
            }
            else  if (userCreationClick) {
                specificTaskID = e.target.id;
                e.preventDefault();
                toggleMenuOn();
                toggleModalOff();
                positionMenu(e, menu);

            } else if(userMenuSelector)
            {
                //toggleModalOn();
                //positionMenu(e);

                //loadProjects();
            }
            else {
                userCreationClick = null;
                toggleMenuOff();
                toggleModalOff();
            }

        });
    }


    function deleteUser(user_id) {

        var params = "user_id="+user_id;
        //console.log(user_id);
        getRequest(
            'deleteUser.php', // URL for the PHP file
            loadUsers,  // handle successful request
            drawError,    // handle error
            params
        );
        return false;

    }
    function loadUsers()
    {
        loadNodes();
    }



    function  loadUserDetails(user_id) {

        console.log(user_id);


        var v = document.getElementById('targetUserID');
        v.value = user_id;
        document.forms['user_management'].submit();
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
