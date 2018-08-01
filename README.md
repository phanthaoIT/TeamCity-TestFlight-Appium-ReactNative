# Running Automation test with Kobiton
## Table of contents
+ [A. Preparation](#a-preparation)
  + [1. Gettting Kobiton username and API key](#1-gettting-kobiton-username-and-api-key)
  + [2. Sample](#2-sample)
+ [B. Setup](#b-setup)
  + [1. Getting desired capabilities](#1-getting-desired-capabilities)
  + [2. Configuring automation test script](#2-configuring-automation-test-script)
  + [3. Configuring TeamCity project](#3-configuring-teamcity-project)
+ [C. Execution](#c-execution)
  + [1. Runnig automation test on Kobiton devices](#1-running-automation-test-on-kobiton-devices)
  + [2. Fetch test session data through Kobiton REST API](#2-fetch-test-session-data-through-kobiton-rest-api)
+ [D. Feedback](#d-feedback)
## A. PREPARATION
### 1. Gettting Kobiton username and API key
In order to execute test on Kobiton, these two must-have parameters must be provided: Username and API key. They are necessary for authenticating with Kobiton.

> If you don't have a Kobiton account, visit https://portal.kobiton.com/register to create an account.

Follow the instruction at `IV. Configure Test Script for Kobiton` section on [our blog article](https://kobiton.com/blog/tutorial/parallel-testing-selenium-webdriver/) to get Kobiton username and API key.

### 2. Sample
In this repository, we have already provided samples for executing automation test with Kobiton through TeamCity:
  -  [ios-app-test.js](../sample/automation-script/ios-app-test.js): script for execute automation test on Kobiton iOS devices.
  -  [android-app-test.js](../sample/automation-script/android-app-test.js): script for execute automation test on Kobiton Android devices.

To use the provided sample, follow these steps:
1. Fork this repository: https://github.com/kobiton/TeamCity-HockeyApp-Appium-ReactNative
2. In your TeamCity project, create a `Build configurations` to use the forked repository. If you don't know how to do it, please follow [TeamCity document](https://confluence.jetbrains.com/display/TCD18/Build+Configuration+Template) for instructions.
3. Clone the forked repository to configure in the next steps.
## B. SETUP
### 1. Getting desired capabilities
Desired capabilities need to be added to the automation test script to allow the test to be executed on Kobiton device. The desiredCap are just matching only for one device. If you want to test on other devices, please make sure noted the different and customize as your need. 

In the provided sample automation test scripts, we have pre-configured them to execute the provided sample application(s) on one of the available device(s) that has the name `Galaxy` for `Android` and `iPhone` for iOS. If you want to use other specific device(s), follow the instruction below to get the corresponding desired capabilities for that device(s).

Kobiton has already provided two sample applications for testing on Android and iOS:
+ `ApiDemos-debug` app on Android: https://appium.github.io/appium/assets/ApiDemos-debug.apk
+ `UIKitCatalog-Test-Adhoc` app on iOS: https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/UIKitCatalog-Test-Adhoc.ipa

**How to get desired capabilities**

In this tutorial, we will be showing how to get desired capabilities for executing automation test of provided sample application `ApiDemos-debug` on `Pixel 2 XL 8.1.0`.
  1. Go to https://portal.kobiton.com and login to your Kobiton account.
  2. Click **Devices** in the top navigation bar.

  ![click devices](./docs/assets/devices.png)
 
  3. Hover over any device you want to test with and click on Automation settings button (the one with gear symbol).
 
  ![click auto](./docs/assets/gear-button.png)
 
  4. On the left-hand side, you can select your preferred language, App Type, etc.

  - In this example, we use **NodeJS** as the default language of the script. Therefore, choose **NodeJS** in `Language` section.
  - Select **Hybrid/Native from Url** in `App type` section then pass the provided app url to `Application Url` section. 
  
Kobiton automatically generates your desired capabilities into code based on the selected options.

  ![desiredcaps android](./docs/assets/desiredcaps_android.png) 
### 2. Configuring automation test script
In the `automation-script` folder, we have provided two sample scripts for executing automation test on Kobiton iOS and Android devices.

As mentioned above, the desired capabilities in provided automation test scripts have already been pre-configured. If you have chosen custom desired capabilities, please follow steps below to apply the collected desired capabilities.

1. Open `android-app-test.js` if you want to execute test on Android or open `ios-app-test.js` if you want to execute test on iOS devices.

2. Replace `desiredCaps` in the script with one collected in the previous step.

Example of desired capabilities for executing `ApiDemos-debug` application on `Pixel 2 XL` running `Android 8.1.0`:
```javascript
const desiredCaps = {
  sessionName:        'Automation test session',
  sessionDescription: 'Demo Automation Test on Android', 
  deviceOrientation:  'portrait',  
  captureScreenshots: true, 
  app:                'https://appium.github.io/appium/assets/ApiDemos-debug.apk', 
  deviceGroup:        'KOBITON', 
  deviceName:         'Pixel 2 XL',
  platformVersion:    '8.1.0',
  platformName:       'Android' 
}
```
> More information about automation testing with Kobiton can be found at https://docs.kobiton.com/automation-testing/automation-testing-with-kobiton/.
### 3. Configuring TeamCity project
**Attaching environment variables to TeamCity**

Add your Kobiton username and API key as environment variables.

 ![env](./docs/assets/env.png)

**Setup TeamCity automation test**

In your project configuration, add a build step with `Command Line` as runner type and custom scripts.

![command](./docs/assets/cmd.png)

Replace the variable `<TEST_SCRIPT>` in execute command as:
- `npm run android-app-test`: if you want to execute automation test on Android.
- `npm run ios-app-test`: if you want to execute automation test on iOS
## C. EXECUTION
### 1. Running automation test on Kobiton devices
+ After doing above steps, push your modified test script(s) to your GitHub repository. TeamCity will install necessary dependencies and then execute the test on Kobiton.

![log teamcity](./docs/assets/build_complete.png)

+ Go to https://portal.kobiton.con/sessions to check your test session status.

![sessions](./docs/assets/session.png )
### 2. Fetch test session data through Kobiton REST API

Kobiton already provides samples written in NodeJS to get session information, session commands using Kobiton REST API.

Follow the instruction at https://github.com/kobiton/samples/tree/master/kobiton-rest-api.

## D. FEEDBACK 
If you have further information or any issue(s), feel free to contact Kobiton for more support.
1. Go to https://portal.kobiton.com
2. In the navigation bar at the top of the page, click **Support**.

![support](./docs/assets/support.png)

3. Fill in the information for your request and click **Submit**.
  
![submit](./docs/assets/submit.png)