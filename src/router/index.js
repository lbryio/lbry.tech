import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import Overview from '@/components/pages/Overview'
import Documentation from '@/components/pages/Documentation'
import Contribute from '@/components/pages/Contribute'
import Develop from '@/components/pages/Develop'
import Resources from '@/components/pages/Resources'
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
    {
      path: '/overview',
      name: 'Overview',
      component: Overview,
    },
    {
      path: '/documentation',
      name: 'Documentation',
      component: Documentation,
    },
    {
      path: '/contribute',
      name: 'Contribute',
      component: Contribute,
    },
    {
      path: '/develop',
      name: 'Develop',
      component: Develop,
    },
    {
      path: '/resources',
      name: 'Resources',
      component: Resources,
    }
  ]
})
