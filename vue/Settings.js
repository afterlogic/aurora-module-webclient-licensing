import _ from 'lodash'

class LicenseSettings {
  constructor (appData) {
    const licensing = appData.Licensing
    const licensingWebclient = appData.LicensingWebclient
    if (!_.isEmpty(licensing)) {
      this.licenseKey = licensing.LicenseKey
    }
    if (!_.isEmpty(licensingWebclient)) {
      this.permanentKeyLink = licensingWebclient.PermanentKeyLink
      this.trialKeyLink = licensingWebclient.TrialKeyLink
    }
  }

  saveLicenseSettings ({ licenseKey }) {
    this.licenseKey = licenseKey
  }
}

let settings = null

export default {
  init (appData) {
    settings = new LicenseSettings(appData)
  },
  saveLicenseSettings (data) {
    settings.saveLicenseSettings(data)
  },
  getLicenseSettings () {
    return {
      licenseKey: settings.licenseKey,
      permanentKeyLink: settings.permanentKeyLink,
      trialKeyLink: settings.trialKeyLink
    }
  },
}
