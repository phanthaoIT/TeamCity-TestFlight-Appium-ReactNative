# Running Automation test with Kobiton
This guide will demonstrate how to run an automation test with Kobiton on Teamcity.
## Table of contents
[1. Setup TeamCity](#1-setup-teamcity)

[2. Write the automation test script](#2-write-the-automation-test-script)

[3. Configure your TeamCity project for Kobiton testing](#3-configure-your-teamcity-project-for-kobiton-testing)

[4. Call Kobiton REST API to get session information](#4-call-kobiton-rest-api-to-get-session-information)
## Prerequisites 
- Java(JRE). Supported are:
  + Oracle java 8 or higher
  + OpenJDK 8
- Kobiton account
## 1. Setup TeamCity
This part will guide you how to setup TeamCity and configure TeamCity with GitHub. Skip step if you already have TeamCity setup.
 + For the introduction on how to install and configure the TeamCity server, follow [this guide](https://confluence.jetbrains.com/display/TCD18/Installing+and+Configuring+the+TeamCity+Server).

Set up your project and link your app repository that we will test with Kobiton later.
+ Connect GitHub with TeamCity, you can follow [this guide](https://confluence.jetbrains.com/display/TCD10/Integrating+TeamCity+with+VCS+Hosting+Services).
 
  > For more information about TeamCity can be found in [this tutorial](https://confluence.jetbrains.com/display/TCD10/TeamCity+Documentation).

## 2. Write the automation test script
> Kobiton already provide samples for automation test script on multiple languages. Visit [here](https://github.com/kobiton/samples) for references.
**This guideline will use a Node JS script as an example.**
### 2.1 Prepare automation tese script
 > You can visit [our blog](https://kobiton.com/blog/automation-web-appium-kobiton-nodejs/) for more detail in setting up an automation test script. 
+ **Username and API key**
  
  Go to https://portal.kobiton.com to get your 'Username' and 'API key'

+ **Desired capabilities**

  Kobiton provides the so-called Automation Settings for each device on which you want to run tests. Actually Automation Settings are the desired capabilities that need to be added to the Appium test script in order for tests to be executed on the Kobiton devices.

  + In the navigation bar at the top of the Kobiton website, select `Devices`.
 
    ![alt text](./assets/devices.png )
 
  + Hover over any device that you want to test with and click on the Automation settings button. A dialog box will then appear on screen.
 
    ![alt text](./assets/click_auto.png )
 
  + On the left hand side, you can select your preferred language, App Type, etc.
 
    ![alt text](./assets/automation.png ) 
### 2.2 Write automation test script
+ Kobiton already provide some example for basic automation test. 
  + Go to https://github.com/kobiton/samples
  + Clone the repository to your local machine.
  + Choose the testing language. In this guideline, we will use the NodeJS.
  + Open testing script file. You can choose either web test or app test on Android or iOS. We will use android-app-test.js file as an example to test Android app with Kobiton.

+ Replace the Kobiton `Username`, `API key` and `desiredCaps` that collected from above part to the script. You can attach an enviroment variable to TeamCity in the [next step](#3-configure-your-teamcity-project-for-kobiton-testing).

Example:

```javascript
const username = process.env.KOBITON_USERNAME
const apiKey = process.env.KOBITON_API_KEY
 const kobitonServerConfig = {
  protocol: 'https',
  host: 'api-test.kobiton.com',
  auth: `${username}:${apiKey}`
}
 var desiredCaps = {
  sessionName:        'Automation test session',
  sessionDescription: '', 
  deviceOrientation:  'portrait',  
  noReset:            true,
  fullReset:          false, 
  captureScreenshots: true,
  app:                {your_app_id}, 
  udid:               {your_device_udid}
}
```

## 3. Configure your TeamCity project for Kobiton testing
You can attach an enviroment variable to TeamCity(Optional).
+ In your project in TeamCity, on the left side of the page, click on 'Parameters'. Then click the `Add new parameter` button. 

![alt text](./assets/param.png )

+ Add your Kobiton username and API key.

![alt text](./assets/param_name.png )

![alt text](./assets/param_key.png )

Now, we will add a build step to run automation test.
+ In your Teamcity project, on the left side on the page, click on 'Build Step' to set build steps.
+ On the right side of the page,  for the 'Runner type' category, choose 'Command Line '.
+ Add below command to `Custom script` part.

```
  cd javascript
  npm install
  npm run android-web-test
```
> Note:
> + `npm install` is the command if you using NodeJS 
> + `npm run android-web-test` is the command to run the test script

![alt text](./assets/cmd.png )
+ Push your changes to GitHub. TeamCity  will install the neccessary dependencies and then run the test on Kobiton. 

![alt text](./assets/build_complete.png )

+ Now, go to https://portal.kobiton.com/ and select `Session` to see if a test session was created.
## 4. Call Kobiton REST API to get session information

Kobiton already provides a Node.js sample on how to get session information, get session commands using Kobiton REST API. 
+ Go to https://github.com/kobiton/samples
+ Go to the 'REST API' folder and follow the instruction in `README.md` file.
-------
You can now run automation tests with Kobiton from TeamCity!