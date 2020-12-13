/**
 * Created by typhon on 4/2/2015.
 */

$(document).ready(function(){
    /*can't redirect to a secure connection if you're on fucking localhost*/
    /*
    if (location.protocol != 'https:')
    {
        location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
    }
    */
    verifySession();
    //when verify session comes back good, init and set up UI



});

function sessionUIsetup() {
    if (sessionStorage.getItem("displayProject") == null)//FLAGGED
    {
        sessionStorage.setItem("displayProject", "all");
    }
    if (sessionStorage.getItem("displayScreen") == "taskManagementUI") {
        showDashboard();
    }
    if (sessionStorage.getItem("displayScreen") == "ProjectManagementUI") {
        showProjects();
    }
    if (sessionStorage.getItem("displayScreen") == "UserManagementUI") {
        showUsers();
    }
    if (sessionStorage.getItem("displayScreen") == "TeamManagementUI") {
        //showTeams();
    }
}

function pageSetup()
{

    //hide the rest of the malarky
    $("#wrapper").hide();

    //create the box
    var loginBox = document.createElement('div');
        loginBox.id = 'login-box';
    loginBox.className="loginpopup login-popup";

    //create the holder for the spans
    let containerHolder = document.createElement('div');


    //logo area
    //The Round Table
    //LOGO
    //by Bastion Software


    //spans
    let username = document.createElement('input');
    username.className='row loginusername';
    username.id = "username";
    username.setAttribute("contentEditable",true);
    username.setAttribute("type", "text");
    username.setAttribute("placeholder", "username");

    let password = document.createElement('input');
    password.className = 'row loginpassword';
    password.id = "password";
    password.setAttribute("contentEditable",true);
    password.setAttribute("type", "password");
    password.setAttribute("placeholder", "password");

    let submitBtn = document.createElement('button');
    submitBtn.id = "submitbtn";
    let submitBtnText = document.createTextNode("Submit");
    submitBtn.className = "btn btn-primary loginbtn";

    submitBtn.appendChild(submitBtnText);





    //grab the body handle...
    let body = $("#body");
    //console.log(body);
    body.attr("style", "background: #000");

    //attach the loginbox
    body.append(loginBox);

    let jLoginBox = $("#login-box");

    jLoginBox.append("<div>" +
        "<div class='loginlogo'>The Round Table</div>" +
        "<div style='padding-left: 35%;'>" + "<img border='0' src='images/The-Round-Table.v01.png' width='65' height='65' ></div>" +
        "<div class='loginlogo'>by Bastion Software</div>" +
        "</div>" +
        "<br/>");



    loginBox.appendChild(username);
    loginBox.appendChild(password);
    loginBox.appendChild(submitBtn);


    jLoginBox.append('<br /><div style="padding-top: 6px; margin-bottom: -9px; text-align: center; font-family: \'Courier New\';font-size: xx-small  ; color: silver;"><div id="forgot_pw">[forgot password?]</div><div id="forgot_un">[forgot username?]</div></div>');


    positionLogin(document.querySelector(".login-popup"));

    $("#username").focus();
    $("#submitbtn").bind("click",function(){login();});

    $("#username").keydown(function(e) {
        if(e.which == 13) {
            login();
        }
    });

    $("#password").keydown(function(e) {
        if(e.which == 13) {
            login();
        }
    });

}


function login()
{

    let data = "username="+$("#username").val()+"&password="+$("#password").val();
    //console.log(data);
    getRequest(
        'webmethods/userLogin.php',
        function(data) {    //console.log("function: login success")
            //console.log(data);

            $("#displayUserName").text($("#username").val());

            body.setAttribute("style", "background: #f5f5f5");
            $("#wrapper").show();
            $("#login-box").remove();


            init();
            sessionUIsetup();



            dashboardSetup();
            projectSetup();

            usersSetup();



            loadUsers();
            loadNodes();
            loadProjects();


            let taskManagementUI = $("#taskManagementUI");

            let projectManagementUI = $("#ProjectManagementUI");

            let taskButton = $("#showTasks");
            let projectButton = $("#showProjects");

            taskButton.bind("click", function () {
                projectManagementUI.hide();
                taskManagementUI.show();
            });

            projectButton.bind("click", function () {
                taskManagementUI.hide();
                projectManagementUI.show();
            });
            //this is how I currently get concurrency. Lazy
            //setInterval(function(){loadNodes();},15000);

        },
        function(data){console.log(data);},
        data
    );
}


function verifySession()
{

    let session_ID = getCookie(document.cookie, "sessionID");
    let user_ID = getCookie(document.cookie, "userid");

    //if there's no userID, setup the page. If there is, check to make sure it's good.
    //console.log("Verifying session");
    if(user_ID != false) {
        let data = "userid=" + user_ID + "&sessionID=" + session_ID;


        if (session_ID)
            if (user_ID) {
                getRequest(
                    'webmethods/verifySession.php',
                    goodSession,
                    badVerify,
                    data
                );
            }
    }
    else {
        //console.log("False");
        pageSetup();
    }
}

function badVerify(data)
{
    console.log("BadVerify");
    console.log(data)
    pageSetup();
}

function goodSession(data)
{

    init();
    sessionUIsetup();


    //console.log("GoodSession");
    //  alert(data);
    body.setAttribute("style", "background: #f5f5f5");
    $("#wrapper").show();
    $("#login-box").remove();


    loadNodes();
    loadUsers();
    //loadTeams();


    dashboardSetup();
    projectSetup();

    usersSetup();
    //teamsSetup();


    //this'll force a reload when the cookie expires
    // 1000*60*60*1 that's 1000ms times sixty seconds times sixty minutes times one hour
    setTimeout(function(){location.reload(true);}, 1000 * 60 * 60 * 1)

}
function logOut()
{
    //console.log("hit logout");
    getRequest(
        'webmethods/logout.php',
        location.reload(true),
        location.reload(true),
        null
    );

}
function getCookie(inputString, searchTerm)
{
    var v = parseCookie(inputString);
    var x;
    for (var i=0;i<v.length;i++)
    {
        if(v[i][0].includes(searchTerm))
        {
            x=v[i][1];
            return(x);
        }
    }
    return false;
}
function parseCookie(inputString)
{


    let cookieAry = inputString.split(';');

    let KvP = new Array(cookieAry.length);

    for(let i = 0; i<cookieAry.length; i++)
    {
        KvP[i]=cookieAry[i].split('=');
    }

    return KvP;
}
function replaceCookie(cname, cvalue){
    let cookie = cname+"="+cvalue;
    setCookie(cookie);

    //sessionStorage.setItem(cname,cvalue);

}

function sessionStorageReplaceCookie(cname,cvalue) {
    sessionStorage.setItem(cname, cvalue);
}

function setCookie(fullCookieString)
{
    //console.log(fullCookieString);

    let d = new Date();
    d.setTime(d.getTime() + (8 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = fullCookieString+ ";" + expires + ";path=/";
}

function addCookie(cname, cvalue) {
    setCookie(cname + "=" + cvalue + ";");
    //sessionStorage.setItem(cname,cvalue);
}



function positionLogin(menu) {

    let clickCoordsX = $(window).width() / 2;
    let clickCoordsY = $(window).height() / 4;

    let menuWidth = menu.offsetWidth + 4;

    let menuHeight = menu.offsetHeight + 4;


    let windowWidth = window.innerWidth;
    let windowHeight = $(document).height(); //window.innerHeight;

    menu.style.position = 'absolute';

    menu.style.left = clickCoordsX - (menuWidth / 2) + "px";


    menu.style.top = clickCoordsY - (menuHeight / 2) + "px";

}

function loadNodes() {

    //console.log(document.cookie);

    //add a parameter in the cookies to determine what result set to bring back
    let userid = getCookie(document.cookie,"userid");
    let sessionID = getCookie(document.cookie, "sessionID");
    let projectID = "all"; //set to all for a fail-safe; by default it'll just bring back everything to which it has access

    let res = sessionStorage.getItem("displayProject");


    //console.log("display project id: "+res);

    if(res!=null) {

     projectID = res;
    }
    let params = "user_id="+userid+"&session_id="+sessionID+"&project_id="+projectID;
    //console.log(params);
    getRequest(
        'webmethods/loadNodes.php', // URL for the PHP file
        function(responseText)
        {

            //console.log(responseText);

            $("#back_log").empty();
            $("#in_progress").empty();
            $("#done").empty();


            let output = JSON.parse(responseText);
            //console.log(output);
            for(let k = 0; k<output.length;++k)

            {
                //console.log(output[k]);
                loadTask(output[k][2], output[k][1], output[k][0]);
            }
        },  // handle successful request
        drawError,    // handle error
        params
    );
    return false;
}
function loadTeams()
{
    getRequest(
        'webmethods/loadTeams.php',
        function (responseText) {
            //console.log(responseText);

            let teamContainer = $("#teamContainer");
            teamContainer.empty();

            let data = JSON.parse(responseText);
            let perm = "perm";
            for (let eachOne in data) {
                (function (val) {

                    teamContainer.append('' +
                        '<div class="userDisplayItem col-lg-1" style="color: black; cursor: pointer;" id="' + data[val][0] + '_teamContainer"> ' +
                        '<div class="userDisplayContent">' +
                        '<div class="row" style="width:100%; margin-left: 3px;" ><h3>' + data[val][1] +//' id ' + data[val][0] + ' ' +
                        //'<div style = "padding-left: 4px;" class="glyphicon glyphicon-cog"></div> ' +
                        '</h3>  </div>' +
                        '<div class="" style="margin: 0px; width: 95%;">Team Members: </div>' +
                        '<select id="' + data[val][0] + '_currentTeamUserSelect" style="width: 95%; margin-bottom: 3px;"></select>'+
                        '<div class="" style="margin: 0px; width: 95%;">Availble Users: </div>' +
                        '<select id="' + data[val][0] + '_possibleUserSelect" style="width: 95%; margin-bottom: 3px;"></select>'+
                        '<div id="' + data[val][0] + '_addUserToTeam" class="button btn modal_btn" style="background-color: #0b97c4;; width: 45%;">Add User</div>' +

                        '<div id="' + data[val][0] + '_removeUserFromTeam" class="button btn modal_btn" style="background-color: #0b97c4;; margin-left: 5%; width: 45%;">Remove User</div>' +
                        '<div id="' + data[val][0] + '_deactivateTeam" class="button btn modal_btn" style="background-color: #c4562d; margin-top: 5px; width: 95%;">Deactivate team</div>' +

                        '</div>' +
                        '</div>');
                    let deleteBtn = $("#" + data[val][0] + "_deactivateteam");

                    $("#" + data[val][0] + "_addUserToTeam").bind("click", function () {
                        let params = "user_id="+$("#"+data[val][0]+"_possibleUserSelect").val()+"&team_id="+data[val][0];
                        //console.log(params+" add user params");
                        getRequest(
                            'webmethods/addUserToTeam.php',
                            function(results)
                            {
                                //console.log(results);
                                let data = JSON.parse(results);
                                loadTeamUserDropdowns(data[0][0]);
                            },
                            drawError,
                            params

                        );
                    });
                    $("#" + data[val][0] + "_removeUserFromTeam").bind("click", function () {
                        let params = "user_id="+$("#"+data[val][0]+"_currentTeamUserSelect").val()+"&team_id="+data[val][0];
                        getRequest(
                            'webmethods/removeUserFromTeam.php',
                            function(results)
                            {
                                //console.log(params);
                                let data = JSON.parse(results);
                                //console.log(results);
                                loadTeamUserDropdowns(data[0][0]);

                            },
                            drawError,
                            params

                        );
                    });
                    $("#" + data[val][0] + "_deactivateTeam").bind("click", function () {
                        if(confirm("Really deactivate?"))
                        {

                        }
                    });

                    loadTeamUserDropdowns(data[val][0]);


                })(eachOne);
            }
        },
        drawError,
        null
    )
}

function loadTeamUserDropdowns(teamID)
{
    //_possibleUserSelect
    //_currentTeamUserSelect


    let params="team_id="+teamID;
    //console.log(params);
    getRequest(
        'webmethods/loadCurrentUsers.php',
        function(results)
        {
            let data = JSON.parse(results);
            //console.log(data)
            let dropdown = $("#" + teamID + "_currentTeamUserSelect");
            dropdown.empty();
            for(let eachOne in data){
                (function(val){


                    if(data[val][2]!=null) {
                        dropdown.append("<option value='" + data[val][2] + "'>" + data[val][3] + "</option>");
                    }
                })(eachOne)}


        },
        drawError,
        params
    );

    getRequest(
        'webmethods/loadAvailableUsers.php',
        function(results) {
            //console.log("Loading available");
            let data = JSON.parse(results);
            //console.log(data)

            let dropdown = $("#" + teamID + "_possibleUserSelect");
            dropdown.empty();
            dropdown.append("<option>Select a user...</option>");
            for (let eachOne in data) {
                (function (val) {


                    dropdown.append("<option value='" + data[val][0] + "'>" + data[val][1] + "</option>");

                })(eachOne)
            }


        },
        drawError,
        params
    );

}

function loadUsers()
{
    //console.log(document.cookie);


    getRequest(
        'webmethods/loadUsers.php', // URL for the PHP file
        function(responseText)
        {
            //console.log(responseText);
            let data = JSON.parse(responseText);

            let userContainer = $("#userContainer");
            userContainer.empty();
            //console.log("drawUsers");
            //console.log(data);



            for (let eachOne in data) {
                (function (val) {

                    //let testID = data[val][0];
                    let perm = "";
                    let ii = data[val][2];

                    if (null == ii) {
                        perm = "permissionsUndefined";
                    }
                    else {
                        perm = ii;
                    }

                    userContainer.append('' +
                        '<div class="userDisplayItem" id="' + data[val][0] + '_userContainer"> ' +
                        '<div class="userDisplayContent">' +
                        '<div class="col-lg-1 userName" >' + data[val][1] +//' id ' + data[val][0] + ' ' +
                        //'<div style = "padding-left: 4px;" class="glyphicon glyphicon-cog"></div> ' +
                        '</div>' +
                            '<div class="col-lg-12 userDisplayItem"> ' +
                            '<div class="col-lg-1 userRole">User Role: </div>' +
                            '<select class="col-lg-2 userRoleSelector" id='+data[val][0]+'_UserPermissionSelector>' +
                                '<option value = '+perm+'>' + perm + '</option>' +
                            '</select> ' +
                           // '<div class="col-lg-1">Affiliation: ' + data[val][3] + '</div>' +
                           // '<div id='+data[val][0]+'_teamMember class="" style="margin: 0px; width: 95%;">Member of Team: </div>'+
                            //'<div class="button btn modal_btn" style="background-color: #0b97c4; width: 95%;">Add Direct Report</div>'+
                            '<div id="'+data[val][0]+'_deactivateUser" class="button btn modal_btn deactivate_user_style col-lg-1 col-lg-offset-1" >Deactivate user</div>'+
                            '<div id='+data[val][0]+'_userPermissionBtn class="button btn modal_btn col-lg-1 col-lg-offset-1" style="background-color: #0bbeed;">' +
                            '<div class="glyphicon glyphicon-floppy-disk"> </div>' +
                            '</div>' +
                            '</div>' +
                        '</div>');

                    let teamHolder = $("#"+data[val][0]+"_teamMember");
                    //console.log(teamHolder);
                    //let appVal = "";

                    //let params = "current_user="+data[val][0];
                    //console.log(params);
/*  
                    getRequest(
                        'webmethods/getUserTeams.php',
                        function(newData)
                        {
                            //console.log(newData);
                            let intData = JSON.parse(newData);
                            //console.log(intData);
                            let buildUpString = '';

                            for(let dal in intData)
                                (function (val2) {
                                    //let val = dal[0];
                                    //console.log(intData[dal][1]);

                                    buildUpString += "<div>" + intData[val2][1] + "</div>";

                                    appVal=buildUpString;
                                    //console.log(appVal);
                                })(dal);

                            teamHolder.append(buildUpString);

                        },
                        function(err)
                        {
                            console.log(err);
                        },
                        params
                    );
*/
                    //teamHolder.append(""+appVal);

                    let deleteBtn = $("#"+data[val][0]+"_deactivateUser");

                    deleteBtn.bind("click",
                        function() {
                            let params = "user_id=" + data[val][0];
                            //console.log(params);

                            getRequest(
                                'webmethods/deleteUser.php',
                                loadUsers,
                                drawError,
                                params);
                        });

                    let userPermission = $("#"+data[val][0]+"_UserPermissionSelector");

                    getRequest(
                        'webmethods/listUserPermissions.php',
                        function(results)
                        {
                            //console.log(results);
                            let thisData = JSON.parse(results);
                            for(let eachTwo in thisData)
                                (function(val2)
                                {
                                    let userPermission = $("#"+data[val][0]+"_UserPermissionSelector");
                                    //console.log(userPermission);
userPermission.append("<option value='"+thisData[val2][1]+"'>"+thisData[val2][2]+"</option>");
//console.log(permissionConstructor);
                                })(eachTwo);


                        },
                        drawError,
                        null
                    );

                    let userPermBtn = $("#"+data[val][0]+"_userPermissionBtn");
                    userPermBtn.bind("click",function(e)
                    {
                        let params = "permission=" + userPermission.val()+"&user_id="+data[val][0];
                        //console.log(params);
                        getRequest(
                            'webmethods/setUserPermission.php',
                            nullVal,
                            drawError,
                            params
                        );
                    });


                })(eachOne);
            }

        },  // handle successful request
        drawError,    // handle error
        null
    );
    return false;
}


function loadProjectAssignedUsers()
{
    //console.log(document.cookie);

    getRequest(
        'webmethods/loadUsers.php', // URL for the PHP file
        function(responseText)
        {
            //console.log(responseText);
            let data = JSON.parse(responseText);

            let userContainer = $(".projectAssignSelect");
            //console.log("drawUsers");
            //console.log(data);
            userContainer.empty();
            userContainer.append('<option value="null">choose a user</option>');
            for (let eachOne in data) {
                (function (val) {

                    //let testID = data[val][0];
                    let perm = "";
                    let ii = data[eachOne][2];

                    if (null == ii) {
                        perm = "permissionsUndefined";
                    }
                    else {
                        perm = ii;
                    }
                    userContainer.append('<option value="' + data[eachOne][0] + '_option"> ' + data[eachOne][1] + ' </option>');
//$("#"+data[val][0]+"_projectContainer").bind("click",function(){replaceCookie("displayProject", testID); $("#projectSelector").val(testID); loadNodes();});


                })(eachOne);
            }

        },  // handle successful request
        drawError,    // handle error
        null
    );
    return false;
}

function loadProjectTeams()
{
    //console.log(document.cookie);

    getRequest(
        'webmethods/loadTeams.php', // URL for the PHP file
        function(responseText){
            //console.log(responseText);
            let data = JSON.parse(responseText);

            let userContainer = $(".projectTeamAssignSelect");
            //console.log("drawUsers");
            //console.log(data);
            userContainer.empty();
            userContainer.append('<option value="null">choose a team</option>');
            for (let eachOne in data) {
                (function (val) {

                    //let testID = data[val][0];
                    let perm = "";
                    let ii = data[eachOne][2];

                    if (null == ii) {
                        perm = "permissionsUndefined";
                    }
                    else {
                        perm = ii;
                    }
                    userContainer.append('<option value="' + data[eachOne][0] + '_option"> ' + data[eachOne][1] + ' </option>');
//$("#"+data[val][0]+"_projectContainer").bind("click",function(){replaceCookie("displayProject", testID); $("#projectSelector").val(testID); loadNodes();});


                })(eachOne);
            }
        },  // handle successful request
        drawError,    // handle error
        null
    );
    return false;
}






function drawError(returnedValue) {
    //let container = document.getElementById('notificationBar');
    //container.innerHTML = 'An error occurred while loading your project; please try again or contact support @ support@mpmcpherson.com';

    console.log(returnedValue);
}

// helper function for cross-browser request object
function getRequest(url, success, error, params) {
    let req = false;
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
        //console.log(url+"?"+params);
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

    let params = "user_id="+userID+"&text="+task+"&project="+projectID+"&taskinfo='"+taskInfo+"'";
    //console.log(params);
    if(task != "" && task != null) {
        getRequest(
            'webmethods/addTask.php', // URL for the PHP file
            loadNodes,   // handle successful request
            drawError,      // handle error
            params
        );

    }

}


function loadTask(task, taskPosition, id) {

    let elem = $("#"+taskPosition);
    if(task != "" && taskPosition != null)
    {
        //uncomment below for 'high contrast' mode
        //elem.append("<div id = '"+id+"' class='taskID taskStyle'><div style='cursor: pointer; -webkit-user-select: none;'>"+task+"</div></div>");
        elem.append("<div id = '"+id+"' class='taskID '>" +
            "<div style='cursor: pointer; -webkit-user-select: none; overflow: hidden;'>" +
                "<div id='"+id+"_folderGlyph' style='margin-right: 10px; height: 100%; display: block; float: right;' class='glyphicon glyphicon-folder-close'></div>" +
                "<div>"+task+"</div>" +

                "</div> " +
            "</div>");


        $("#"+id).click(function(){
            buildTaskModal(id);
            let folder = $("#"+id+"_folderGlyph");
            folder.toggleClass("glyphicon-folder-close");
            folder.toggleClass("glyphicon-folder-open");
        });
    }

}

function buildTaskModal(id){
    let params = "post_id="+id;
    $("#"+id).off("click");
    //console.log(params);
    getRequest(
        'webmethods/loadTaskComments.php', // URL for the PHP file
        function(responsetext){
            //console.log(responsetext);

            let data = JSON.parse(responsetext);
            let ttl = $("#taskDetails" + data[0][2]);
            ttl.remove();

            let target = $("#" + data[0][2]);
            //target.empty();


            target.append("<div class='taskDetails' id = 'taskDetails" + data[0][2] + "' style='overflow: hidden; margin: 3px; padding-bottom: 6px; background-color: #fbfbfb; box-shadow: 3px 3px 2px black;'></div>");

            let notes = $("#taskDetails" + data[0][2]);
            notes.empty();

            notes.append("<div id='commentHolder"+data[0][2]+"' class=' '></div>");

            let commentHolder = $("#commentHolder"+data[0][2]);

            commentHolder.append("assigned to <select id='"+data[0][2]+"_selector'> </select>");

            let localSelector = $("#"+data[0][2]+"_selector");
            localSelector.bind("click",function(e){
                e.stopPropagation();
            });


            let params = "task_id="+data[0][2];

            //console.log(params);

            getRequest(
                'webmethods/loadTaskUsers.php', // URL for the PHP file
                function(responsetext)
                {
                    let currentUser = JSON.parse(responsetext);

                    if(currentUser[0][0] == null) {
                        localSelector.append("<option value='0'>select user</option>");
                    }else {
                        localSelector.append("<option value='" + currentUser[0][0] + "'>" + currentUser[0][1] + "</option>");
                    }
                },   // handle successful request
                drawError,      // handle error
                params
            );


            getRequest(
                'webmethods/getAvailableUsers.php', // URL for the PHP file
                function(responsetext)
                {
                    //console.log(responsetext);

                    let userList = JSON.parse(responsetext);
                    for(let eachOne in userList) {
                        (function (val) {
                            localSelector.append("<option value='" + userList[val][0] + "'>" + userList[val][1] + "</option>");

                        })(eachOne);
                    }
                },   // handle successful request
                drawError,      // handle error
                params
            );






            commentHolder.append("<span id='topRow"+data[0][2]+"' class='row'></span>");

            let topRow = $("#topRow"+data[0][2]);


            topRow.append("<input id='addCommentTextField"+data[0][2]+"' class='addCommentTextField col-lg-9 col-sm-12 col-md-12 ' type='text'  placeholder='add comment'/>");
            topRow.append("<div id='addCommentBtn" + data[0][2] + "' style='float: right; margin-right: 3px;' class='button btn addCommentBtn col-lg-1 col-sm-11 col-md-1 ' ><div class='glyphicon glyphicon-floppy-disk'></div></div>");  /*<div id='closeCommentsBtn"+data[0][2]+"'  style='margin-right: -9px; float: right;' class='btn glyphicon glyphicon-chevron-up'></div>*/

            let addComment = $("#addCommentBtn"+data[0][2]);
            //console.log("#addCommentBtn"+data[0][2]);
            let addCommentField = $("#addCommentTextField"+data[0][2]);

            //handle save events
            addComment.bind("click", function (e) {
                e.stopPropagation();
                let id = data[0][2];
                saveAsignee(id);
                if(addCommentField.val() != "") {
                    saveComment(id);
                    commentHolder.empty();
                    buildTaskModal(id);
                }
                e.stopImmediatePropagation();
            });

            addCommentField.bind("click", function (e) {
                e.stopImmediatePropagation();
                e.stopPropagation();//stopImmediatePropagation();
            });

            //handle keyboard events in the input box
            addCommentField.bind("keyup",function(e){
                e.stopImmediatePropagation();
                e.stopPropagation();//stopImmediatePropagation();

                if(e.which==13)
                {
                    let id = data[0][2];
                    saveComment(id);
                    commentHolder.empty();
                    buildTaskModal(id);
                }
                if(e.which==27)
                {
                    addCommentField.val('');
                }
            });

            addCommentField.focus();



            //file upload logic
            /*
                notes.append("<div class='row' >" +
                        "<div style='overflow: hidden;' class='col-md-10'>" +
                            "<div id='"+data[0][2]+"_attach' class='btn'> " +
                                "<input id='"+data[0][2]+"_notesfileupload' type='file' name='files[]' multiple style='opacity:0; position: absolute;'>" +
                                    "Attach file " +
                                "<div class='glyphicon glyphicon-cloud-upload'>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>");
            */

            //notes.append("<iframe style='width: 95%; height: 40px;' src='uploadContainer.html'></iframe>"    );

            $("#"+data[0][2]+"_attach").bind("click",function(e){
                e.stopPropagation();
                e.stopImmediatePropagation();
                attachUploader(data[0][2]+"_notesfileupload");

            });

            //basic setup begun: this won't work as is
            //wrong target (should be my iframe)
            //needs to be attached to a fileupload dialog
            //should be able to do that by attaching an invisible upload item to each upload button, then triggering a click when user clicks the upload button


            // Change this to the location of your server-side upload handler:
            /*
            let url = 'webmethods/fileUpload.php';

            $('#'+data[0][2]+'_notesfileupload').fileupload({
                url: url,
                dataType: 'json',
                done: function (e, data) {
                    alert("woo");
                    /*$.each(data.result.files, function (index, file) {
$('<p/>').text(file.name).appendTo('#files');
                    });
                },
                progressall: function (e, data) {


                    let progress = parseInt(data.loaded / data.total * 100, 10);

                    console.log("Progress: " + progress);

                    /*$('#progress .progress-bar').css(
                        'width',
                        progress + '%'
                    );
                }
            });//.prop('disabled', !$.support.fileInput)
               // .parent().addClass($.support.fileInput ? undefined : 'disabled');

    */



            //load comments
            if(data.length>1){console.log(data.length); data.splice(0,1);}


            //target.css("box-shadow", "3px 3px 2px black");
            //console.log(data);
            for (let val in data) {
                if(data[val][0]!="") {
                    //console.log("loop:" + val);
                    if ((val % 2) == 0) {
                        notes.append(
                            "<div class='row'>" +
                            "<div id='com" + data[val][1] + "' class=' col-md-10 col-xs-10' >" + data[val][0] + "</div>" +
                            "<span id = 'edit"+ data[val][1] + "' class='btn glyphicon glyphicon-edit'></span><span id='delete"+ data[val][1] + "'  style='float: right;' class='btn glyphicon glyphicon-trash'></span>" +
                            "</div>"
                        );
                    } else {
                        notes.append(
                            "<div class='row' style='background-color: #e2e2e2;'>" +
                            "<div id='com" + data[val][1] + "' class='taskID col-md-10 col-sm-10 col-xs-10' style='background-clip: content-box; '>"   + data[val][0] + "</div>" +
                            "<span id = 'edit"+ data[val][1] + "' class='btn glyphicon glyphicon-edit'></span>" +
                            "<span id='delete"+ data[val][1] + "' style='float: right;' class='btn glyphicon glyphicon-trash'> </span>" +
                            "</div>");
                    }


                    (function(index){

                        $("#com"+data[index][1]).bind("click", function(e)
                        {
                            e.stopPropagation();
                            e.stopImmediatePropagation();
                        });

                        $("#delete"+ data[index][1]).bind("click", function(e){
                            e.stopPropagation();

                            let comment = $("#com"+data[index][1]);

                            //logic to fire off a delete event

                            //comment.attr("contenteditable", true);
                            //comment.focus();


                            deleteComment(data[index][1], data[0][2]);


                            //change the glyphicon to a save button
                            //tie a new event to it
                            //this event should fire an update event, then reload all the comments

                        });
                    })(val);

                    (function(index){

                        $("#edit"+ data[index][1]).bind("click", function(e){
                            e.stopPropagation();

                            let comment = $("#com"+data[index][1]);
                            comment.attr("contenteditable", true);
                            comment.focus();



                            let tag = $("#edit"+data[index][1]);

                            tag.attr("class", "btn glyphicon glyphicon-floppy-disk");
                            tag.unbind();
                            tag.bind("click", function(e){
                                updateComment(data[index][1], comment.text(), data[0][2]);
                                comment.attr("contenteditable", false);
                                tag.attr("class", "btn glyphicon glyphicon-edit");
                            });


                            //change the glyphicon to a save button
                            //tie a new event to it
                            //this event should fire an update event, then reload all the comments

                        });
                    })(val);
                }

            }
            notes.append("<div class='row btn-group bottomRowButton' id='bottomRowButton"+data[0][2]+"' ></div>");

            let row = $("#bottomRowButton"+data[0][2]);

if(row.parent().parent().parent().attr("id")=="back_log")
            {

                row.append("<div id='advanceTaskBtn" + data[0][2] + "' class='button btn advanceTaskBtn col-lg-3' ><div class='glyphicon glyphicon-chevron-right'></div></div>");
            }
            else if(row.parent().parent().parent().attr("id")=="done")
            {
                row.append("<div id='regressTaskBtn" + data[0][2] + "' class=' button btn regressTaskBtn col-lg-3'><div class='glyphicon glyphicon-chevron-left'></div></div>");
            }
            else
            {
                row.append("<div id='regressTaskBtn" + data[0][2] + "' class=' button btn regressTaskBtn col-lg-3'><div class='glyphicon glyphicon-chevron-left'></div></div>");
                row.append("<div id='advanceTaskBtn" + data[0][2] + "' class='button btn advanceTaskBtn col-lg-3' ><div class='glyphicon glyphicon-chevron-right'></div></div>");
            }


            row.append("<div id='deleteTaskBtn" + data[0][2] + "' style='float: right; margin-right: -3px;' class='button btn deleteTaskBtn' ><div class='glyphicon glyphicon-trash'></div></div>");

            let regressBtn = $("#regressTaskBtn"+data[0][2]);
            let advanceBtn = $("#advanceTaskBtn"+data[0][2]);
            let deleteBtn = $("#deleteTaskBtn"+data[0][2]);

            regressBtn.bind("click", function (e){
                e.stopPropagation();
                moveTask(data[0][2], -1);
            });

            advanceBtn.bind("click", function (e)
            {
                e.stopPropagation();
                moveTask(data[0][2], 1);
            });

            deleteBtn.bind("click", function (e)
            {
                e.stopPropagation();
                if(confirm("Are you sure?")) {
                    deleteTask(data[0][2]);
                }
            });

            let closeCommentsBtn = $("#"+data[0][2]);

            closeCommentsBtn.bind("click", function (e) {
                e.stopPropagation();
                let id = data[0][2];
                let ttl = $("#taskDetails" + data[0][2]);
                $("#"+id).click(function(){buildTaskModal(id);});
                ttl.remove();
                let folder = $("#"+id+"_folderGlyph");
                folder.toggleClass("glyphicon-folder-close");
                folder.toggleClass("glyphicon-folder-open");
                //target.empty();
            });

        },   // handle successful request
        drawError,      // handle error
        params
    );

}


function attachUploader(id) {
    'use strict';

    // Initialize the jQuery File Upload widget:
    $('#' + id).fileupload({
        // Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},
        url: 'webmethods/fileUpload.php',
        dataType: 'json',
        context: $('#' + id)[0],
        always: function(e,data)
        {
            console.log("called always");
        },
        done: function(e,data)
        {
            console.log("called done");
            console.log(e);
            console.log(data);
        }
    });

    // Enable iframe cross-domain access via redirect option:
    $('#' + id).fileupload(
        'option',
        'redirect',
        window.location.href.replace(
            /\/[^\/]*$/,
            '/cors/result.html?%s'
        )
    );

    console.log($('#' + id).fileupload('option', 'url'));
    // Load existing files:
    $('#' + id).addClass('fileupload-processing');
    $.ajax({
        // Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},
        url: $('#' + id).fileupload('option', 'url'),
        dataType: 'json',
        context: $('#' + id)[0],

    }).always(function () {
        //console.log($(this));
        $(this).removeClass('fileupload-processing');
    }).done(function (result) {
        //console.log($(this));
        $(this).fileupload('option', 'done')
            .call(this, $.Event('done'), {result: result});
    });


}

function saveAsignee(id) {

    let localSelector = $("#"+id+"_selector");

    let params = "task_id="+id+"&user_id="+localSelector.val();

        getRequest(
            'webmethods/setAssignedUser.php',
            nullVal,
            drawError,
            params
        );

    return false;



}

function deleteComment(commentID, post)
{

    deleteThisComment(commentID);
    buildTaskModal(post);

}

function updateComment(commentID, text, post)
{
    copyComment(commentID, text);
    updateExistingComment(text, commentID);
    buildTaskModal(post);

}
function copyComment(commentID, text)
{
    //console.log("updateComment");

    let params = "task_message="+text+"&task_info_id="+commentID;

    //console.log(params);
    if(text != '') {
        getRequest(
            'webmethods/updateComment.php',
            nullVal,
            drawError,
            params
        );
    }
    return false;


}


function deleteThisComment(commentID)
{
    //console.log("deleting comment");

    let params = "task_info_id="+commentID;

    //console.log(params);
        getRequest(
            'webmethods/updateComment2.php',
            nullVal,
            drawError,
            params
        );
    return false;

}

function updateExistingComment(text, commentID)
{
    //console.log("updateComment");

    let params = "task_message="+text+"&task_info_id="+commentID;

    //console.log(params);
    if(text != '') {
        getRequest(
            'webmethods/updateComment2.php',
            nullVal,
            drawError,
            params
        );
    }
    return false;

}
function saveComment(commentID) {
    //console.log("save comment " + commentID);
    //console.log("writing down comments...");
    save_comments(commentID);
    //console.log("writing down user");
    save_assignedUser(commentID);


}
function save_comments(commentID){


    let inp = $("#addCommentTextField"+commentID).val();

    let params = "task_message="+inp+"&post_id="+commentID;
    //console.log(params);
    if(inp.value != '') {
        getRequest(
            'webmethods/saveComments.php',
            nullVal,
            drawError,
            params
        );
    }
    return false;

}

function save_assignedUser(commentID){
    let inp = commentID
    let userID = getCookie(document.cookie,"userid");

    let params = "post_id="+inp.value+"&user_id="+ userID.value;
    //console.log(params);

    getRequest(
        'webmethods/saveChanges.php', // URL for the PHP file
        nullVal,  // handle successful request
        drawError,    // handle error
        params
    );
    return false;

}


function nullVal(responsetext){

    console.log(responsetext);


}



function loadAddTaskModal(){

    let target = $("#buttonHolder");



        target.append("<div id = 'addTaskModal' class='addTaskModal' ></div>");
        let atm = $("#addTaskModal");
        atm.append("project: <select id='projectSelector'/>");

        atm.append("<div class='row'><input id='task_input_title' class='task_input_title'  placeholder='task title'/></div>")

        //atm.append("<div class='row'><textarea id='taskFirstComment' style='box-sizing:border-box; -moz-box-sizing:border-box; -webkit-box-sizing: border-box;' placeholder='task details: not currently implemented'></textarea></div>")


        atm.append("<div class='row'><div id='saveBtn' class='modal_btn btn' style='background-color: #3bafda;width: 100%; font-family: bold;'><h5>Create Task</h5></div></div>");

        $("#task_input_title").bind("keydown",function(e)
        {
            if(e.which == 13)
            {
                let selector = $("#projectSelector");
                let title = $("#task_input_title");
                let titleText = title.val();
                let comment = $("#taskFirstComment");
                title.val('');
                addTask(getCookie(document.cookie, "userid"),selector.val(),titleText,comment.val());

                atm.hide();
            }else if(e.which==27)
            {
                atm.hide();
            }
        });

        let saveButton = $("#saveBtn");
        saveButton.bind("click",function()
            {
                let selector = $("#projectSelector");
                let title = $("#task_input_title");
                let titleText = title.val();
                let comment = $("#taskFirstComment");
                title.val('');
                addTask(getCookie(document.cookie, "userid"),selector.val(),titleText,comment.val());

                atm.hide();

            }
        );

        loadProjects();
}

function loadDropdownUsers(id) {

    var params = "post_id="+id;

    getRequest(
        'webmethods/loadDropdownUsers.php', // URL for the PHP file
        buildDropDown,  // handle successful request //gotta make this point to a different function
        drawError,    // handle error
        params
    );
    return false;

}



function loadProjects() {
    /* handles the click event for the project dropdown in the modal, sends the query*/

    let user_id = getCookie(document.cookie,"userid");

    let params = "user_id="+user_id;
    //console.log("loadProjects");
    //console.log(params);
    getRequest(
        'webmethods/loadProjectList.php', // URL for the PHP file
        populateProjectInformation,  // handle successful request
        drawError,    // handle error
        params
    );
    return false;

}
function populateProjectInformation(responsetext)
{
    //console.log("PPI"+responsetext);

    let data = JSON.parse(responsetext);

    //console.log(data);

    let fileUploadDropdown = $("#attachFileModalSelect");


    let projectSelector = $("#projectSelector");
    let sideBarList = $("#projectSidebarList");
    let topProjectDropdown = $("#topProjectDropdown");
    let projectContainer = $("#projectContainer");

    projectContainer.empty();
    projectSelector.empty();
    topProjectDropdown.empty();
    sideBarList.empty();

    projectSelector.append("");
    if(data==undefined)
    {
        projectSelector.append('<option value = "null">select project</option> ');
        //console.log("SELECTOR DATA " + data);
    }
    else
        {
            //console.log("SELECTOR DATA " + data);

            sideBarList.append('<li><a href="#" style="cursor: pointer;" id="all_sidebar">All Projects</a></li>');


$("#all_sidebar").bind("click",function(e){e.preventDefault(); sessionStorageReplaceCookie("displayProject", "all"); loadNodes(); return false;});

            topProjectDropdown.append('<li><a href="#" style="cursor: pointer;" id="all_topbar">All Projects</a></li>');
$("#all_topbar").bind("click",function(e){e.preventDefault(); sessionStorageReplaceCookie("displayProject", "all"); $("#projectSelector").val("all"); loadNodes();});

            projectSelector.append('<option value = "all">select a project...</option>');

            for (let eachOne in data)
            {
                (function(val){

                    let testID = data[val][0];
                    projectSelector.append('<option value = ' + data[val][0] + '>' + data[val][1] + '</option>');
                    fileUploadDropdown.append('<option value = ' + data[val][0] + '>' + data[val][1] + '</option>');

                    sideBarList.append('' +
                        '<li>' +
                            '<a href="#" style="cursor: pointer;" id="' + data[val][0] + '_sidebar">' +
                                data[val][1] +
                            '</a>' +
                        '</li>');

                    $("#"+data[val][0]+"_sidebar").bind("click",
                        function()
                        {

                            sessionStorageReplaceCookie("displayProject", testID);
                            $("#projectSelector").val(testID);
                            loadNodes();
                        }
                    );

                    topProjectDropdown.append('' +
                        '<li>' +
                            '<a style="cursor: pointer;" id="' + data[val][0] + '_topbar">' +
                                data[val][1] +
                            '</a>' +
                        '</li>');

                    $("#"+data[val][0]+"_topbar").bind("click",
                        function()
                        {
                            sessionStorageReplaceCookie("displayProject", testID);
                            $("#projectSelector").val(testID);
                            loadNodes();
                        });



                    //console.log("project container thing");
                    //loads the ProjectManagementUI view
                    projectContainer.append('' +
                        '<div class="row">'+
                        '<div class="projectDisplayItem" style="color: black;" id="' + data[val][0] + '_projectContainer"> ' +
                            '<div class="col-lg-2 projectDisplayItemHeader" style="background-color: skyblue; margin-bottom: 5px;">' +
                                '<h3>' +
                                    data[val][1] +  //project name
                                '</h3>' + '<div id="'+data[val][0]+'_trash" style="cursor: pointer;" class="glyphicon glyphicon-trash"></div>' +
                            '</div>' +
                        '</div>'+
                        '</div>'
                    );
                    //$("#"+data[val][0]+"_projectContainer").bind("click",function(){sessionStorageReplaceCookie("displayProject", testID); $("#projectSelector").val(testID); loadNodes();});
                    $("#"+data[val][0]+"_trash").bind("click",function()
                    {
                        if(confirm("Delete this project?"))
                        {
                            deleteProject(data[val][0]);
                        }
                    });

                    let projectObject = $("#"+data[val][0] + "_projectContainer");

/*
                    projectObject.append(
                    "<div class='row' >" +
                        "<div style='overflow: hidden;' class='col-md-10'><div id='"+data[val][0]+"_projectAttach' class='btn'>" +
                            "<input id='"+data[val][0]+"_projectfileupload' type='file' name='files[]' multiple style='opacity:0; position: absolute'> Attach file " +
                                "<div class='glyphicon glyphicon-cloud-upload'></div>" +
                            "</div>" +
                        "</div>" +
                    "</div>");

$("#"+data[val][0]+"_attach").bind("click",function(e){
                        e.stopPropagation();
                        e.stopImmediatePropagation();
$("#".data[val][0]+"_projectfileupload").click();

                    });

                    //basic setup begun: this won't work as is
                    //wrong target (should be my iframe)
                    //needs to be attached to a fileupload dialog
                    //should be able to do that by attaching an invisible upload item to each upload button, then triggering a click when user clicks the upload button
                    function setupFileUpload(id)
                    {
                        'use strict';
                        // Change this to the location of your server-side upload handler:
                        let url = 'webmethods/';
                        $('#'+id).fileupload({
                            url: url,
                            dataType: 'json',
                            done: function (e, data) {
                                $.each(data.result.files, function (index, file) {
$('<p/>').text(file.name).appendTo('#files');
                                });
                            },
                            progressall: function (e, data) {
                                let progress = parseInt(data.loaded / data.total * 100, 10);
                                $('#progress .progress-bar').css(
                                    'width',
                                    progress + '%'
                                );
                            }
                        }).prop('disabled', !$.support.fileInput)
                            .parent().addClass($.support.fileInput ? undefined : 'disabled');

                    }



*/
                    projectObject.append('' +
                        '<div class="col-lg-2" style="cursor: pointer;">' +
                            '<div id="'+data[val][0]+'_swap" class ="" style="font-weight: bold" > ' + //' Show/Hide ' +
                                'Project Users: ' +
                                '<div id="'+data[val][0] +'_chev" class="glyphicon glyphicon-chevron-up"></div>' +
                                '<div id='+data[val][0] +'_assignedBox></div>' +
                            '</div>' +
                        '</div>');

                    projectObject.append('<br/>' +
                        '<div class="col-lg-2">'+
                        '<div>' +
                            '<div class ="" style="font-weight: bold" >Assign User to Project: ' +
                                '<div   id='+data[val][0] +'_assignmentBox></div>' +
                            '</div>' +
                        '</div>'+
                        '<div class="col-lg-2"><select id='+data[val][0] +'_assignSelect class="projectAssignSelect"></select></div>' +
                        '</div>');

//                    projectObject.append('<div class="col-lg-2"><select id='+data[val][0] +'_assignSelect class="projectAssignSelect"></select></div>');

/*
                    projectObject.append('<br/>' +
                        '<div class="row" style="display: block;  background-color: skyblue;">' +
                        '<div class ="" style=" font-weight: bold" >Assign Team to Project: ' +
                        '<div style="display: block;" class="teamContainer"  id='+data[val][0] +'_teamAssignmentBox></div>' +
                        '</div>' +
                        '</div>');

                    projectObject.append('<div class="row"><select style="width: 100%; display: block;" id='+data[val][0] +'_assignTeamSelect class="projectTeamAssignSelect"></select></div>');
*/




                    /*projectObject.append('<br/> <div class="row"><div style="display: block; background-color: skyblue;"  id='+data[val][0] +'_assignBtn class="modal-btn btn">Add User or Team</div></div>');*/

                    projectObject.append('<br/> <div style="background-color: skyblue;"  id='+data[val][0] +'_assignBtn class="col-lg-1 col-xs-12 col-sm-12 modal-btn btn centered-btn">Add User</div>');

$("#"+data[val][0]+"_assignBtn").bind("click",function(){

                        let userid = $("#"+data[val][0]+"_assignSelect").val().replace("_option","");
                        let teamid = $("#"+data[val][0]+"_assignTeamSelect").val().replace("_option","");

                        let projectid = data[val][0];
                        //alert("\r\n assigning user "+assigning_user+"\r\n user id "+userid+"\r\n project id "+projectid);
                        if(userid != 'null' ) {
                            addUserToProject(userid, projectid);


                        }if(teamid != 'null')
                        {
                            addTeamToProject(teamid, projectid)
                        }
                    });

                    $("#"+data[val][0] +'_swap').bind("click", function(){
                        //do some stuff

                        //flip the chevron
                        let chev =$("#"+data[val][0] +"_chev");

                        chev.toggleClass("glyphicon-chevron-up");
chev.toggleClass("glyphicon-chevron-down");

                        let openClosed = $("#"+data[val][0] +'_assignedBox');

                        if(!openClosed.is(":hidden"))
                        {
                            openClosed.hide();
                        }else
                        {
                            openClosed.show();
                        }

                    });


                })(eachOne);
            }
        }

    let res = sessionStorage.getItem("displayProject");
    projectSelector.val(res);


    loadProjectUsers();
    loadProjectAssignedUsers();
    //loadProjectTeams();
}

function addUserToProject(userid, projectid)
{
    let params = "user_id="+userid+"&project_id="+projectid;
    getRequest(
        'webmethods/addUserToProject.php', // URL for the PHP file
        reloadUsersInProjectsProject,   // handle successful request
        drawError,      // handle error
        params
    );
}
function addTeamToProject(teamid, projectid)
{
    let params = "user_id="+teamid+"&project_id="+projectid;
    getRequest(
        'webmethods/AddTeamToProject.php', // URL for the PHP file
        reloadUsersInProjectsProject,   // handle successful request
        drawError,      // handle error
        params
    );
}

function reloadUsersInProjectsProject()
{
    loadProjectUsers();
    loadProjectAssignedUsers();
    //loadProjectTeams();
}


function deleteProject(projectid)
{
    let params = "project_id="+projectid;
    getRequest(
        'webmethods/deleteProject.php', // URL for the PHP file
        function(){loadProjects();},   // handle successful request
        drawError,      // handle error
        params
    );
}

function buildDropDown(responsetext){

    let data = JSON.parse(responsetext);
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


function moveTask(id, direction){

    let params = "post_id="+id+"&direction="+direction;

        getRequest(
            'webmethods/moveTask.php', // URL for the PHP file
            loadNodes,   // handle successful request
            drawError,      // handle error
            params
        );
}


function deleteTask(id){
    var params = "post_id="+id;
    getRequest(
        'webmethods/taskDelete.php', // URL for the PHP file
        loadNodes,   // handle successful request
        drawError,      // handle error
        params
    );
}


function createProject(userid, projectName) {

    let params = "user_id="+userid+"&project="+projectName+"&status=0";
    //console.log(params);
    if(projectName != "" && projectName != null) {
        getRequest(
            'webmethods/addNewProject.php', // URL for the PHP file
            loadProjects,   // handle successful request
            drawError,      // handle error
            params
        );


    }

}


function dashboardSetup()
{
    let localTarget = $("#taskManagementUI");
    $("#showTasks").bind("click",function(){
        if(!localTarget.is(":visible") )
        {
sessionStorage.setItem("displayScreen","taskManagementUI");
            showDashboard();
        }
    });
}

function projectSetup()
{
    let localTarget = $("#ProjectManagementUI");
    $("#showProjects").bind("click",function(){
        if(!localTarget.is(":visible") )
        {

sessionStorage.setItem("displayScreen","ProjectManagementUI");
            showProjects();
        }
    });
}

function usersSetup()
{
    //console.log("users setup fired");
    let localTarget = $("#UserManagementUI");
    $("#showUsers").bind("click",function(){
        if(!localTarget.is(":visible") )
        {

            sessionStorage.setItem("displayScreen","UserManagementUI");
            showUsers();
        }
    });
}

function teamsSetup()
{
    //console.log("team setup fired");
    let localTarget = $("#TeamManagementUI");
    $("#showTeams").bind("click",function(){
        if(!localTarget.is(":visible") )
        {
            //console.log("hi");
sessionStorage.setItem("displayScreen","TeamManagementUI");
            showTeams();
        }
    });
}

function showTeams()
{
    $("#TeamManagementUI").show();
    $("#UserManagementUI").hide();
    $("#taskManagementUI").hide();
    $("#ProjectManagementUI").hide();

}
function showDashboard()
{
            $("#TeamManagementUI").hide();
            $("#ProjectManagementUI").hide();
            $("#UserManagementUI").hide();
            $("#taskManagementUI").show();

}

function showProjects()
{
    $("#TeamManagementUI").hide();
    $("#UserManagementUI").hide();
    $("#taskManagementUI").hide();
    $("#ProjectManagementUI").show();

}

function showUsers()
{
            $("#TeamManagementUI").hide();
            $("#ProjectManagementUI").hide();
            $("#taskManagementUI").hide();
            $("#UserManagementUI").show();

}

function loadProjectUsers()
{
    getRequest(
        'webmethods/loadUserNodes.php',
        populateProjectUsers,
        drawError,
        null
    );
    return false;
}
function populateProjectUsers(responseText)
{

    let output = JSON.parse(responseText);

    $("[id$=_assignedBox]").empty();


    //console.log(output);
    for(let i = 0; i<output.length;++i)
    {
        let targetDiv = $("#"+output[i][0].toString()+"_assignedBox");
        //console.log("");
        //console.log(targetDiv);

        targetDiv.append("" +
            "<div style='background-color: rgba(226,226,226,0.86); font-weight: normal;' id='"+output[i][2]+"_"+output[i][0]+"' >"+output[i][3]+"" +
                "<div id='"+output[i][2]+"_"+output[i][0]+"_chev' style='padding-left:3px;' class='glyphicon glyphicon-chevron-up'></div>" +
                "<br/>" +
                "<div id = '"+output[i][2]+"_"+output[i][0]+"_remove'><div class='glyphicon glyphicon-trash'> Remove from project</div>" +
                    "<br/>" +
                    "<div>" +
                        //"<div class='glyphicon glyphicon-user'></div> User details" +
                    "</div>" +
                "</div>" +
            "</div>");

        $("#"+output[i][2]+"_"+output[i][0]+"_remove").hide();

        $("#"+output[i][2]+"_"+output[i][0]+"_remove").bind("click", function() {
        if(confirm("Really remove?")){
            removeUserFromProject(output[i][2],output[i][0],getCookie(document.cookie,"userid"));
            }else {

            }
        });

        $("#"+output[i][2]+"_"+output[i][0]).bind("click", function(e){
            //do some stuff
            e.preventDefault();
            e.stopPropagation();

            //flip the chevron
            let chev =$("#"+output[i][2]+"_"+output[i][0]+"_chev");

            chev.toggleClass("glyphicon-chevron-up");
            chev.toggleClass("glyphicon-chevron-down");

            let removeBtnScoped = $("#"+output[i][2]+"_"+output[i][0]+"_remove");

            if(!removeBtnScoped.is(":hidden"))
            {
                removeBtnScoped.hide();
            }else
            {
                removeBtnScoped.show();
            }

        });



    }

}

function removeUserFromProject(userid, projectid, assigning_user)
{
    let params = "user_id="+userid+"&project_id="+projectid+"&assigning_user="+assigning_user;
    getRequest(
        'webmethods/remove_user_from_project.php', // URL for the PHP file
        reloadUsersInProjectsProject,   // handle successful request
        drawError,      // handle error
        params
    );
}
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
            //toggleMenuOff();
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
    function clickInsideElement( e, className ) {

        var el = e.srcElement || e.target;

        //console.log(el);

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

        addFileModal();


        let afm = $("#attachFileModal");
        afm.hide();
        $("#attachFileBtn").bind("click", function (e) {
            e.stopPropagation();
            if (afm.is(":hidden")) {
                afm.show();
                $("#attachFileModal").focus();
            }
        });

        $(document).click(function (event) {
            if (!$(event.target).closest('#attachFileModal').length) {
                if (afm.is(":visible")) {
                    afm.hide();
                }
            }
        });


        //contextListener();
        //clickListener();
        keyupListener();
        loadAddTaskModal();
        let taskButton = $("#add_task");
        let modal = $("#addTaskModal");
        modal.hide();
        taskButton.bind("click", function (e) {
            e.stopPropagation();
            if (modal.is(":hidden")) {
                modal.show();
                $("#task_input_title").focus();
            }
        });

        let addTeamBtn = $("#add_team_btn");

        addTeamModal();

        let teamModal = $("#addTeamModal");

        teamModal.hide();
        addTeamBtn.bind("click", function(e)
        {
            e.stopPropagation();
            if(teamModal.is(":hidden"))
            {
                teamModal.show();
                $("#team_input_title").focus();
            }
        });

        $(document).click(function (event) {
            if (!$(event.target).closest('#addTeamModal').length) {
                if (teamModal.is(":visible")) {
                    teamModal.hide();
                }
            }
        });


        let addUserBtn = $("#add_user_btn");

        addUserModal();
        let userModal = $("#addUserModal");

        userModal.hide();
        addUserBtn.bind("click", function (e) {
            e.stopPropagation();
            if (userModal.is(":hidden")) {
                userModal.show();
                $("#user_name").focus();
            }
        });


        $(document).click(function (event) {
            if (!$(event.target).closest('#addTaskModal').length) {
                if (modal.is(":visible")) {
                    modal.hide();

                }
            }
        });

        addProjectModal();
        let projectBtn = $("#addProjectBtn");
        let projectModal = $("#addProjectModal");

        let secondProjectBtn = $("#addProjectPage");
        let projectModalSecond = $("#addProjectPageModal");

        projectModalSecond.hide();
        secondProjectBtn.bind("click", function (e) {
            e.stopPropagation();
            if (projectModalSecond.is(":hidden")) {
                projectModalSecond.show();
                $("#project_input_title2").focus();
            }
        });


        projectModal.hide();
        projectBtn.bind("click", function (e) {
            e.stopPropagation();
            if (projectModal.is(":hidden")) {
                projectModal.show();
                $("#project_input_title").focus();
            }
        });


        $(document).click(function (event) {
            if (!$(event.target).closest('#addTaskModal').length) {
                if (projectModal.is(":visible")) {
                    projectModal.hide();
                }
                if (projectModalSecond.is(":visible")) {
                    projectModalSecond.hide();
                }
                if (userModal.is(":visible")) {
                    userModal.hide();
                }
            }
        });

        //configure the password reset options thing
        let pw_reset_parent = $("#pw_reset");
        pw_reset_parent.append('<div id="pw_reset_container">' +

            '<div class="row"><input id="current_pw" placeholder="current password" type="password"/> </div>' +
            '<div class="row"><input id="new_pw" placeholder="new password" type="password"/> </div>' +
            '<div class="row"><input id="confirm_new_pw" placeholder="confirm new password" type="password" /> </div>' +
            '<div class="row btn modal_btn" id="reset_pw_btn" style="background-color: #3bafda; width: 100%; color: whitesmoke;">update password</div>' +

            '</div>');

        let PWC = $("#pw_reset_container");
        PWC.hide();
        pw_reset_parent.bind("click", function () {
            if (PWC.is(":visible")) {
                PWC.hide();
            }
            else {
                PWC.show();
            }
        });

        let currentPW = $("#current_pw");
        let newPW = $("#new_pw");
        let confirmNewPW = $("#confirm_new_pw");
        let pw_btn = $("#reset_pw_btn");

        currentPW.bind("click", function (e) {
            e.stopPropagation();
        });
        newPW.bind("click", function (e) {
            e.stopPropagation();
        });
        confirmNewPW.bind("click", function (e) {
            e.stopPropagation();
        });

        pw_btn.bind("click", function (e) {

            e.stopPropagation();

            //match PWs
            if (newPW.val() == confirmNewPW.val()) {

                let sendNewPw = newPW.val();
                let sendOldPw = currentPW.val();

                currentPW.val('');
                newPW.val('');
                confirmNewPW.val('');

                updatePassword(sendOldPw, sendNewPw);

            } else {
                alert("new passwords must match!")
            }


        });


        let email_manager = $("#user_email_display");

        email_manager.append('<div id="user_email_container">' +
            '<div class="row"><input id="current_email" placeholder="" type="email"/> </div>' +
            '<div class="row"><input id="new_email" placeholder="new email" type="email"/> </div>' +
            '<div class="row"><input id="confirm_new_email" placeholder="confirm new email" type="email" /> </div>' +
            '<div class="row btn modal_btn" id="update_email_btn" style="background-color: #3bafda; width: 100%; color: whitesmoke;">update email</div>' +
            '</div>'
        );

        let UEC = $("#user_email_container");
        UEC.hide();

        email_manager.bind("click", function () {
            if (UEC.is(":visible")) {
                UEC.hide();
            }
            else {
                UEC.show();
            }
        });
        let curr_email = $("#current_email");
        let new_user_email = $("#new_email");
        let confirm_email = $("#confirm_new_email");
        let set_email_btn = $("#update_email_btn");

        curr_email.bind("click", function (e) {
            e.stopPropagation();
        });
        new_user_email.bind("click", function (e) {
            e.stopPropagation();
        });
        confirm_email.bind("click", function (e) {
            e.stopPropagation();
        });
        set_email_btn.bind("click", function (e) {

            e.stopPropagation();

            //if the new addresses match...
            if (new_user_email.val() == confirm_email.val()) {


                //then fire off the update event
                updateEmail();

                //then clear them
                new_user_email.val('');
                confirm_email.val('');

            } else {
                //not allowed
                alert("New emails must match!");
            }

        });

        $("#logOut").bind("click", function () {
            logOut();

        });

        loadEmail();

    }

function updatePassword(oldPW, newPW) {

    let params = "oldPassword=" + oldPW + "&newPassword=" + newPW;
    //console.log(params);

    getRequest(
        'webmethods/updatePassword.php',
        changePWResults,
        drawError,
        params
    );


}

function updateEmail()
{
    let email = $("#new_email");
    let confirm = $("#confirm_new_email");

    if(email.val()==confirm.val()) {
        let params = "email="+email.val();
        getRequest('webmethods/updateUserEmail.php',
            function (results) {
//            console.log(results);
                let email = JSON.parse(results);
//            console.log(email[0][0]);
                $("#current_email").val(email);
            },
            function (results) {
                console.log(results);
            },
            params);
    }else{
        alert("Email addresses must match");
    }


}

function loadEmail() {
    getRequest('webmethods/loadUserEmail.php',
        function (results) {
            let email = ["0","0"];
            try{
                let email=JSON.parse(results);
            }
            catch(error)
            {
                console.log("RESULTS: " + results + " caused error: " + error);
            }
            $("#current_email").val(email[0][0]);
        },
        function (results) {
            console.log(results);
        },
        null);
}

function changePWResults(data) {
        //console.log(data);
        let results = JSON.parse(data);

        alert(results);

}


function addUserModal()
{
    let target = $("#add_user_btn");

    target.append("<div id = 'addUserModal' class='addTaskModal' ></div>");

    let apm = $("#addUserModal");


    apm.append("<div class='usernamefield'><input id='user_name' class='task_input_title'  placeholder='user name'/></div>");
    apm.append("<div class='userPWfield'><input type='password' id='user_pw' class='task_input_title' placeholder='password'/></div>");
    apm.append("<div class='userPWfield'><input type='password' id='user_pwConfirm' class='task_input_title' placeholder='confirm password'/></div>");
    apm.append("<div class='usernamefield' <input id='user_email' class='task_input_title' placeholder='email'/></div>");


    apm.append("<div class='row'><div id='userSaveBtn' class='modal_btn btn addUserBtn'><h5>Create User</h5></div></div>");

    let saveButton = $("#userSaveBtn");

    saveButton.bind("click",function()
        {

            let title = $("#user_name");
            let titleText = title.val();

            let pw = $("#user_pw");
            let pwconfirm = $("#user_pwConfirm");
            let email = $("#user_email");

            if(pw.val()==pwconfirm.val()) {


                title.val('');

                createUser(titleText, pw.val(), email.val());

                pw.val('');
                pwconfirm.val('');
                email.val('');

                apm.hide();

            }else
            {
                alert("passwords must match");
            }

        }

    );

}
function createUser(username, password, email) {

    var params = "user_name="+username+"&password="+password+"&email="+email;
    //console.log(params);
    if(password != "" && password != null && email != null) {
        getRequest(
            'webmethods/createNewUser.php', // URL for the PHP file
            loadUsers,   // handle successful request
            drawError,      // handle error
            params
        );


    }

}


function addTeamModal()
{
    let target = $("#add_team_btn");

    target.append("<div id = 'addTeamModal' class='addTaskModal' ></div>");

    let apm = $("#addTeamModal");


    apm.append("<div class='addTeamModalTitle' style=''><input id='team_input_title' class='task_input_title'  placeholder='team name'/></div>");


    apm.append("<div class='row'>" +
        "<div id='teamSaveBtn' class='modal_btn btn addUserBtn' ><h5>Create Team</h5></div></div>");

    let saveButton = $("#teamSaveBtn");

    saveButton.bind("click",function()
        {

            let title = $("#team_input_title");
            let titleText = title.val();

            title.val('');
            createTeam(titleText);

        }
    );


}
function createTeam(teamName)
{
    $("#addTeamModal").hide();
    let params = "team_name="+teamName;
    getRequest(
        'webmethods/createTeam.php',
        loadTeams,
        drawError,
        params
    );
}

function addFileModal() {
    //

    {
        let target = $("#attachFileBtn");

        target.append("<form id = 'attachFileModal' enctype='multipart/form-data' class='attachFileModal' ></form>");

        let apm = $("#attachFileModal");

        apm.append("<select id='attachFileModalSelect'><option>attach to project...</option></select>")
        apm.append("<input id='attachFileDialog' class='input-file' id='fileInput' type='file' name='file'>");


        apm.append("<div class='row'><div type='submit' id='fileAttachBtn' class='modal_btn btn addUserBtn'><h5>Attach File</h5></input></div>");

        let saveButton = $("#fileAttachBtn");

        saveButton.bind("click", function () {

            let input = $("#attachFileDialog");
            let fd = new FormData();

            //console.log(input[0].files[0]);

            fd.append( 'file', input[0].files[0] );


            console.log(fd.get("file"));
            $.ajax({
                url: 'webmethods/fileUpload.php',
                data: fd,
                cache: false,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function(data){
                    //alert("Yoohoo");
                    console.log(data);
                },
                error: function(data)
                {
                    alert("Error");
                    console.log(data);
                }
            });

            }
        );

    }
}

function addProjectModal()
{
    let target = $("#addProjectBtn");
    let altarget = $("#addProjectPage");

    target.append("<div id = 'addProjectModal' class='addTaskModal' ></div>");
    altarget.append("<div id = 'addProjectPageModal' class='addTaskModal' ></div>");

    let apm = $("#addProjectModal");
    let apm2 = $("#addProjectPageModal");


    apm.append("<div class='usernamefield'><input id='project_input_title' class='task_input_title' placeholder='project name'/></div>");
    apm2.append("<div class='usernamefield'><input id='project_input_title2' class='task_input_title' placeholder='project name'/></div>");
    //atm.append("<div class='row'><textarea id='taskFirstComment' style='box-sizing:border-box; -moz-box-sizing:border-box; -webkit-box-sizing: border-box;' placeholder='task details: not currently implemented'></textarea></div>")


    apm.append("<div class='row'><div id='projectSaveBtn' class='modal_btn btn addUserBtn'><h5>Create Project</h5></div></div>");
    apm2.append("<div class='row'><div id='projectSaveBtn2' class='modal_btn btn addUserBtn'><h5>Create Project</h5></div></div>");

    let saveButton = $("#projectSaveBtn");
    let saveButton2 = $("#projectSaveBtn2");

    saveButton.bind("click",function()
        {

            let title = $("#project_input_title");
            let titleText = title.val();

            title.val('');
            createProject(getCookie(document.cookie, "userid"),titleText);

            apm.hide();

        }
    );
    saveButton2.bind("click",function()
        {

            let title = $("#project_input_title2");
            let titleText = title.val();

            title.val('');
            createProject(getCookie(document.cookie, "userid"),titleText);

            apm2.hide();

        }
    );

}

    /**
     * Listens for keyup events.
     */
    function keyupListener() {

        window.onkeyup = function(e) {
            if ( e.keyCode === 27 ) {
                //toggleMenuOff();
            }
        }
    }
