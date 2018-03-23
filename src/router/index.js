import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import Step1 from '@/components/partials/Step1'
import Step2 from '@/components/partials/Step2'
import Step3 from '@/components/partials/Step3'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '',
          name: 'Step1',
          component: Step1
        },
        {
          path: 'step-2',
          name: 'Step2',
          component: Step2
        },
        {
          path: 'step-3',
          name: 'Step3',
          component: Step3
        }
      ]
    },

  ]
})
