import Vue from 'vue'
import lodash from 'lodash'
import VueLodash from 'vue-lodash'

// name is optional
Vue.use(VueLodash, { lodash: lodash })
Vue.lodash.templateSettings.interpolate = /{{([\s\S]+?)}}/g;