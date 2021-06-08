import _ from "lodash";

class LicenseSettings {
    constructor(appData) {
        const licensing = appData.Licensing
        if (!_.isEmpty(licensing)) {
            this.licenseKey = licensing.LicenseKey
        }
    }
    saveLicenseSettings({licenseKey}) {
        this.licenseKey = licenseKey
    }
}

let settings = null

export default {
    init (appData) {
        settings = new LicenseSettings(appData)
    },
    saveLicenseSettings(data) {
        settings.saveLicenseSettings(data)
    },
    getLicenseSettings () {
        return {
            licenseKey: settings?.licenseKey || false,
        }
    },
}
