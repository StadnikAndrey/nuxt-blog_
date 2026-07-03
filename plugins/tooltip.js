import Vue from 'vue'
import {
  VTooltip,
  VClosePopper,
  Dropdown,
  Tooltip,
  Menu
} from 'floating-vue'

Vue.directive('tooltip', VTooltip)
Vue.directive('close-popper', VClosePopper)

Vue.component('VDropdown', Dropdown)
Vue.component('VTooltip', Tooltip)
Vue.component('VMenu', Menu)

import 'floating-vue/dist/style.css'