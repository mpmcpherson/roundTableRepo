/**
 * Created by root on 9/13/17.
 */




$(document).ready(function(){

    verifySession();

    //init();


    //addCookie("displayProject", "all");
});

function verifySession()
{

    let session_ID = getCookie(document.cookie, "sessionID");
    let user_ID = getCookie(document.cookie, "userid");

    //if there's no userID, setup the page. If there is, check to make sure it's good.
    console.log("Verifying session");
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



function pageSetup()
{

    //hide the rest of the malarky
    $("#wrapper").hide();

    //create the box
    var loginBox = document.createElement('div');
    loginBox.id = 'login-box';
    loginBox.className="login-popup";
    loginBox.setAttribute("style", "background: #333; padding: 10px; border: 2px solid #ddd; float: left; font-size: 1.2em; position: fixed; top: 40%; left: 42%; z-index: 99999; box-shadow: 0px 0px 20px #999; -moz-box-shadow: 0px 0px 20px #999; -webkit-box-shadow: 0px 0px 20px #999; border-radius: 3px 3px 3px 3px; -moz-border-radius: 3px; -webkit-border-radius: 3px;");

    //create the holder for the spans
    var containerHolder = document.createElement('div');

    //spans
    let username = document.createElement('input');
    username.className='row';
    username.id = "username";
    username.setAttribute("contentEditable",true);
    username.setAttribute("type", "text");
    username.setAttribute("placeholder", "username");
    username.setAttribute("style", "display: block;padding-bottom: 7px; color: #999; font-size: 20px;line-height: 18px;background: #666666;border-bottom: 1px solid #333;border-left: 1px solid #000;border-right: 1px solid #333;border-top: 1px solid #000;color: #fff;border-radius: 3px 3px 3px 3px;-moz-border-radius: 3px;-webkit-border-radius: 3px;padding: 6px 6px 4px;width: 225px;");

    let password = document.createElement('input');
    password.className = 'row';
    password.id = "password";
    password.setAttribute("contentEditable",true);
    password.setAttribute("type", "password");
    password.setAttribute("placeholder", "password");
    password.setAttribute("style", "display: block;padding-bottom: 7px; color: #999; font-size: 20px;line-height: 18px;background: #666666;border-bottom: 1px solid #333;border-left: 1px solid #000;border-right: 1px solid #333;border-top: 1px solid #000;color: #fff;border-radius: 3px 3px 3px 3px;-moz-border-radius: 3px;-webkit-border-radius: 3px;padding: 6px 6px 4px;width: 225px;");

    let submitBtn = document.createElement('button');
    submitBtn.id = "submitbtn";
    let submitBtnText = document.createTextNode("Submit");
    submitBtn.className = "btn btn-primary";
    submitBtn.setAttribute("style","border-color: #000;border-width: 1px;border-radius: 4px 4px 4px 4px;-moz-border-radius: 4px;-webkit-border-radius: 4px;color: #333;cursor: pointer;display: inline-block;padding: 6px 6px 4px;margin-top: 10px;font: 12px;width: 214px;");
    submitBtn.appendChild(submitBtnText);





    //grab the body handle...
    let body = $("#body");
    //console.log(body);
    body.attr("style", "background: #000");

    //attach the loginbox
    body.append(loginBox);

    loginBox.appendChild(username);
    loginBox.appendChild(password);
    loginBox.appendChild(submitBtn);

    positionLogin(document.querySelector(".login-popup"));

    $("#username").focus();
    $("#submitbtn").bind("click",function(){login();});

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
        loginSuccess,
        loginFailure,
        data
    );
}

function loginSuccess(data)
{
    console.log(data);
    $("#displayUserName").text($("#username").val());

    body.setAttribute("style", "background: #f5f5f5");
    $("#wrapper").show();
    $("#login-box").remove();

    //loadProjects();
    //loadNodes();
    //setInterval(function(){loadNodes();},15000);

}

function badVerify(data)
{
    console.log("BadVerify");
    console.log(data)
    pageSetup();
}

function goodSession(data)
{
    console.log("GoodSession");
    //  alert(data);
    body.setAttribute("style", "background: #f5f5f5");
    $("#wrapper").show();
    $("#login-box").remove();
    //loadNodes();

}

function getCookie(inputString, searchTerm)
{
    let v = parseCookie(inputString);
    let x;
    for (let i=0;i<v.length;i++)
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
}

//figure this out
function loginFailure(data){
    console.log("login failed");
    console.log(data);
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
    console.log(req);
    if(params != null){
        console.log(url+"?"+params);
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


function init() {
    //contextListener();
    //clickListener();
    keyupListener();
    loadAddTaskModal();
    let taskButton = $("#add_task");
    let modal =$("#addTaskModal");
    modal.hide();
    taskButton.bind("click",function(e){
        e.stopPropagation();
        if(modal.is(":hidden"))
        {
            modal.show();
        }
    });


    $(document).click(function(event) {
        if(!$(event.target).closest('#addTaskModal').length) {
            if(modal.is(":visible")) {
                modal.hide();
            }
        }
    });

    addProjectModal();
    let projectBtn = $("#addProjectBtn");
    let projectModal = $("#addProjectModal");

    projectModal.hide();
    projectBtn.bind("click",function(e){
        e.stopPropagation();
        if(projectModal.is(":hidden"))
        {
            projectModal.show();
        }
    });


    $(document).click(function(event) {
        if(!$(event.target).closest('#addTaskModal').length) {
            if(projectModal.is(":visible")) {
                projectModal.hide();
            }
        }
    });


}


function keyupListener() {

    window.onkeyup = function(e) {
        if ( e.keyCode === 27 ) {
            //toggleMenuOff();
        }
    }
}

