<template>
  <div class="subcontent">
    <navigation-bar @today="onToday" @prev="onPrev" @next="onNext" />

    <div style="display: flex; justify-content: center">
      <div class="button-bar" style="margin: 12px">
        <div style="display: flex; align-items: center">
          <q-select
            v-model="calendarType"
            label="Calendar Type"
            outlined
            dense
            options-dense
            :options="['buddhist', 'ethiopic', 'gregory', 'hebrew', 'islamic', 'persian']"
            class="button"
            style="min-width: 160px"
          />
          <q-select
            v-model="locale"
            label="Choose a locale"
            outlined
            dense
            map-options
            emit-value
            options-dense
            :options="locales"
            class="button"
            style="min-width: 180px"
          />
          <q-checkbox v-model="rightToLeft" dense label="Right-to-left" />
        </div>
      </div>
    </div>

    <div class="column justify-center items-center">
      {{ formattedMonth }} {{ year }}
      <div style="display: flex; max-width: 800px; width: 100%">
        <q-calendar-month
          ref="calendar"
          v-model="selectedDate"
          :calendar-type="calendarType"
          :locale="locale"
          :weekdays="weekdays"
          show-day-of-year-label
          :day-min-height="40"
          animated
          bordered
          @change="onChange"
          @moved="onMoved"
          @click-date="onClickDate"
          @click-day="onClickDay"
          @click-workweek="onClickWorkweek"
          @click-head-workweek="onClickHeadWorkweek"
          @click-head-day="onClickHeadDay"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QCalendarMonth, today, Timestamp, parsed } from '@quasar/quasar-ui-qcalendar'
import '@quasar/quasar-ui-qcalendar/index.css'

import { ref, reactive, computed, watch } from 'vue'
import NavigationBar from 'components/NavigationBar.vue'

const calendar = ref<QCalendarMonth>(),
  selectedDate = ref(today()),
  calendarType = ref('gregory'),
  locale = ref('en-US'),
  rightToLeft = ref(false)

const locales = reactive([
  { value: 'ar', label: 'العربية' },
  { value: 'bg', label: 'български език' },
  { value: 'ca', label: 'Català' },
  { value: 'cs', label: 'Čeština' },
  { value: 'da', label: 'Dansk' },
  { value: 'de', label: 'Deutsch' },
  { value: 'en-GB', label: 'English (UK)' },
  { value: 'en-US', label: 'English (US)' },
  { value: 'eo', label: 'Esperanto' },
  { value: 'es', label: 'Español' },
  { value: 'et', label: 'Estonian' },
  { value: 'fa-IR', label: 'فارسی' },
  { value: 'fi', label: 'Suomi' },
  { value: 'fr', label: 'Français' },
  { value: 'gn', label: "Avañe'ẽ" },
  { value: 'he', label: 'עברית' },
  { value: 'hr', label: 'Hrvatski jezik' },
  { value: 'hu', label: 'Magyar' },
  { value: 'id', label: 'Bahasa Indonesia' },
  { value: 'it', label: 'Italiano' },
  { value: 'ja', label: '日本語 (にほんご)' },
  { value: 'km', label: 'ខ្មែរ' },
  { value: 'ko-KR', label: '한국어' },
  { value: 'lu', label: 'Kiluba' },
  { value: 'lv', label: 'Latviešu valoda' },
  { value: 'ml', label: 'മലയാളം' },
  { value: 'ms', label: 'Bahasa Melayu' },
  { value: 'nb-NO', label: 'Norsk' },
  { value: 'nl', label: 'Nederlands' },
  { value: 'pl', label: 'Polski' },
  { value: 'pt-BR', label: 'Português (BR)' },
  { value: 'pt', label: 'Português' },
  { value: 'ro', label: 'Română' },
  { value: 'ru', label: 'русский' },
  { value: 'sk', label: 'Slovenčina' },
  { value: 'sl', label: 'Slovenski Jezik' },
  { value: 'sr', label: 'српски језик' },
  { value: 'sv', label: 'Svenska' },
  { value: 'ta', label: 'தமிழ்' },
  { value: 'th', label: 'ไทย' },
  { value: 'tr', label: 'Türkçe' },
  { value: 'uk', label: 'Українська' },
  { value: 'vi', label: 'Tiếng Việt' },
  { value: 'zh-HANS', label: '中文(简体)' },
  { value: 'zh-HANT', label: '中文(繁體)' },
])

const weekdays = computed(() => (rightToLeft.value ? [6, 5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5, 6]))

const formattedMonth = computed(() => {
  const date = new Date(selectedDate.value)
  const formatter = monthFormatter()
  return formatter ? formatter.format(date) : ''
})

const year = computed(() => {
  const tm = parsed(selectedDate.value)
  if (!tm) {
    return 0
  }
  return tm.year
})

watch(locale, (val) => {
  // adjust for a new "today" value when the locale changes
  selectedDate.value = today(calendarType.value, val)
})

watch(calendarType, (val) => {
  // adjust for a new "today" value when the locale changes
  selectedDate.value = today(val, locale.value)
})

function monthFormatter() {
  try {
    return new Intl.DateTimeFormat(locale.value || undefined, {
      month: 'long',
      timeZone: 'UTC',
      calendar: calendarType.value,
    })
  } catch {
    //
  }
}

function onToday() {
  if (calendar.value) {
    calendar.value.moveToToday()
  }
}
function onPrev() {
  if (calendar.value) {
    calendar.value.prev()
  }
}
function onNext() {
  if (calendar.value) {
    calendar.value.next()
  }
}
function onMoved(data: Timestamp) {
  console.log('onMoved', data)
}
function onChange(data: { start: Timestamp; end: Timestamp; days: Timestamp[] }) {
  console.log('onChange', data)
}
function onClickDate(data: Timestamp) {
  console.log('onClickDate', data)
}
function onClickDay(data: Timestamp) {
  console.log('onClickDay', data)
}
function onClickWorkweek(data: Timestamp) {
  console.log('onClickWorkweek', data)
}
function onClickHeadDay(data: Timestamp) {
  console.log('onClickHeadDay', data)
}
function onClickHeadWorkweek(data: Timestamp) {
  console.log('onClickHeadWorkweek', data)
}
</script>
