<template>
  <q-scroll-area class="full-height full-width">
    <div class="q-pa-lg ">
      <div class="row q-mb-md">
        <div class="col text-h5">{{ $t('LICENSINGWEBCLIENT.HEADING_SETTINGS_TAB') }}</div>
      </div>
      <q-card flat bordered class="card-edit-settings">
        <q-card-section>
          <div class="row q-mt-sm q-mb-lg">
            <div class="col-10">
              <q-item-label caption>
                {{ $t('LICENSINGWEBCLIENT.LABEL_LICENSING_HINT') }}
              </q-item-label>
            </div>
          </div>
          <div class="row q-mb-sm">
            <div class="col-2">{{ $t('LICENSINGWEBCLIENT.LABEL_LICENSING_KEY') }}</div>
            <div class="col-5">
              <q-input outlined dense class="bg-white" type="textarea" v-model="key"/>
            </div>
          </div>
          <div class="row q-mb-md">
            <div class="col-2">{{ $t('LICENSINGWEBCLIENT.LABEL_LICENSING_USERS_NUMBER') }}</div>
            <div class="col-9">{{ userCount }}</div>
          </div>
          <div class="row q-mb-md">
            <div class="col-2">{{ $t('LICENSINGWEBCLIENT.LABEL_LICENSING_TYPE') }}</div>
            <div class="col-9"><b>{{ licenseType }}</b></div>
          </div>
        </q-card-section>
      </q-card>
      <div class="q-pa-md text-right">
        <q-btn unelevated no-caps dense class="q-px-sm" :ripple="false" color="primary"
               :label="saving ? $t('COREWEBCLIENT.ACTION_SAVE_IN_PROGRESS') : $t('COREWEBCLIENT.ACTION_SAVE')"
               @click="save"/>
      </div>
    </div>
    <UnsavedChangesDialog ref="unsavedChangesDialog"/>
  </q-scroll-area>
</template>

<script>
import webApi from '../../../AdminPanelWebclient/vue/src/utils/web-api'
import settings from '../../../LicensingWebclient/vue/settings'
import notification from '../../../AdminPanelWebclient/vue/src/utils/notification'
import errors from '../../../AdminPanelWebclient/vue/src/utils/errors'
import UnsavedChangesDialog from 'src/components/UnsavedChangesDialog'
import _ from 'lodash';

export default {
  name: 'Licensing',
  components: {
    UnsavedChangesDialog
  },
  data () {
    return {
      key: '',
      userCount: 0,
      saving: false,
      licenseType: ''
    }
  },
  mounted () {
    this.populate()
    this.GetLicenseInfo()
    this.GetTotalUsersCount()
  },
  beforeRouteLeave (to, from, next) {
    if (this.hasChanges() && _.isFunction(this?.$refs?.unsavedChangesDialog?.openConfirmDiscardChangesDialog)) {
      this.$refs.unsavedChangesDialog.openConfirmDiscardChangesDialog(next)
    } else {
      next()
    }
  },
  methods: {
    GetLicenseInfo () {
      webApi.sendRequest({
        moduleName: 'Licensing',
        methodName: 'GetLicenseInfo',
      }).then(result => {
        if (result) {
          switch (result.Type) {
            case 0:
              this.licenseType = this.$t('LICENSINGWEBCLIENT.LABEL_TYPE_UNLIM');
              break;
            case 1:
              this.licenseType = this.$tc('LICENSINGWEBCLIENT.LABEL_TYPE_PERMANENT_PLURAL', result.Count, { COUNT: result.Count });
              break;
            case 2:
              this.licenseType = this.$tc('LICENSINGWEBCLIENT.LABEL_TYPE_DOMAINS_PLURAL', result.Count, { COUNT: result.Count });
              break;
            case 4:
              if (result.ExpiresIn < 1) {
                this.licenseType = this.$t('LICENSINGWEBCLIENT.LABEL_TYPE_OUTDATED_INFO');
              }
              break;
            case 3:
            case 10:
              this.licenseType = result.Type === 3
                ? this.$tc('LICENSINGWEBCLIENT.LABEL_TYPE_ANNUAL_PLURAL', result.Count, { COUNT: result.Count })
                : this.$t('LICENSINGWEBCLIENT.LABEL_TYPE_TRIAL');
              if (result.ExpiresIn !== '*') {
                if (result.ExpiresIn > 0) {
                  this.licenseType += this.$tc('LICENSINGWEBCLIENT.LABEL_TYPE_EXPIRES_IN_PLURAL', result.ExpiresIn, { DAYS: result.ExpiresIn });
                } else {
                  this.licenseType += this.$t('LICENSINGWEBCLIENT.LABEL_TYPE_EXPIRED') + ' ' + this.$t('LICENSINGWEBCLIENT.LABEL_TYPE_OUTDATED_INFO');
                }
              }
              break;
          }
        } else {
          if (settings.LicenseKey === '') {
            this.licenseType = this.$t('LICENSINGWEBCLIENT.LABEL_TYPE_NOT_SET');
          }
          this.showTrialKeyHint(this.sTrialKeyHint !== '');
        }
      })
    },
    GetTotalUsersCount () {
      webApi.sendRequest({
        moduleName: 'Core',
        methodName: 'GetTotalUsersCount',
      }).then(result => {
        if (result !== false) {
          this.userCount = result
        }
      })
    },
    hasChanges () {
      const data = settings.getLicenseSettings()
      return this.key !== data.licenseKey
    },
    populate () {
      const data = settings.getLicenseSettings()
      this.key = data.licenseKey ? data.licenseKey : ''
    },
    save () {
      if (!this.saving) {
        this.saving = true
        const parameters = {
          LicenseKey: this.key,
        }
        webApi.sendRequest({
          moduleName: 'Licensing',
          methodName: 'UpdateSettings',
          parameters,
        }).then(result => {
          this.saving = false
          if (result === true) {
            this.GetLicenseInfo()
            this.GetTotalUsersCount()
            settings.saveLicenseSettings({
              licenseKey: parameters.LicenseKey
            })
            notification.showReport(this.$t('COREWEBCLIENT.REPORT_SETTINGS_UPDATE_SUCCESS'))
          } else {
            notification.showError(this.$t('COREWEBCLIENT.ERROR_SAVING_SETTINGS_FAILED'))
          }
        }, response => {
          this.saving = false
          notification.showError(errors.getTextFromResponse(response, this.$t('COREWEBCLIENT.ERROR_SAVING_SETTINGS_FAILED')))
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
