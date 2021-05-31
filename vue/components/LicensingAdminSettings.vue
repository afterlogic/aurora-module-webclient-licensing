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
          <div class="row">
            <div class="col-2">{{ $t('LICENSINGWEBCLIENT.LABEL_LICENSING_KEY') }}</div>
            <div class="col-5">
              <q-input outlined dense class="bg-white" type="textarea" v-model="sKey" />
            </div>
          </div>
          <div class="row q-mt-sm q-mb-lg">
            <div class="col-10">
              <q-item-label caption>
                {{ $t('LICENSINGWEBCLIENT.LABEL_LICENSING_PERMANENT_KEY_HINT') }}
              </q-item-label>
            </div>
          </div>
          <div class="row q-mb-md">
            <div class="col-2">{{ $t('LICENSINGWEBCLIENT.LABEL_LICENSING_USERS_NUMBER') }}</div>
            <div class="col-9">{{ sUserCount }}</div>
          </div>
          <div class="row q-mb-md">
            <div class="col-2">{{ $t('LICENSINGWEBCLIENT.LABEL_LICENSING_TYPE') }}</div>
            <div class="col-9"><b>{{ $t('LICENSINGWEBCLIENT.LABEL_TYPE_TRIAL') }}{{ $t('LICENSINGWEBCLIENT.LABEL_TYPE_EXPIRES_IN_PLURAL') }}</b></div>
          </div>
        </q-card-section>
      </q-card>
      <div class="q-pa-md text-right">
        <q-btn unelevated no-caps dense class="q-px-sm" :ripple="false" color="primary"
               :label="$t('COREWEBCLIENT.ACTION_SAVE')" />
      </div>
    </div>
  </q-scroll-area>
</template>

<script>
export default {
  name: 'Licensing',

  data() {
    return {
      sKey: '',
      sUserCount: 5345345,
    }
  },
}
</script>

<style scoped>

</style>
