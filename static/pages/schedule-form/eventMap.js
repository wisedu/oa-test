
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
                id:"diA",
                name: "数据项A", 
                type: "string", //string/int/number
                require: true,
                collective:false,//返回结果是集合
                selectable:true,
                length:"",
                scale:"",
                children: []
            },
            {
                id:"diB",
                name: "数据项B", 
                type: "int", //string/int/number
                require: true,
                collective:false,//返回结果是集合
                selectable:true,
                length:"",
                scale:"",
                children: []
            },
            {
                id:"diC",
                name: "数据项C", 
                type: "int", //string/int/number
                require: false,
                collective:false,//返回结果是集合
                selectable:true,
                length:"",
                scale:"",
                children: []
            },
            {
                id:"tA",
                name: "表A", 
                type: "table", //string/int/number
                require: false,
                collective:false,//返回结果是集合
                selectable:true,
                length:"",
                scale:"",
                children: [
                    {
                        id:"diD",
                        name: "数据项D", 
                        type: "string", //string/int/number
                        require: true,
                        collective:false,//返回结果是集合
                        selectable:true,
                        length:"",
                        scale:"",
                        children: []
                    },
                    {
                        id:"diE",
                        name: "数据项E", 
                        type: "int", //string/int/number
                        require: true,
                        collective:false,//返回结果是集合
                        selectable:true,
                        length:"",
                        scale:"",
                        children: []
                    },
                    {
                        id:"diF",
                        name: "数据项F", 
                        type: "int", //string/int/number
                        require: false,
                        collective:false,//返回结果是集合
                        selectable:true,
                        length:"",
                        scale:"",
                        children: []
                    }
                ]
            }
        ]
    };
    
    var ds1 = window.smile.DataSourceFactory.create(meta);
    var meta1 = ds1.meta("form");
    ds1.execute(ds1.actions.find, {key:"1"}).then(function(data){
        store.module1.datasource.ds1 = data;
    });
    
    window.smile.DataSourceFactory.createOnline("EMAPDataAdapter", {
        url:"./static/meta.json", 
        modelname:"T_OA_XFW_QUERY",
        events:{
            onLoadMeta: function(data){
                return data;
            },
            onLoadControl: function(control){
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