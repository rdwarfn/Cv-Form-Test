import Vue from "vue";
import { extend, setInteractionMode, ValidationObserver, ValidationProvider } from "vee-validate"
import * as rules from "vee-validate/dist/rules";
import { messages } from "vee-validate/dist/locale/en.json"

setInteractionMode("eager");

for (let [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation,
    message: messages[rule]
  })
}

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
