import settings from '../../LicensingWebclient/vue/settings'

export default {
  moduleName: 'LicensingWebclient',

  requiredModules: ['Licensing'],

  init (appData) {
    settings.init(appData)
  },

  getAdminSystemTabs () {
    return [
      {
        tabName: 'licensing',
        title: 'LICENSINGWEBCLIENT.LABEL_LICENSING_SETTINGS_TAB',
        component () {
          return import('src/../../../LicensingWebclient/vue/components/LicensingAdminSettings')
        },
      },
    ]
  },
}
