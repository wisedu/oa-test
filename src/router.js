import index from './pages/index/index.vue';
import addSchedule from './pages/schedule/add.vue';
import formRender from './pages/form-render/form-render.vue';
export default {
  routes: [{
      path: '/',
      component: index
    },
    {
      path: '/add-schedule',
      component: addSchedule,
      meta: {
        require: ['smile-form']
      }
    },
    {
      path: '/form-render',
      component: formRender
    }
  ]
};