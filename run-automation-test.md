# Running Automation test with Kobiton

TeamCity is a popular continuous integration server that supports a variety of different version control systems and build runners. Octopus Deploy and TeamCity can work together to make automated, continuous delivery easy.

Kobiton allows managing real mobile devices, users can easily setup and perform automation test. 

This document will guide how to automation test an app use TeamCity to automatically execute the test on Kobiton devices.


## Table of contents
+ [Prerequisites](#prerequisites)
+ [1. Configure TeamCity and integrate with GitHub](#1-configure-teamcity-and-integrate-with-github)
+ [2. Configure automation test script](#2-config-automation-test-script)
+ [3. Run automation test on Kobiton devices](#3-run-automation-test-on-kobiton-devices)
+ [4. Fetch test session data through Kobiton REST API](#4-fetch-test-session-data-through-kobiton-rest-api)
+ [5. Feedback](#5-feedback)
## Prerequisites 
- Java(JRE). Supported are:
  + Oracle java 8 or higher
  + OpenJDK 8
- Kobiton account
    >Please visit https://portal.kobiton.com/register to create new account.
## 1. Configure TeamCity and integrate with GitHub
Firstly, let's assume you already have an empty GitHub repository for running automation test.

This part will guide you to how to configure TeamCity to integrate with your automation test GitHub repository. Skip this step if you have already had TeamCity setup.
 + For instruction on how to install and configure TeamCity server, follow [this guide](https://confluence.jetbrains.com/display/TCD18/Installing+and+Configuring+the+TeamCity+Server).

Set up your project and link your app repository that we will test with Kobiton later.
+ Instruction on how to integrate GitHub with TeamCity can be found [here](https://confluence.jetbrains.com/display/TCD10/Integrating+TeamCity+with+VCS+Hosting+Services).
 
>For more information about TeamCity can be found in [this tutorial](https://confluence.jetbrains.com/display/TCD10/TeamCity+Documentation).

## 2. Configure automation test script
### 2.1 Get Username and API key
Go to https://portal.kobiton.com and login to your Kobiton account.
- Username
  + Click *user icon* -> **"Profile"** (you might find it in the top right corner)

  ![get username](./assets/username.png )

- API key 
  + Click *user icon* -> **"Settings"**

  ![get api key](./assets/api_key.png )

### 2.2 Get desired capabilities
The desired capabilities need to be added to the automation test script to allow the test to be executed on Kobiton device.
  + Click **Devices** in the top navigation bar.
 
    ![click devices](./assets/devices.png )
 
  + Hover over any device you want to test with and click on the Automation settings button (the gear symbol).
 
    ![click auto](./assets/click_auto.png )
 
  + On the left-hand side, you can select your preferred language, App Type, etc.
  In this example, we use **NodeJS** as the default language of the script. Therefore, choose **NodeJS** in `Language` section and **Hybrid/Native from Apps** in `App type` section.

    ![click auto](./assets/automation.png ) 
### 2.3 Configure automation test script
Kobiton has already provided sample scripts for automation testing, visit [here](https://github.com/kobiton/samples) for reference. 
> Note: In this guideline, we will use the Node.js sample (samples/javascript folder) as an example.

Open automation test script file in your repository or create a new one.

Add necessary variables as well as `kobitonServerConfig` and `desiredCaps` in the script with ones collected in the previous step.

Example:

```javascript
const username = '<YOUR_KOBITON_USERNAME>'
const apiKey = '<YOUR_KOBITON_API_KEY>'
const kobitonServerConfig = {
  protocol: 'https',
  host: 'api-test.kobiton.com',
  auth: `${username}:${apiKey}`
}
var desiredCaps = {
  sessionName:        'Automation test session',
  sessionDescription: '', 
  deviceOrientation:  'portrait',  
  captureScreenshots: true, 
  app:                '<APP_URL>', 
  deviceGroup:        'KOBITON', 
  deviceName:         '<DEVICE_NAME>',
  platformVersion:    '<DEVICE_VERSION>',
  platformName:       '<DEVICE_PLATFORM_NAME>' 
}
```
### 2.4 Configure TeamCity project
Follow steps below to setup TeamCity for automation testing.

>Note: In this example, we will be running Android App Testing. Therefore, we will use `android-app-test` script.

1. In your TeamCity project, on the left side of the page, click **Build Steps** -> **Add build step** to set build steps.

![build step](./assets/build_step.png)

2. On the right side of the page, for the **Runner type** category, choose **Command Line**.
3. Add below commands in **Custom script** section.

```
  npm install
  npm run android-app-test
```
![command](./assets/cmd.png)

**(Optional) Attaching environment variable to Teamcity**
+ In your project in TeamCity, on the left side of the page, click **Parameters**. Then click **Add new parameter** button. 

![parameters](./assets/param.png)

+ Add your Kobiton username and API key.

![env.username](./assets/param_name.png)

![env.apikey](./assets/param_key.png)

+ Open your test script, replace your Kobiton username and API key with enviromental variable name in `kobitonServerConfig`.

```javascript
const username = process.env.KOBITON_USERNAME
const apiKey = process.env.KOBITON_API_KEY

var kobitonServerConfig = {
  protocol: 'https',
  host: 'api.kobiton.com',
  auth: `${username}:${apiKey}`
}
```
## 3. Run automation test on Kobiton devices
+ Push your changes to GitHub. TeamCity will install necessary dependencies and then run the test on Kobiton. Click the last build, choose **Build Log**, you can see a build log is an enhanced console output of a build.

![log teamcity](./assets/build_complete.png )

+ Go to https://portal.kobiton.con/sessions to check your testing session status.

![sessions](./assets/session.png )
## 4. Fetch test session data through Kobiton REST API

+ Kobiton already provides Node.js samples on how to get session information, session commands using Kobiton REST API. 
+ Go to https://github.com/kobiton/samples/rest-api and follow the instructions.
## 5. Feedback
If you have any issue, you can contact Kobiton for more support.
- Go to https://portal.kobiton.com
- In the navigation bar at the top of the page, click on **Support**.
![support](./assets/support.png )
 - Fill in the information for your request and submit your ticket. 
  
![submit](./assets/submit.png)