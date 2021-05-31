export default {
	getAdminSystemTabs () {
		return [
			{
				name: 'licensing',
				title: 'LICENSINGWEBCLIENT.LABEL_LICENSING_SETTINGS_TAB',
				component () {
					return import('src/../../../LicensingWebclient/vue/components/LicensingAdminSettings')
				},
			},
		]
	},
}
