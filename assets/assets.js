let datetime = require('../utils/datetime');
let Asset = require('./asset');
let Adaptor = require('./adaptor');
class AssetsSingleton {
    constructor () {
        if (!AssetsSingleton.instance) {
            AssetsSingleton.instance = this
        }
        return AssetsSingleton.instance;
    }

    load(data){
        this.assets = [];
        let self = this;
        data.forEach(function(asset){
            let assetObj = new Asset();
            assetObj.load(asset);
            self.assets.push(assetObj);
        })
    }
    loadEntries(entries){
        if(!entries){
            return;
        }
        let self = this;
        entries.forEach(function(entry){
            let obj = self.assets.find(obj => obj.getID() === entry.assetid);
            if(obj){
                obj.assignEntry(entry);
            }
        })
    }

/*    loadFromForm(formJson, userid){
        this.assets = [];
        let self = this;
        let adaptor = new Adaptor();
        formJson.assets.forEach(function(asset){
            let assetObj = new Asset();
            let assetJson = adaptor.formToModel(formJson, userid);
            // assetObj.load(assetJson.asset)
            this.load()
        })
    };*/

    addAsset(){
        // To be implemented
    }
    getAssets(){
        return this.assets;
    }
    getInitialEntryDate(){
        return '1/1/2020';
    }
    getAllUpdateDates(){
        let allUpdateDates = [];
        this.getAssets().forEach(function(asset){
            allUpdateDates = allUpdateDates.concat(asset.getAllUpdateDates())
        })
        return allUpdateDates;
    }

    getTotal(){
        let total = 0;
        this.getAssets().forEach(function(asset){
            total += asset.getCurrentValue();
        })
        return total;
    }
    getTotalOnDate(date){
        let total = 0;
        this.assets.forEach(function(asset){
            total += asset.getValueOnDate(date);
        })
        return total;
    }

    getTotalOnDayOne(){
        let total = 0;
        this.assets.forEach(function(asset){
            total += asset.getValueOnDayOne();
        })
        return total;
    }
}
module.exports = AssetsSingleton
