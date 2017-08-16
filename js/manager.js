'use strict';

module.exports = function (oAppData) {
	var
		_ = require('underscore'),
		
		App = require('%PathToCoreWebclientModule%/js/App.js'),

		Settings = require('modules/%ModuleName%/js/Settings.js'),
		oSettings = _.extend({}, oAppData[Settings.ServerModuleName] || {}, oAppData['%ModuleName%'] || {}),
		
		bAdminUser = App.getUserRole() === Enums.UserRole.SuperAdmin
	;
	
	Settings.init(oSettings);
	
	if (bAdminUser)
	{
		return {
			start: function (ModulesManager) {
				var TextUtils = require('%PathToCoreWebclientModule%/js/utils/Text.js');
				ModulesManager.run('AdminPanelWebclient', 'registerAdminPanelTab', [
					function(resolve) {
						require.ensure(
							['modules/%ModuleName%/js/views/LicensingAdminSettingsView.js'],
							function() {
								resolve(require('modules/%ModuleName%/js/views/LicensingAdminSettingsView.js'));
							},
							"admin-bundle"
						);
					},
					Settings.HashModuleName,
					TextUtils.i18n('%MODULENAME%/LABEL_LICENSING_SETTINGS_TAB')
				]);
			}
		};
	}
	
	return null;
};
