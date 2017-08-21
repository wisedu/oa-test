<template>
  <div class="page_border">
    <!-- 静态图片的写法请参照以下方式 -->
    <img class="right_icon" :src="'./static/assets/title.jpg'">
    <h1 class="index">
      首页
    </h1>
    <com-test></com-test>
    <h2>表单</h2>
    <emap-form :model="model" v-model="formValue"></emap-form>
  </div>
</template>
<style>
.index {
  background: #ffffff;
}

.right_icon {
  float: right;
  height: 50px;
  padding-right: 8px;
}

.page_border {
  padding: 4px;
}
</style>
<script type="text/javascript">
import comTest from '../../components/comTest.vue'
import EmapForm from '../../components/emap-form/index'
import axios from 'axios'
export default {
  data() {
    return {
      model: [],
      page: 'about',
      formValue: {}
    }
  },
  components: {
    comTest,
    EmapForm
  },
  ready() {
    global.SDK.setTitleText("首页")
  },
  mounted () {
    axios.post('http://172.16.26.56:8080/emap/sys/student_app1.2/modules/tableForm.do?*json=1').then(resp => {
      let res = resp.data
      this.model = res.models.filter(item => item.name === 'T_PXXX_XSJBXX_QUERY')[0].controls
    })
  }
}
</script>
