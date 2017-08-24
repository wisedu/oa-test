<template>
  <!-- 生成设计态的html demo -->
  <div>{{formHtml}}</div>
</template>
<script>
import axios from 'axios';
import Components from '../../components/form-components/index'
export default {
  data () {
    return {
      formHtml: '',
      model: []
    }
  },
  watch: {
    model (val) {
      this.formHtml = this.render(val)
    }
  },
  methods: {
    getModel () {
      axios.post(WEBPACK_CONIFG_HOST + CONTEXT_PATH + '/sys/student_app1.2/modules/tableForm.do?*json=1').then(resp => {
        let res = resp.data
        this.model = res.models.filter(item => item.name === 'T_PXXX_XSJBXX_QUERY')[0].controls
      })
    },
    render (model) {
      let result = ''
      if (model.length === 0) return result
      model.map(modelItem => {
        console.log(Components['_' + modelItem.xtype])
        let component = Components['_' + modelItem.xtype]
        if (component) {
          if (component.name === undefined) { console.error(component); console.log('组件需要定义name') }
          let dom = document.createElement(component.name)
          dom.setAttribute('label', modelItem.caption)
          if (modelItem.placeholder) {
            dom.setAttribute('placeholder', modelItem.placeholder)
          }
          dom.setAttribute('v-model', 'value_bak.' + modelItem.name)
          result += dom.outerHTML
        }
      }) 
      return result
    }
  },
  mounted () {
    this.getModel()
  }
}
</script>
<style>

</style>


