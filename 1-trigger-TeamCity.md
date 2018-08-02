# Triggering a Teamcity build from a push GitHub

This guide will demonstrate how to get Teamcity to build your project every time your soure code is changed and pushed to GitHub.
## Prerequisites
+ Java(JRE). Supported are:
    + Oracle java 8 and updates
    + OpenJDK 8
+ Download and install TeamCity in https://www.jetbrains.com/teamcity/download/
+ TeamCity account
+ GitHub repository
## 1. Sign in to Teamcity 
+ Start TeamCity server by running the following in your terminal:
    ```
     cd TeamCity/bin
     ./runAll.sh start
    ```
By default, TeamCity will run on  http://localhost:8111.

![alt text](./assets/run_server.png )

+ Enter your TeamCity username and password then click `Log in`. 

![alt text](./assets/login.png )

## 2. Configuring TeamCity
+ Click on `Administration` then click button `Create project`.

![alt text](./assets/creat_project.png )

+ Enter 'Project Name' and 'Project ID' then click button `Create`.

![alt text](./assets/info_project.png )

+ Click button `Create build configuration` on the right column. 

![alt text](./assets/creat-build.png )

+ Enter Build configuration Name then click button `Create`.

![alt text](./assets/inf_creatbuild.png )
+ Configure the Branch Specification under the VCS root:
    + Click `Show advanced options` to  see advanced options.
    + In the `Type of VCS`, choose 'Git' and fill in the required information. 
>Note:  
> + `+refs/pull/*/merge`:    When a pull request is made, GitHub automatically creates a reference that holds the pull request as well as one that is a merge with the master branch.
> + If you want to build the branch, without merging, you could use the following: `+:refs/pull/*/head`.

![alt text](./assets/VCS.png )

+ Click button `Test conection`, a dialog appears and announces 'success' or 'fail'. If successful, click the button `Create`. Else, check your information.

![alt text](./assets/connect.png )

+ On the left navigation bar, click on `Triggers`, then click on `Add new trigger`.

![alt text](./assets/click_trigger.png )

+ Choose 'VCS trigger' and click on `Save`

![alt text](./assets/trigger.png )

+ Now, when you push to GitHub, you can see the TeamCity auto build. 

![alt text](./assets/running.png )