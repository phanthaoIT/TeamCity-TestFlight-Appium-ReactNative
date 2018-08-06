# Running Automation test with Kobiton
## 2.1. Get require Params
+ Go to  https://portal.kobiton.com

**a. Get Kobiton Username**
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
+ In the navigation bar at the top of the Kobiton website, select `Devices`.

![alt text](./assets/devices.png )

+ Hover over any device and click on the Automation settings button. A dialog box will then appear on screen.

![alt text](./assets/click_auto.png )

+ On the left hand side, you can select your preferred language, App Type...

![alt text](./assets/automation.png )

## 2.2. Write the automation test script
**a. Write the script**
+ For samples of automation tests, go to https://github.com/kobiton/samples .
+ Choose a language for your test script, and decide whether you want to test on Android or IOS , and either do a web test or an app test. 
+ Make sure in the code you specify your Kobiton username, API key and information under desiredCaps.

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

**b. Configure in your TeamCity project**
+ In your project in TeamCity, on the left side on the page, click on 'Build Step' to set build steps.
+ On the right side of the page,  for the 'Runner type' category, choose 'Command Line '.
+ Add command lines to your script content. 

Example:
```
  cd javascript
  npm install
  npm run android-web-test
```

![alt text](./assets/cmd.png )
+ Now, try a build on Teamity and check Kobiton cloud devices to see if a test session was created.

## 2.3. Call Kobiton REST API to get session information
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
