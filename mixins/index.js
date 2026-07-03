import authFalseMixin from '~/mixins/auth-false.js'
import authTrueMixin from '~/mixins/auth-true.js'
import fingerprintMixin from '~/mixins/fingerprint.js'
import notificationsMixin from '~/mixins/notifications.js';
import transformDataMixin from "~/mixins/transform-data.js";

export let authTrue = authTrueMixin;
export let authFalse = authFalseMixin; 
export let fingerprint = fingerprintMixin;
export let notifications = notificationsMixin;
export let transformData = transformDataMixin;