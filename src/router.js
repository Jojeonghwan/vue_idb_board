import Vue from 'vue'
import Router from 'vue-router'
import List from './views/list.vue'
import Form from './views/form.vue'
import Calendar from './views/calendar.vue'
import Read from './views/read.vue'
import Index from './views/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      name: 'index',
      component: Index
    },
    {
      path: '/board',
      name: 'list',
      component: List
    },
    {
      path: '/board/form',
      name: 'boardForm',
      props: true,
      component: Form
    },
    {
      path: '/board/calendar',
      name: 'calendar',
      component: Calendar
    },
    {
      path: '/board/:id',
      name: 'read',
      component: Read,
      props: true
    },
    {
      path: '/board/update/:id',
      name: 'update',
      props: true,
      component: Form
    }
  ]
})
