# TeamCity-HockeyApp-Appium-ReactNative
Guidance on integrating Kobiton service into the mobile app build pipeline: TeamCity, HockeyApp, Appium and ReactNative.

If you are using:
+ TeamCity to build app
+ HockeyApp to store and distribute application builds
+ Appium to write the automation test
+ React Native to develop the application in

Kobiton is a mobile cloud platform that enables users to perform manual or automated testing on iOS and Android devices. 

Teamcity is a Java-based build management and continuous integration server. TeamCity allows to administer build infrastructures of literally any size from a central Web interface. 

HockeyApp is a service that allows developers to recruit and manage testers, distribute apps, and collect crash reports, among other things.

By using TeamCity, we can automatically deploy app and run app automation test on Kobiton. 

[This guide](integrate-kobiton-teamcity.md) will demonstrate how to automatically execute automation test on Kobiton devices everytimes a new version of the app is deployed to HockeyApp using TeamCity.