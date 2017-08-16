<template>
<div>
  <!-- 分组表单 -->
  <template v-if="useGroup && groupModel[0] && groupModel[0].groupName">123</template>  
  <!-- 不分组表单 -->
  <template v-else>
    <form-block :model="groupModel"></form-block>
  </template>
</div>  
</template>
<script>
import FormBlock from './form-block'
export default {
  components: { FormBlock },
  props: {
    model: { type: Array, required: true },
    value: { type: Object, default () { return {} } },
    useGroup: {type: Boolean, default: true }
  },
  computed: {
    groupModel () {
      if (!this.model || this.model.length === 0) return []
      if (!this.model[0].groupName) {
        this.model.map(item => {
          item.xtype = item.xtype ? ('_' + item.xtype) : '_text'
        })
        return this.model
      }
      let groupModel = []
      this.model.map(item => {
        item.xtype = item.xtype ? ('_' + item.xtype) : '_text'
        if (item.groupName !== undefined && item.groupName !== '') {
          let groupItem = groupModel.filter(n => n.groupName === item.groupName)[0]
          if (!groupItem) {
            groupItem = {
              groupName: item.groupName,
              model: []
            }
            groupModel.push(groupItem)
          }
          groupItem.model.push(item)
        } else {
          console.warn(item.name + '字段未配置分组，所以在表单内没有显示')
        }
      })
      return groupModel
    }
  }
}
</script>
<style>
</style>

