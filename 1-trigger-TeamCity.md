# Triggering a Teamcity build from a push GitHub

This guide will demonstrate how to get Teamcity to build your project every time your soure code is changed and pushed to GitHub.
## Table of contents
[1. Set up TeamCity](#1-setup-teamcity)

[2. Configure TeamCity with GitHub](#2-configure-teamcity-with-github)

## 1. Setup TeamCity
+ TeamCity server is a web application that runs within a capable J2EE servlet container. So, you can installing the JDK software and setting JAVA_HOME from [here](https://docs.oracle.com/cd/E19182-01/820-7851/inst_cli_jdk_javahome_t/).

 + Downloads TeamCity from [here](https://www.jetbrains.com/teamcity/download/). 

 + Installing and Configuring the TeamCity server from [this guide](https://confluence.jetbrains.com/display/TCD18/Installing+and+Configuring+the+TeamCity+Server).

 ## 2. Configure TeamCity with GitHub
+ Connect GitHub with TeamCity, you can follow [this guide](http://devexpress.github.io/testcafe/documentation/recipes/integrating-testcafe-with-ci-systems/teamcity.html).
 
 + More information about TeamCity can be found [this tutorial](https://confluence.jetbrains.com/display/TCD10/TeamCity+Documentation).
 + Now that you have a project, you can now start configuring tasks. In the [next guideline](2-run-automation-test.md), we will configure tasks that will allow us run an automation test wwith Kobiton.



