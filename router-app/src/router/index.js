import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/HelloWorld'
import Info from '@/components/Info'
import Cabinet from '@/components/Cabinet'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/cabinet',
      name: 'Cabinet',
      component: Cabinet
    },
    {
      path: '/info',
      name: 'Info',
      component: Info
    }
  ]
})
