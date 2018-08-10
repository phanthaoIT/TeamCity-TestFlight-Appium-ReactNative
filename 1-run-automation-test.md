# Running Automation test with Kobiton
This guide will demonstrate how to run an automation test with Kobiton on Teamcity.
## Table of contents
[1. Setup TeamCity](#1-setup-teamcity)

[2. Prepare Kobiton configuration for executing automation testing](#2-prepare-kobiton-configuration-for-executing-automation-testing)

[3. Write the automation test script](#3-write-the-automation-test-script)

[4. Configure your TeamCity project for Kobiton testing](#4-configure-your-teamcity-project-for-kobiton-testing)

[5. Call Kobiton REST API to get session information](#5-call-kobiton-rest-api-to-get-session-information)
## Prerequisites 
- Java(JRE). Supported are:
  + Oracle java 8 and updates
  + OpenJDK 8
- Kobiton account
## 1. Setup TeamCity
This part will guide you setup TeamCity and configure TeamCity with GitHub. Skip step if you already have TeamCity setup.
 + You can download TeamCity from [here](https://www.jetbrains.com/teamcity/download/).  
 + For introduce on how to install and configure the TeamCity server, follow [this guide](https://confluence.jetbrains.com/display/TCD18/Installing+and+Configuring+the+TeamCity+Server).

Set up your project and link your app repository that we will test with Kobiton later.
+ Connect GitHub with TeamCity, you can follow [this guide](http://devexpress.github.io/testcafe/documentation/recipes/integrating-testcafe-with-ci-systems/teamcity.html).
 
+ More information about TeamCity can be found in [this tutorial](https://confluence.jetbrains.com/display/TCD10/TeamCity+Documentation).

## 2. Prepare Kobiton configuration for executing automation testing 
If you do not have a Kobiton account yet, go ahead to [create a free trial account](https://kobiton.com/freetrial/) and sign in. It takes just a few moments.

**a. Get Kobiton Username**
  + Go to  https://portal.kobiton.com
  + In the upper right hand corner, click on User icon and in the drop down menu, select 'Profile'.

![alt text](./assets/click_profile.png )

+ You should see your username.

![alt text](./assets/username.png )

**b. Get Kobiton API key**
+ Click on user icon in the upper right hand corner again and select 'Setting'.

![alt text](./assets/click_setting.png )

+ You will see your API key under the 'API Keys'. 

![alt text](./assets/api_key.png )

**c. Get Desired cap**

Kobiton provides the so-called Automation Settings for each device on which you want to run tests. Actually Automation Settings are the desired capabilities that need to be added to the Appium test script in order tests to be executed on the Kobiton devices.
+ In the navigation bar at the top of the Kobiton website, select `Devices`.

![alt text](./assets/devices.png )

+ Hover over any device and click on the Automation settings button. A dialog box will then appear on screen.

![alt text](./assets/click_auto.png )

+ On the left hand side, you can select your preferred language, App Type...

![alt text](./assets/automation.png )

## 3. Write the automation test script
+ Kobiton already provide some example for basic automation test. For samples of automation tests, go to https://github.com/kobiton/samples .
+ Choose a language for your test script, and decide whether you want to test on Android or IOS , and either do a web test or an app test. 
+ Make sure in the code you specify your Kobiton username, API key and replace the `desiredCaps`.

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

## 4. Configure your TeamCity project for Kobiton testing
You can attach an enviroment variable to TeamCity(Optional).
+ In your project in TeamCity, on the left side on the page, click on 'Parameters'. Then click buton `Add new parameter`. 

![alt text](./assets/param.png )

+ Add your Kobiton username and API key.

![alt text](./assets/param_name.png )

![alt text](./assets/param_key.png )

Now, we will add a build step to run automation test.
+ In your project in TeamCity, on the left side on the page, click on 'Build Step' to set build steps.
+ On the right side of the page,  for the 'Runner type' category, choose 'Command Line '.
+ Add command lines to your script content.

Example: 
```
  cd javascript
  npm install
  npm run android-web-test
```
> Note:
> + `npm install` is the command if you using NodeJS 
> + `npm run android-web-test` is the command to run the test script

![alt text](./assets/cmd.png )
+ Now, try a build on Teamity and check Kobiton cloud devices to see if a test session was created.

## 5. Call Kobiton REST API to get session information
**a. Get the automation session data through Kobiton REST API**

To make a request:

+ Encode your credentials in base64 for HTTP Basic Authentication, you may use below command and note the text result:

```
  echo -n <your username>:<your api key>
```
+ To send an API request:
```
  curl -X GET https://api.kobiton.com/v1/{request_path}
  -H 'Authorization: Basic dGVzdHVzZXI6MTIzZWQtMTIzZmFjLTkxMzdkY2E='
  -H 'Accept: application/json'
``` 
**Get Application info** 
```
  GET /apps/{application_ID}
```
You can get your application ID in your desiredCaps. If you find your application ID, you can select `Apps` in the navigation bar at the top of the Kobiton website.

![alt text](./assets/apps.png )

**Get session info**
```
  GET /session/{sessionID}
```
Response elements:

+ `state`: Test final result
+ `deviceBooked`: Check if the device is booked
+ `log`: The log URL and video URL

For more information, go to https://api.kobiton.com/docs/

**Get session Commands**
```
  GET /session/{sessionId}/commands
```
To get a certain page of your commands, add page parameter in your query.

For example: GET /session/{sessionId}/commands?page=2

**b. Final result**

The test is either a success or failure.

**Failure Case**

+ Error: "The environment you requested was unavailable."
  
  + This means that the device you selected is already booked. Either select a different device or wait a few moments until your device becomes available.

+ Other

  + Contact Kobiton for support
  + Go to https://portal.kobiton.com/
  + In the navigation bar at the top of the page, click on 'Support'

  ![alt text](./assets/support.png )

  + Fill in the information for your request and submit your ticket

  ![alt text](./assets/submit.png )
