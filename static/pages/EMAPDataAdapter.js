var EMAPDataAdapter = function(meta){
    var _orgin_meta = meta;
    var _smile_meta = {};

    return {
        execute: function(action, data){
            return smile.post(action.url, data)
        },
        actions: {
            save:"",
            delete:"",
            find:"",
            get:""
        },
        meta: function(type){
            return _orgin_meta;
        },
        loadMeta: function(uri, modelName){
            var self = this;
            return smile.get(uri, {params:{"*json":1}}).then(function(data){
                for (var index = 0; index < data.data.models.length; index++) {
                    var element = data.data.models[index];
                    self.actions[element.name] = {
                        url: element.url,
                        method: "post"
                    };
    
                    if(element.name == modelName){
                        _smile_meta = {
                            default:[]
                        };
                        _orgin_meta = [];
                        for (var i = 0; i < element.controls.length; i++) {
                            var control = element.controls[i];
                            _orgin_meta.push({
                                id: control.name,
                                name: control.caption, 
                                type: control.dataType, //string/int/number
                                realtype:"", //字典类型/表/虚拟实体
                                require: control.required,
                                hidden: control.hidden,
                                xtype: control.xtype,
                                url: control.url,
                                collective:false,//返回结果是集合
                                selectable:true,
                                length:control.dataSize,
                                scale:"",
                                children: []
                            })
                        }
                    }
                }
                return self;
            })
        }
    }
};