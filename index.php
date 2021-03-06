
<!DOCTYPE html>
<html lang="en">
<head>

    <link rel='stylesheet' type='text/css' href='css/bootstrap.css'>



    <link rel='stylesheet' type='text/css' href='css/linkStyle.css'>
    <meta name='viewport' content='width=device-width, height=device-height, initial-scale=1, maximum-scale=1'>
    <title>The Round Table</title>
    <meta charset='UTF-8'>
    <meta name='keywords' content='project management, task list, todo list, to do list, to-do list, remote team, board, scrum, productivity, efficiency'>
    <meta name='author' content='Bastion Software, LLC'>


    <meta name="description" content="A fully featured SaaS application to organize the things you have to do, today.">
    <meta name="author" content="Bastion Software, LLC">

    <link rel="shortcut icon" href="adminBootstrap/Admin/blue/assets/images/favicon_1.ico">
    <link href="adminBootstrap/Admin/plugins/switchery/switchery.min.css" rel="stylesheet" />
    <link href="adminBootstrap/Admin/plugins/jquery-circliful/css/jquery.circliful.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="css/jquery.dropdown.min.css" />
    <link href="adminBootstrap/Admin/blue/assets/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="adminBootstrap/Admin/blue/assets/css/core.css" rel="stylesheet" type="text/css">
    <link href="adminBootstrap/Admin/blue/assets/css/icons.css" rel="stylesheet" type="text/css">
    <link href="adminBootstrap/Admin/blue/assets/css/components.css" rel="stylesheet" type="text/css">
    <link href="adminBootstrap/Admin/blue/assets/css/pages.css" rel="stylesheet" type="text/css">
    <link href="adminBootstrap/Admin/blue/assets/css/menu.css" rel="stylesheet" type="text/css">
    <link href="adminBootstrap/Admin/blue/assets/css/responsive.css" rel="stylesheet" type="text/css">
    <link rel='stylesheet' type='text/css' href='css/buttonStyle.css'>

    <!--
      Conditionally either load the light or the dark stylesheet. The matching file
      will be downloaded with `highest`, the non-matching file with `lowest`
      priority. If the browser doesn't support `prefers-color-scheme`, the media
      query is unknown and the files are downloaded with `lowest` priority (but
      above I already force `highest` priority for my default light experience).
    -->
    <link rel="stylesheet" href="css/dark.css" media="(prefers-color-scheme: dark)">
    <link rel="stylesheet" href="css/light.css" media="(prefers-color-scheme: light)">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="js/html5shiv.js"></script>
    <script src="js/respond.min.js"></script>
    <![endif]-->

    <script>
/*        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-74059373-1', 'auto');
        ga('send', 'pageview');
*/
    </script>



</head>


<body id="body" class="fixed-left">

<!-- Begin page -->
<div id="wrapper" >

    <!-- Top Bar Start -->
    <div class="topbar">

        <!-- LOGO -->
        <div class="topbar-left">
            <div class="text-center">
                <a href="index.html" class="logo" style="">
                    <img border="0" alt="Bastion Software's Round Table" src="images/The-Round-Table.v01.png" width="65" height="65" >
                    <span>Round Table</span>
                </a>

            </div>
        </div>

        <!-- Navbar -->
        <div class="navbar navbar-default" role="navigation">
            <div class="container">
                <div class="">
                    <div class="pull-left">
                        <button class="button-menu-mobile open-left waves-effect">
                            <i class="md md-menu"></i>
                        </button>
                        <span class="clearfix"></span>
                    </div>


                    <ul class="nav navbar-nav  hidden-xs">
                       <!-- <li><a class="waves-effect">Files</a></li>-->
                        <li class="dropdown">
                            <a href="#" class="" data-toggle="dropdown"
                               role="button" aria-haspopup="true" aria-expanded="false">Projects  <span class="caret"></span></a>
                            <ul id="topProjectDropdown" class="dropdown-menu scrollableDropdown">

                            </ul>
                        </li>
                    </ul>

                    <ul class="nav navbar-nav projectModal hidden-xs">
                        <li class="">
                            <div  class="" data-toggle=""
                                  role="button" aria-haspopup="true" aria-expanded="false"><div id="addProjectBtn"> + Add Project </div> </div>

                        </li>
                    </ul>

                    <ul class="nav navbar-nav projectModal hidden-xs">
                      
                    </ul>

                   

                    <ul id="rightNavSide" class="nav navbar-nav navbar-right pull-right">

                        <li class="hidden-xs">
                            <a id="logOut" class='btn nav waves-effect' role="button">Log Out</a>
                        </li>

                        <li class="dropdown hidden-xs">
                            <!--<a href="#" data-target="#" class="dropdown-toggle waves-effect waves-light"
                               data-toggle="dropdown" aria-expanded="true">
                                <i class="md md-notifications"></i> <span
                                    class="badge badge-xs badge-pink"></span>
                            </a>-->

                            <ul class="dropdown-menu dropdown-menu-lg">
                                <li class="text-center notifi-title">Notification</li>
                                <li class="list-group nicescroll notification-list">
                                <li>
                                    <a href="javascript:void(0);" class=" text-right">
                                        <small><strong>See all notifications</strong></small>
                                    </a>
                                </li>

                            </ul>
                        </li>
                        <li class="hidden-xs">
                            <a class="right-bar-toggle waves-effect waves-light">
                                <i class="md md-settings"></i></a>
                        </li>

                    </ul>
                </div>
                <!--/.nav-collapse -->
            </div>
        </div>
    </div>
    <!-- Top Bar End -->


    <!-- ========== Left Sidebar Start ========== -->
    <div class="left side-menu">
        <div class="sidebar-inner slimscrollleft">

            <div id="sidebar-menu">
                <ul>
                    <li class="menu-title">Main</li>

                    <li id = "showTasks">
                        <a href="#"  class="waves-effect waves-primary"><i class="md md-dashboard"></i><span > Dashboard </span></a>
                    </li>
                    <li id="showProjects">
                        <a href="#"  class="waves-effect waves-primary"><i class="md md-dashboard"></i><span> Projects </span></a>
                    </li>
                    <li id="showUsers">
                        <a href="#"  class="waves-effect waves-primary"><i class="md md-dashboard"></i><span> Users </span></a>
                    </li>
                   <!-- <li id="showTeams">
                        <a href="#"  class="waves-effect waves-primary"><i class="md md-dashboard"></i><span> Teams </span></a>
                    </li>
                    -->

                    <li class="has_sub">
                        <a href="javascript:void(0);" class="waves-effect waves-primary" style="display:none;"><i class="md md-invert-colors-on"></i><span> See Project </span>
                            <span class="menu-arrow"></span></a>
                        <ul class="list-unstyled" id="projectSidebarList">s

                        </ul>
                    </li>

                </ul>
                <div class="clearfix"></div>
            </div>

            <div class="clearfix"></div>
        </div>

     
    </div>
    <!-- Left Sidebar End -->



    <!-- ============================================================== -->
    <!-- Start right Content here -->
    <!-- ============================================================== -->
    <div id="dashboard" class="content-page">
        <!-- Start content -->
        <div class="content">
            <div class="container">

              

                    <div id="taskManagementUI" class='container' >


                        <div id = 'add_container'>

                            <div id = 'buttonHolder' class='container-fluid'><div id='add_task'  class='add_task text-center btn nav-tabs-justified'  ><strong>+</strong>  ADD TASK</div></div>
                        </div>

                            <div class = 'col-lg-4 col-sm-4'>
                                <div class='customDividerTop'></div>
                                <div id='todo' class='text-center'><h3>To Do</h3> </div>
                                <div class='customDividerBottom'></div>
                                <div id='back_log' class='back_log'></div>
                            </div>


                        <div class = 'col-lg-4 col-sm-4'>
                            <div class='customDividerTop'></div>
                            <div id='inProgressHeader' class='text-center'><h3> In Progress </h3></div>
                            <div class='customDividerBottom'></div>
                            <div id='in_progress' class='in_progress'></div>
                        </div>

                        <div class = 'col-lg-4 col-sm-4'>
                            <div class='customDividerTop'></div>
                            <div id='doneHeader' class='text-center'><h3> Complete</h3></div>
                            <div class='customDividerBottom'></div>
                            <div id='done' class='done'></div>
                        </div>


                    </div>

                <div id="ProjectManagementUI" style="display: none;" class='container'>

                    <div id = 'project_container'>
                        <div id = 'addProjectPage' class='container-fluid'><div class='add_task text-center btn nav-tabs-justified'  ><strong>+</strong>  ADD PROJECT</div></div>
                    </div>

                    <div id="projectContainer" class="projectContainer"></div>


                </div>


                <div id="UserManagementUI" style="display: none;" class='container'>
                        <div id='add_user_btn' class = "container-fluid"><div class='add_task text-center bton nav-tabs-justified'><strong>+</strong>  ADD USER</div></div>
                    <div id = 'userContainer'>

                    </div>
                </div>

    <!-- ============================================================== -->
    <!-- End Right content here -->
    <!-- ============================================================== -->


    <!-- Right Sidebar -->
    <div class="side-bar right-bar">
        <div class="nicescroll">
            <ul class="nav nav-tabs tabs">
                
                <li class="active tab">
                    <a href="#messages-2" data-toggle="tab" aria-expanded="true" style="text-align: left;">
                        <span class="visible-xs"><i class="fa fa-envelope-o"></i></span>
                        <span class="hidden-xs">Settings</span>
                        <div class="row" id="pw_reset">Reset password</div>
                        <div class="row" id="user_email_display">Email</div>
                    </a>
                </li>
            </ul>
            <div class="tab-content">
                
                </div>
            </div>
        </div>
    </div>
    <!-- /Right-bar -->

</div>
<!-- END wrapper -->



            <script type='text/javascript' src='js/jquery-3.5.1.min.js'></script>
            <!--script type='text/javascript' src='js/jquery-2.1.3.min.js'></script>-->
<!-- Plugins  -->
<!--<script src="adminBootstrap/Admin/blue/assets/js/jquery.min.js"></script>-->
<script src="adminBootstrap/Admin/blue/assets/js/bootstrap.min.js"></script>
<script src="adminBootstrap/Admin/blue/assets/js/modernizr.min.js"></script>
<script src="adminBootstrap/Admin/blue/assets/js/detect.js"></script>
<script src="adminBootstrap/Admin/blue/assets/js/fastclick.js"></script>
<script src="adminBootstrap/Admin/blue/assets/js/jquery.slimscroll.js"></script>
<script src="adminBootstrap/Admin/blue/assets/js/jquery.blockUI.js"></script>
<!--<script src="adminBootstrap/Admin/blue/assets/js/waves.js"></script>-->
<script src="adminBootstrap/Admin/blue/assets/js/wow.min.js"></script>
<script src="adminBootstrap/Admin/blue/assets/js/jquery.nicescroll.js"></script>
<script src="adminBootstrap/Admin/blue/assets/js/jquery.scrollTo.min.js"></script>
<script src="adminBootstrap/Admin/plugins/switchery/switchery.min.js"></script>

<!-- Counter Up  -->
<script src="adminBootstrap/Admin/plugins/waypoints/lib/jquery.waypoints.js"></script>
<script src="adminBootstrap/Admin/plugins/counterup/jquery.counterup.min.js"></script>

<!-- circliful Chart -->
<script src="adminBootstrap/Admin/plugins/jquery-circliful/js/jquery.circliful.min.js"></script>
<script src="adminBootstrap/Admin/plugins/jquery-sparkline/jquery.sparkline.min.js"></script>

<!-- skycons -->
<script src="adminBootstrap/Admin/plugins/skyicons/skycons.min.js" type="text/javascript"></script>

<!-- Page js  -->
<script src="adminBootstrap/Admin/blue/assets/pages/jquery.dashboard.js"></script>

<!-- Custom main Js -->
<script src="adminBootstrap/Admin/blue/assets/js/jquery.core.js"></script>
<script src="adminBootstrap/Admin/blue/assets/js/jquery.app.js"></script>

<script type="text/javascript" src="js/jquery.ui.widget.js"></script>
<script type="text/javascript" src="js/jquery.dropdown.min.js"></script>
<script type="text/javascript" src="js/jquery.fileupload.js"></script>
<script type="text/javascript" src="js/jquery.iframe-transport.js"></script>
<script type='text/javascript' src='js/app2.js'></script>


<script>
    var resizefunc = [];

     // If `prefers-color-scheme` is not supported, fall back to light mode.
  // In this case, light.css will be downloaded with `highest` priority.
  if (window.matchMedia('(prefers-color-scheme: dark)').media === 'not all') {
    document.documentElement.style.display = 'none';
    document.head.insertAdjacentHTML(
        'beforeend',
        '<link rel="stylesheet" href="/light.css" onload="document.documentElement.style.display = \'\'">'
    );
  }
</script>
<?php require 'webmethods/pierrefrancoisdulac.php'; ?>
</body>
</html>