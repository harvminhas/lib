let datetime = require('../utils/datetime');
let calcs = require('../utils/calcs');
class Adaptor {
    constructor() {    }

    typeFormToModel(formJson, type, userid ){
        let retObjs = [];
        if (!formJson.items){
            return retObjs;
        }
        let _self = this;
        formJson.items.forEach(function(item){
            retObjs.push(_self.formToModel(item, type, userid));
        })
        return retObjs;
    }
    formToModel(formJson, type, userid){
        //  console.log("Adaptor:formToModel input is : " + type + '/' + userid + "   " + JSON.stringify(formJson));
        let model = {};
        model.debt = {};
        model.debt.created_on = datetime.getCurrentTS();
        model.debt.id = calcs.getAUniqueKeyString();
        model.debt.name = formJson.name;
        model.debt.status = 'active';
        model.debt.type = type;
        model.debt.updated_on = model.asset.created_on;
        model.debt.userid = userid;
        model.debt.value = formJson.value;

        model.debt.estRate = [{
            rate: 5,
            ts: datetime.getCurrentTS()
        }]

        model.entry = {};
        model.entry.id = calcs.getAUniqueKeyString();
        model.entry.type = type;
        model.entry.active = true;
        model.entry.debtid = model.debt.id;
        model.entry.ts = model.asset.created_on;
        model.entry.userid = userid;
        model.entry.value = formJson.value;

        model.debt.latestEntry = model.entry;

        return model;
    }
}
module.exports = Adaptor
