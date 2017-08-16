<template>
  <div>
      <schedule-form v-model="formData" smile-guid="schedule-form"></schedule-form>  
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
      window.smile.syncData('schedule-form')
    }
  }
}
</script>
<style>
</style>


