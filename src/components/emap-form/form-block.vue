<template>
  <div>
     <template v-for="modelItem in model">
      <component :key="modelItem.name" :is="modelItem.xtype" :label="modelItem.caption" ></component>
    </template>   
  </div>  
</template>
<script>
import Components from '../form-components/index'
export default {
  data () {
    return {
    }
  },
  props: {
    model: { type: Array, required: true }
  },
  components: Components.components
}
</script>
<style>

</style>


