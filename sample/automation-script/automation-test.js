import 'babel-polyfill'
import 'colors'
import wd from 'wd'
import {assert} from 'chai'
 const username = process.env.KOBITON_USERNAME
const apiKey = process.env.KOBITON_API_KEY
 const platformVersion = process.env.KOBITON_DEVICE_PLATFORM_VERSION
const platformName = process.env.KOBITON_DEVICE_PLATFORM_NAME
const deviceName = process.env.KOBITON_DEVICE_NAME
const appUrl = process.env.KOBITON_SESSION_APPLICATION_URL
const deviceGroup = process.env.KOBITON_SESSION_DEVICE_GROUP || 'KOBITON'
const deviceUdid = process.env.KOBITON_PRIVATE_DEVICE_UDID
const groupId = process.env.KOBITON_ORGANIZATION_GROUP_ID

 const kobitonServerConfig = {
  protocol: 'https',
  host: 'api.kobiton.com',
  auth: `${username}:${apiKey}`
}
if (deviceName == null) {
  if (platformName == 'Android') {
    deviceName = 'Galaxy*'
  } else if (platformName == 'iOS') {
    deviceName = 'iPhone*'
  }
}
 const desiredCaps = {
  sessionName:        'Automation Test Session',
  sessionDescription: 'Kobiton Automation Test Demo', 
  deviceOrientation:  'portrait',  
  captureScreenshots: true, 
  app:                appUrl, 
  deviceGroup:        deviceGroup, 
  deviceName:         deviceName,
  platformVersion:    platformVersion,
  platformName:       platformName
}
 if (deviceUdid) {
  desiredCaps.udid = deviceUdid
}
 if (groupId) {
  desiredCaps.groupId = groupId
}
 if (platformVersion) {
  desiredCaps.platformVersion = platformVersion
}
 if (!username || !apiKey || !desiredCaps.app) {
  console.log('Error: Environment variables KOBITON_USERNAME, KOBITON_API_KEY and Application URL are required to execute this script')
  process.exit(1)
}
 let driver
 describe('Sample Application Test', () => {
   before(async () => {
    driver = wd.promiseChainRemote(kobitonServerConfig)
     driver.on('status', (info) => {
      console.log(info.cyan)
    })
    driver.on('command', (meth, path, data) => {
      console.log(' > ' + meth.yellow, path.grey, data || '')
    })
    driver.on('http', (meth, path, data) => {
      console.log(' > ' + meth.magenta, path, (data || '').grey)
    })
     try {
      await driver.init(desiredCaps)
    }
    catch (err) {
      if (err.data) {
        console.error(`init driver: ${err.data}`)
      }
    throw err
    }
  })
   after(async () => {
    if (driver != null) {
    try {
      await driver.quit()
    }
    catch (err) {
      console.error(`quit driver: ${err}`)
    }
  }
  })
}) 