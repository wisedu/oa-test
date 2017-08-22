var EMAPDataAdapter = function(meta){
    var _standard_meta = {
        default:[],
        form:[], 
        grid:[], 
        search:[]
    }
    Object.defineProperty(_standard_meta, 'default', {
        enumerable: false
    });

    // _standard_meta = meta;

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
        events:{
            onLoadMeta:null,
            onLoadControl:null
        },
        meta: function(type){
            if(type === undefined){
                return _standard_meta["default"];
            }else{
                return _standard_meta[type];
            }
        },
        loadMeta: function(uri, modelName){
            var self = this;
            return axios.get(uri, {params:{"*json":1}}).then(function(data){
                self.refreshMeta(data.data, modelName);
                return self;
            })
        },
        refreshMeta: function(data, modelName){
            if(typeof(this.events.onLoadMeta) === "function"){
                data = this.events.onLoadMeta(data);
            }
            for (var index = 0; index < data.models.length; index++) {
                var element = data.models[index];
                this.actions[element.name] = {
                    url: element.url,
                    method: "post"
                };

                //只有指定名称下的模型，被填充到默认模型对象中，用于显示
                if(element.name == modelName){
                    var controls = element.controls;
                    _standard_meta["default"] = [];

                    for (var control_index = 0; control_index < controls.length; control_index++) {
                        var control = controls[control_index];

                        control["smile_id"] = control.name;
                        control["smile_name"] = control.caption;
                        control["smile_type"] = control.dataType; //string/int/number
                        control["smile_realtype"] = ""; //字典类型/表/虚拟实体
                        control["smile_require"] = control.required;
                        control["smile_collective"] = false;//返回结果是集合
                        control["smile_selectable"] = true;
                        control["smile_length"] = control.dataSize;
                        control["smile_scale"] = "";
                        control["smile_children"] = [];

                        if(typeof(this.events.onLoadControl) === "function"){
                            control = this.events.onLoadControl(control);
                        }

                        //行控件对象复制
                        _standard_meta["default"].push(JSON.parse(JSON.stringify(control)));

                        //EMAP中，字段有类型的作用范围，在此预先生成作用范围
                        for (var type in _standard_meta) {
                            if (_standard_meta.hasOwnProperty(type)) {
                                var type_meta = _standard_meta[type];
                                
                                var type_control = {};
                                for (var key in control) {
                                    if(key.indexOf(type+".") > -1){
                                        var shortkey = key.substr(key.indexOf(type+".") + (type+".").length);
                                        type_control[shortkey] = control[key];
                                    }else if(key.indexOf(".") == -1){
                                        type_control[key] = control[key];
                                    }
                                }
                                type_meta.push(type_control);
                            }
                        }
                    }
                }
            }
        }
    }
};