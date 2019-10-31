import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueIdb from 'vue-idb'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles.scss'
import locale from 'element-ui/lib/locale/lang/ko'

Vue.use(ElementUI, { locale })
Vue.use(VueIdb)

const idb = new VueIdb({
  database: 'board',
  schemas: [
    { boards: 'id, name, title, comment, gender, date' }
  ]
})

Vue.config.productionTip = false

new Vue({
  router,
  idb: idb,
  render: h => h(App)
}).$mount('#app')
