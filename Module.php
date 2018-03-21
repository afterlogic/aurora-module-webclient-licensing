<?php

namespace Aurora\Modules\LicensingWebclient;

class Module extends \Aurora\System\Module\AbstractModule
{
	protected $LicenseKey = null;
	
	public function GetSettings()
	{
		\Aurora\System\Api::checkUserRoleIsAtLeast(\Aurora\System\Enums\UserRole::SuperAdmin);

		$aModuleSettings = array(
			'TrialKeyLink' => $this->getConfig('TrialKeyLink', false),
			'PermanentKeyLink' => $this->getConfig('PermanentKeyLink', false)
		);
		
		return $aModuleSettings;
	}
}
