
;(function (smile) {
  var eventMap = smile.eventMap
  eventMap['action_T_PXXX_XSJBXX_ADD'] = function (data) {

    var meta = {
        id:"ds_1",
        name:"数据源_1",
        adapter:"EMAPDataAdapter",
        actions:{
            save:{
                url:"./post/save.do",
                method:"post",
                last_verify: false
            },
            delete:{
                url:"./post/delete.do",
                method:"post",
                last_verify: true
            },
            get:{
                url:"./get/getdata.do",
                method:"get",
                last_verify: true
            },
            find:{
                url:"./get/find.do",
                method:"get",
                last_verify: true
            }
        },
        meta:[{
            smile_id:"diA",
            smile_name: "数据项A", 
            smile_type: "string", //string/int/number
            smile_require: true,
            smile_collective:false,//返回结果是集合
            smile_selectable:true,
            smile_length:"",
            smile_scale:"",
            smile_children: []
        },{
            smile_id:"diB",
            smile_name: "数据项B", 
            smile_type: "int", //string/int/number
            smile_require: true,
            smile_collective:false,//返回结果是集合
            smile_selectable:true,
            smile_length:"",
            smile_scale:"",
            smile_children: []
        },{
            smile_id:"diC",
            smile_name: "数据项C", 
            smile_type: "int", //string/int/number
            smile_require: false,
            smile_collective:false,//返回结果是集合
            smile_selectable:true,
            smile_length:"",
            smile_scale:"",
            smile_children: []
        },{
            smile_id:"tA",
            smile_name: "表A", 
            smile_type: "table", //string/int/number
            smile_require: false,
            smile_collective:false,//返回结果是集合
            smile_selectable:true,
            smile_length:"",
            smile_scale:"",
            smile_children: []
        }]
    };
    
    var ds1 = window.smile.DataSourceFactory.create(meta);
    var meta1 = ds1.meta();
    ds1.execute(ds1.actions.find, {key:"1"}).then(function(data){
        store.module1.datasource.ds1 = data;
    });
    
    window.smile.DataSourceFactory.createOnline("EMAPDataAdapter", {
        url:"./static/meta.json", 
        modelname:"T_OA_XFW_QUERY",
        events:{
            onLoad: function(data){
                return data;
            },
            onLoadMeta: function(control){
                return control;
            }
        }
    }).then(function(ds2){
        var meta2 = ds2.meta("search");
        ds2.execute(ds1.actions.save, {key:"1"}).then(function(data){
            store.module1.datasource.ds1 = data;
        });
    })


    return smile.post(WEBPACK_CONIFG_HOST + 'xsxxdbwh/T_PXXX_XSJBXX_ADD.do', data)
  }
})(window.smile = window.smile || { eventMap: {} })