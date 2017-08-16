import index from './pages/index/index.vue';
import addSchedule from './pages/schedule/add.vue';
export default {
  routes: [{
      path: '/',
      component: index
    },
    {
      path: '/add-schedule',
      component: addSchedule,
      meta: {
        require: ['schedule-form']
      }
    }
  ]
};