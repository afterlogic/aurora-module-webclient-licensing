'use strict';

var
	Types = require('%PathToCoreWebclientModule%/js/utils/Types.js')
;

var Settings = {
	ServerModuleName: 'Licensing',
	HashModuleName: 'licensing',
	
	LicenseKey: '',
	
	init: function (oAppDataSection)
	{
		if (oAppDataSection)
		{
			this.LicenseKey = Types.pString(oAppDataSection.LicenseKey);
		}
	},
	
	update: function (sLicenseKey)
	{
		this.LicenseKey = sLicenseKey;
	}
};

module.exports = Settings;
