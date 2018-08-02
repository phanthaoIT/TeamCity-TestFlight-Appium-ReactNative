# Triggering a Teamcity build from a push GitHub

This guide will demonstrate how to get Teamcity to build your project every time your source code is changed and pushed to GitHub.
## Prerequisites
+ Java(JRE). Supported are:
    + Oracle java 8 and updates
    + OpenJDK 8
+ Download and install TeamCity
+ TeamCity account
+ GitHub repository
## 1.1. Sign in to Teamcity 
+ You can download and install TeamCity from [here](https://confluence.jetbrains.com/display/TCD10/Installation+Quick+Start).  

+ Start TeamCity server, enter your TeamCity username and password, then click `Log in`.

![alt text](./assets/login.png )
## 1.2 Connect TeamCity with GitHub
+ Now you need to create a project, to do this click on `Projects` and then `Create Project`. 

![alt text](./assets/creat_project.png )

+ You then get the options of which of source control repository you are linking to, I'm going to select "From GitHub".

![alt text](./assets/connect_git.png )

+ The dialog will appear, click `Register TeamCity` to set up OAuth authentication with GitHub.  

![alt text](./assets/add_connect.png )

+ You will be redirected to GitHub. Enter the 'application name', 'homepage URL' and 'authorization callback URL' and click `Register application`.
>Note:
    >+ Copy "Homepage URL" and "authorization callback URL" in the "Add Connection" dialog. 

![alt text](./assets/OAuth.png )

+ A page with "Client ID" and "Client Secret" will open. Copy and paste them to TeamCity and click `Save`. 

![alt text](./assets/get_client.png )

![alt text](./assets/save_connect.png )
## 1.3 Create a project
+ Click `Sign in to GitHub`. 

![alt text](./assets/signin_git.png )

+ The connection set up, you can choose a GitHub reposity from list.

![alt text](./assets/choose_repo.png )

+ Click `Proceed` to creat project from GitHub reposity.

![alt text](./assets/creat.png )

+ Now, when you push to GitHub, you can see the TeamCity auto build. 

![alt text](./assets/running.png )