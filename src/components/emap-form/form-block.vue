<template>
  <div>
     <template v-for="modelItem in model">
      <mt-select v-if="modelItem.xtype === '_select'" type="select" :key="modelItem.name"  v-model="currentValue[modelItem.name]" :label="modelItem.caption" :options="optionsMap[modelItem.name]" @selector-click="handleSelectorClick(modelItem.name)"></mt-select>
      <component v-else :key="modelItem.name" :is="modelItem.xtype" :label="modelItem.caption" v-model="currentValue[modelItem.name]"></component>
    </template>
  </div>  
</template>
<script>
import Components from '../form-components/index'
export default {
  data () {
    return {
      optionsMap: {},
      currentValue: {}
    }
  },
  props: {
    model: { type: Array, required: true },
    value: { type: Object, default () { return {} } }
  },
  watch: {
    model () {
      this.initOptions()
      this.computeCurrentValue()
    },
    value () {
      this.computeCurrentValue()
    },
    currentValue: {
      deep: true,
      handler (val) {
        console.log(val)
        this.$emit('input', val)
      }
    }
  },
  methods: {
    computeCurrentValue () {
      if (!this.model || this.model.length === 0) return
      this.model.map(item => {
        if (this.value[item.name] === undefined) {
          this.$set(this.currentValue, item.name, '')
        } else {
          this.$set(this.currentValue, item.name, this.value[item.name])
        }
      })
    },
    // 初始化表单中的字典表数据，开始全部为空数组
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
      // 若没有该字段的字典数据，则发请求获取
      let modelItem = this.model.filter(item => item.name === name)[0]
      if (modelItem.url) {
        smile.post(WEBPACK_CONIFG_HOST + modelItem.url).then(resp => {
          let respData = resp.data
          if (respData.code == '0') {
            this.optionsMap[name] = respData.datas.code.rows
          }
        })
      }
    }
  },
  ready () {
    this.initOptions()
  },
  components: Components
}
</script>
<style>
</style>


