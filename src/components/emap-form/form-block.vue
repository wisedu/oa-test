<template>
  <div>
     <template v-for="modelItem in model">
      <mt-select v-if="modelItem.xtype === '_select'" type="select" :key="modelItem.name"  :value="currentValue[modelItem.name]" :label="modelItem.caption" :options="optionsMap[modelItem.name]" @selector-click="handleSelectorClick(modelItem.name)"></mt-select>
      <component v-else :key="modelItem.name" :is="modelItem.xtype" :label="modelItem.caption" ></component>
    </template>
  </div>  
</template>
<script>
import Components from '../form-components/index'
export default {
  data () {
    return {
      optionsMap: {}
    }
  },
  computed: {
    currentValue: {
      get () {
        let result = {}
        if (!this.model || this.model.length === 0) return result
        this.model.map(item => {
          if (this.value[item.name] === undefined) {
            result[item.name] = ''
          } else {
            result[item.name] = this.value[item.name]
          }
        })
        return result
      },
      set (val) {

      }
    }
  },
  props: {
    model: { type: Array, required: true },
    value: { type: Object, default () { return {} } }
  },
  watch: {
    model () {
      this.initOptions()
    }
  },
  methods: {
    initOptions () {
      if (!this.model || this.model.length === 0) return
      this.model.map(item => {
        if (item.url) {
          this.$set(this.optionsMap, item.name, [])
        }
      })
    },
    // 点击表单中的选择器执行的回调
    handleSelectorClick (name) {
      if (this.optionsMap[name] && this.optionsMap[name].length > 0) return
      let modelItem = this.model.filter(item => item.name === name)[0]
      console.log(WEBPACK_CONIFG_HOST)
      if (modelItem.url) {
        smile.post(WEBPACK_CONIFG_HOST + modelItem.url + '?*json=1').then(resp => {
          console.log(resp)
        })
      }
    }
  },
  ready () {
    this.initOptions()
  },
  components: Components.components
}
</script>
<style>

</style>


