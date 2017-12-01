'use strict';

var
	_ = require('underscore'),
	
	Types = require('%PathToCoreWebclientModule%/js/utils/Types.js')
;

module.exports = {
	ServerModuleName: 'Licensing',
	HashModuleName: 'licensing',
	
	LicenseKey: '',
	
	/**
	 * Initializes settings from AppData object sections.
	 * 
	 * @param {Object} oAppData Object contained modules settings.
	 */
	init: function (oAppData)
	{
		var oAppDataSection = oAppData[this.ServerModuleName];
		
		if (!_.isEmpty(oAppDataSection))
		{
			this.LicenseKey = Types.pString(oAppDataSection.LicenseKey, this.LicenseKey);
		}
	},
	
	/**
	 * Updates new settings values after saving on server.
	 * 
	 * @param {string} sLicenseKey
	 */
	update: function (sLicenseKey)
	{
		this.LicenseKey = sLicenseKey;
	}
};
