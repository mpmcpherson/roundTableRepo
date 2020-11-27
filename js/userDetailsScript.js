/**
 * Created by typhon on 1/27/2016.
 */
function buildChart(categoryList, datalabel, dataPoints, targetDIV) {
    $('#'+targetDIV).highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: categoryList,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: datalabel,
            data: dataPoints

        }]
    });
}
function drawPermissionsOutput(responseText) {

    //console.log(responseText);
}

function drawOutput(responseText) {//this is going to need a ton of work

    //console.log(responseText);
    var data = JSON.parse(responseText);

    //console.log(data);

    var dropDown = $("#permissionLevelSelector");

    if(data == undefined) {
        dropDown.append('<option value = "noPermission">select a level</option>');
    }else {
        for (var val in data) {

            dropDown.append('<option value = ' + data[val][1] + '>' + data[val][0] + '</option>');
            //console.log(val + ": " + data[val]);
        }
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

// handles drawing an error message
function drawError() {

    var container = document.getElementById('case');
    container.innerHTML = 'An error occurred while loading your project; please try again or contact support @ support@mpmcpherson.com';
}



function loadPermissionsDropdown(){
    var inp = document.getElementById('userDetailsInput');

    var user_id = inp.value;

    var params = "user_id="+user_id;
    getRequest(
        'loadPermissionsDropdown.php', // URL for the PHP file
        drawOutput,   // handle successful request
        drawError,      // handle error
        params
    );
}

function loadHistory(){
    var inp = document.getElementById('userDetailsInput');

    var user_id = inp.value;

    var params = "user_id="+user_id;
      getRequest(
        'loadHistory.php', // URL for the PHP file
        displayHistory,   // handle successful request
        drawError,      // handle error
        params
    );
}

function displayHistory(results)
{
    var data = JSON.parse(results);
    //console.log(data);
    var container = document.getElementById('historyContainer');
    //console.log(container);

//experimenting with something from work
    var table = document.createElement('table');
    container.appendChild(table);
    table.classList.add('table');
    table.classList.add('table-striped');


    var theader = document.createElement('thead');
    table.appendChild(theader);

/*
    var headerRow = document.createElement('div');
    headerRow.id = "header";
    headerRow.classList.add('row');

    container.appendChild(headerRow);
*/

    //clunky headers follow:
    var taskNameDiv = document.createElement('th');
    //taskNameDiv.classList.add('col-lg-2');

    var taskNameText = document.createTextNode('Task Name');
    taskNameDiv.appendChild(taskNameText);
    theader.appendChild(taskNameDiv);

    var projectNameDiv = document.createElement('th');
    //projectNameDiv.classList.add('col-lg-2');

    var projectNameText = document.createTextNode('Project Name');
    projectNameDiv.appendChild(projectNameText);
    theader.appendChild(projectNameDiv);

    var userNameDivInit = document.createElement('th');
    //userNameDivInit.classList.add('col-lg-2');
    //userNameDivInit.classList.add('customDividerBottomProject');

    var userNameText = document.createTextNode('Event Initiating User');
    userNameDivInit.appendChild(userNameText);
    theader.appendChild(userNameDivInit);

    var userNameDivUser = document.createElement('th');
    //userNameDivUser.classList.add('col-lg-2');
    //userNameDivUser.classList.add('customDividerBottomProject');

    //var UUserNameText = document.createTextNode('Event Affected User');
    //userNameDivUser.appendChild(UUserNameText);
    //headerRow.appendChild(userNameDivUser);

    var eventTypeDiv = document.createElement('th');
    //eventTypeDiv.classList.add('col-lg-2');
    //eventTypeDiv.classList.add('customDividerBottomProject');

    var EventTypeText = document.createTextNode('Event Type');
    eventTypeDiv.appendChild(EventTypeText);
    theader.appendChild(eventTypeDiv);


    var tbody = document.createElement('tbody');
    tbody.id = "header";
    tbody.classList.add('row');

    table.appendChild(tbody);
    
    for(var i = 0;i<data.length;i++)
    {
        var rowID = data[i][0];
        var row = document.createElement('tr');
        row.id = rowID;
        //row.classList.add('row');

        tbody.appendChild(row);



        for(var j = 1;j<data[i].length;j++)
        {
            if(j != 4) {
                var cellText = data[i][j];
                var cell = document.createElement('td');
                var value = document.createTextNode(cellText);
                cell.appendChild(value);
                cell.id = rowID + cellText;
                //cell.classList.add('col-lg-2');

                row.appendChild(cell);
            }

            //cell.addClass('col-lg-2');
        }
    }



}

function hasClass(el, className) {
    if (el.classList)
        return el.classList.contains(className);
    else
        return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function addClass(el, className) {
    if (el.classList)
        el.classList.add(className);
    else if (!hasClass(el, className)) el.className += " " + className
}

function removeClass(el, className) {
    if (el.classList)
        el.classList.remove(className);
    else if (hasClass(el, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        el.className=el.className.replace(reg, ' ')
    }
}

function loadTaskCount(){

    var inp = document.getElementById('userDetailsInput');

    var user_id = inp.value;

    var params = "user_id="+user_id;

    getRequest(
        'loadTaskCount.php', // URL for the PHP file
        drawCountChart,   // handle successful request
        drawError,      // handle error
        params
    );
}


function loadTasksByStatus(){

    var inp = document.getElementById('userDetailsInput');

    var user_id = inp.value;

    var params = "user_id="+user_id;

    getRequest(
        'loadTasksByStatus.php', // URL for the PHP file
        drawStatusChart,   // handle successful request
        drawError,      // handle error
        params
    );
}
function drawCountChart(responseText)
{
    var vx = JSON.parse(responseText);

    var val = vx[0];

    var taskCount = 0;
    try{taskCount = parseInt(val[0]);}catch(exception){}

    var name = document.getElementById('username').value;

    buildChart([name],"Number of Assigned Tasks", [taskCount], 'container');
}
function clickListener() {
    document.addEventListener( "click", function(e) {
        if(clickInsideElement(e,"subBtn"))
        {
            savePermissionLevel();
        }

    });
}
function savePermissionLevel()
{
    var permissionDropDownVal = $( "#permissionLevelSelector option:selected").val();

    var inp = document.getElementById('userDetailsInput');
    var user_id = inp.value;

    var params = "newPermission="+permissionDropDownVal+"&user_id="+user_id;
    //console.log(params);
    getRequest(
        'saveNewPermissions.php', // URL for the PHP file
        drawPermissionsOutput,   // handle successful request
        drawError,      // handle error
        params
    );

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

function drawStatusChart(responseText)
{
    var vx = JSON.parse(responseText);
    //console.log(vx);
    var val1 = vx[0];
    var val2 = vx[1];
    var val3 = vx[2];

    var blVal = 0;
    var ipVal = 0;
    var dVal = 0;
    try{blVal = parseInt(val1[0]);}catch(exception){}
    try{ipVal = parseInt(val2[0]);}catch(exception){}
    try{dVal = parseInt(val3[0]);}catch(exception){}

    var taskCount = [blVal, ipVal, dVal];
    var name = ["Backlog","In Progress","Done"];

    buildChart(name,"Tasks by Status", taskCount, 'container2');
}

$(document).ready(
    function(){
        loadPermissionsDropdown();
        loadTaskCount();
        loadTasksByStatus();
        clickListener();
        loadHistory();

    }
);
