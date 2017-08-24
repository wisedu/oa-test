<template>
  <div>
      <smile-form v-model="formData" smile-guid="smile-form"></smile-form>  
      <mt-button @click="submit" type="primary" size="large">这是一个组件外的按钮</mt-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formData: {}
    }
  },
  methods: {
    submit () {
      window.smile.syncData('smile-form')
    }
  }
}
</script>
<style>
</style>


