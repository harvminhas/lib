let datetime = require('../utils/datetime');
let calcs = require('../utils/calcs');
class Adaptor {
    constructor() {    }

    typeFormToModel(formJson, type, userid ){
     //   console.log("Adaptor:typeFormToModel input is : " + type + '/' + userid + "   " + JSON.stringify(formJson));
        let retObjs = [];
        if (!formJson.items){
            return retObjs;
        }
        let _self = this;
        formJson.items.forEach(function(item){
            retObjs.push(_self.formToModel(item, type, userid));
        })
     //   console.log("Adaptor:typeFormToModel total items : "  + retObjs.length);
        return retObjs;
    }
    formToModel(formJson, type, userid){
      //  console.log("Adaptor:formToModel input is : " + type + '/' + userid + "   " + JSON.stringify(formJson));
         let model = {};
         model.asset = {};
         model.asset.created_on = datetime.getCurrentTS();
         model.asset.id = calcs.getAUniqueKeyString();
         model.asset.name = formJson.name;
         model.asset.status = 'active';
         model.asset.type = type;
         model.asset.updated_on = model.asset.created_on;
         model.asset.userid = userid;
         model.asset.value = formJson.value;

         model.entry = {};
         model.entry.id = calcs.getAUniqueKeyString();
         model.entry.type = type;
         model.entry.active = true;
         model.entry.assetid = model.asset.id;
         model.entry.ts = model.asset.created_on;
         model.entry.userid = userid;
         model.entry.value = formJson.value;

         model.asset.latestEntry = model.entry;

         return model;
    }
}
module.exports = Adaptor
