;
(function (smile) {
  smile.components['schedule-form'] = {
    template: `<div>
          <mt-field label="校领导" placeholder="" v-model="value_bak.XLD"></mt-field>
          <mt-field label="活动内容" placeholder="" v-model="value_bak.HDNR"></mt-field>
          <mt-select label="性别" :slots="data_XB" :value.sync="value_bak.XB">
            <template scope="scope" slot="display">
            {{(scope.value === undefined || scope.value === '') ? '' : scope.slots.filter(item => item.id === scope.value)[0].name}}</template>
            <template scope="scope" slot="selector">
              <mt-cell v-for="item in scope.slots" :key="item.id" :class="{active: item.id === scope.value}" :title="item.name" @click.native.stop="selectClick_XB(item)"></mt-cell>
            </template>
          </mt-select>
          <mt-select label="民族" :slots="data_MZ" :value.sync="value_bak.MZ" @selector-click="selectorClick_MZ" url="code/93e2f524-bb5d-41f0-b53e-c0fb8629d087.do">
            <template scope="scope" slot="display">
            {{(scope.value === undefined || scope.value === '') ? '' : scope.slots.filter(item => item.id === scope.value)[0].name}}</template>
            <template scope="scope" slot="selector" >
              <div class="selector-container">
                <mt-cell v-for="item in scope.slots" :key="item.id" :class="{active: item.id === scope.value}" :title="item.name" @click.native.stop="selectClick_MZ(item)"></mt-cell>
              </div>
            </template>
          </mt-select>
          <mt-field label="学生编号" placeholder="学生编号" v-model="value_bak.XSBH"></mt-field>
          <mt-field label="出生日期" placeholder="出生日期" v-model="value_bak.CSRQ"></mt-field>
          <mt-field label="联系方式" placeholder="联系方式" v-model="value_bak.LXFS"></mt-field>
          <mt-field label="和本人关系" placeholder="和本人关系" v-model="value_bak.HBRGX"></mt-field>
          <mt-field label="工作地点" placeholder="工作地点" v-model="value_bak.GZDW"></mt-field>
          <mt-button @click="submit" type="primary" size="large">这是一个组件内的按钮</mt-button>
        </div>`,
    watch: {
      value: function (val) {
        this.value_bak = JSON.parse(JSON.stringify(val))
      }
    },
    props: {
      // 表单的值
      value: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data: function () {
      return {
        data_XB: [{
            name: '男',
            id: 1
          },
          {
            name: '女',
            id: 2
          },
          {
            name: '未知',
            id: 3
          }
        ],
        data_MZ: [],
        value_bak: {
          XLD: '',
          XB: '',
          HDNR: '',
          MZ: ''

        }
      }
    },
    methods: {
      handleSubmit(val) {
        console.log(val)
      },
      submit() {
        window.smile.eventMap['action_T_PXXX_XSJBXX_ADD'].call(this, this.value)
      },
      selectClick_XB(data) {
        this.value_bak.XB = data.id
        if (window.location.hash.indexOf('smile-select') > -1) {
          history.back()
        }
      },
      selectClick_MZ(data) {
        this.value_bak.MZ = data.id
        if (window.location.hash.indexOf('smile-select') > -1) {
          history.back()
        }
      },
      selectorClick_MZ(e) {
        console.log(e)
        // let url = window.WEBPACK_CONIFG_HOST + e.url
        let url = '/static/mock/MZ.json'
        axios.get(url).then(resp => {
          let respData = resp.data
          if (respData.code == '0') {
            this.data_MZ = respData.datas.code.rows
          }
        })
      }
    },
    created: function () {
      var self = this
      window.smile.eventBus.$on('sync-data', function (e) {
        var guid = self.$attrs['smile-guid']
        if (guid === e.componentId) {
          self.$emit('input', self[e.key + '_bak'])
        }
      })
    },
    style: `
        .selector-container {
          max-height: 100%;
          overflow: auto;
        }
      `
  }
})(window.smile = window.smile || {})